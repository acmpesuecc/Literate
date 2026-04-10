# Week 6 docs
 - Mostly spent working on implementing text overlay and text highlights
## Image scaling and resolution

First i fixed the resolution, fix the csswidth of all pages, ensure page rendered in worker has enough pixels.
I like to think of it this way
CSS pixels and physical pixels are different. CSS pixels or CSS space if u will is relevant only inside the browser, so that browser ensures on every device, say if web developer intended a page to be 800px wide, it would be so, without each time worrying about actual size in physical pixels.
The actual width of the page would be 800 *DPR, DPR=physical pixels/CSS pixels. So when browser actual draws onto the screen, to decide how many actual pixels it needs, it multiplies css pixels with DPR.

This also means everything you write in terms of pixels like top, bottom, font size etc are all scaled by DPR, to bring it to "Physical pixel space" so to speak
In my case, what im doing is im fixing page width to 800px, and on rendering side, applying transform, with scale = (csswidth*dpr/pdfwidth). So that ensures my pdf page which was at pdfwidth, will now have a width of csswidth. same transform is applied uniformly

Our pages are being rendered as pngs. So first we generate a bitmap, conceptually thats like a flat array of [(r,g,b,a), (r,g,b,a), ...], think of it as raw physical pixels value(may not be so accurate but o well). This is then encoded to png format. When same image is given to browser, it must decode png back to bitmap, to use it. That's true for all formats.(Side note: this is why we might switch to rendering to a "canvas" element later, as you directly pass bitmap to it, no encoding decoding step)

Image "blurriness" is just when the browser is trying to "upsample" an image. Basically say we had to draw a line, whose bitmap only had 10px of rgba values(conceptually), ie its bitmap specifies it as 10 physical pixels wide. If in the browser i tried to draw the line with 10 CSS pixels, and say DPR = 2, then the browser will try to fit the line to use 10 * DPR = 20 physical pixels. But the line's bitmap itself had only 10 physical pixels, so now the browser must guess the remaining pixels. Whole algorithms exist for this. And yes, this leads to blurriness

In our case i fix the csswidth to 800 css pixels, on rendering size, when i scale the bitmap by 800*dpr/pdfwidth, this ensures the bitmap's width is at least 800 * DPR pixels wide.
So inside browser when the actual page draws at 800 css pixels, no. of actual pixels it takes up is 800 * DPR, exactly(or at least) about as much as is specified in bitmap, no "upscaling"!

(I explained in terms of width but its better to think in terms of "if bitmap specified has enough or more pixels as the browser or whoever wants to draw the image,image will be crisp(downsampling) else it might be blurry(upsampling))


### Text overlay
I extract text using page.toStructuredText() in worker(lowk i suspect this might be slowing down the initial page load, move to separate thread?)
that has a very specific format : https://mupdf.readthedocs.io/en/latest/reference/javascript/types/StructuredText.html

Basically im iterating thru that, and placing each line in a span. this span with an unique id = page-block-line is absolutely positioned inside root div, so when user selects text, they are actually selecting the text overlay, and they get the illusion that theyre selecting anything inside the page img
Im taking each line from structuredText, placing it in its correct position wrt scaled img with a unique id.

I also scaled text inside each span in X, with scaleX, cuz the width of these lines didn't match the exact width of the word in image, so user selecting text would be off from img ka text

Note: MuPDF specifies blocks as roughly paras, but they necessarily aren't, doesn't affect us but yea

## Highlight overlay:

Highlights are stored like:
const highlights = [
{
          page: 1,
          block: 2,
          line:1,
          startOffset:3,
          endOffset:5
},
{
          page: 1,
          block: 3,
          line: 2,
          startOffset: 10,
          endOffset:15
}
]

Basically im storing and handling highlights on a per line basis. When user selects range of text, i first convert each selected line to above object format, iterate over each highlighted line and give each to handleHighlightCollision. That returns corrected array of valid highlights after considering overlap with all other old highlights in same line, and finally i setHighlights as old + new values, which updates UI

handleHighlightCollision takes selection on given line, gets all other old highlights in the same line, and checks if it overlaps with any of the old highlights

say (on same line)
newHighlight = [0, 20]
oldHighlight1 = [5, 10]

After overlap

segments = [ [0,5], [10,20] ]-> added to set of currently user selected highlights
Final highlights array = [ [5,10],[0,5], [10,20] ]

Note: They aren't literally stored as above, theyre stored as a highlight objects, i just showed this way coz ezier

---

### To actually show highlights on screen we must understand following

When user selects any text in general, selection object is created, and selected text is stored in a "Range" object. Range object has some useful properties like startOffset, endOffset, anchorNode(startNode), focusNode(endNode). This range can then be converted to array of "Rects". Think of it like a bounding box around each selected text word. These rects have top, left, width and height, basically giving me exact coords and size of each selected word.

What im doing is im basically placing span elements with bg color = yellow at these exact positions where words were highlighted

So its like
User stored highlights->each converted to Range object, each range corresponds to line selected->each range converted to array of "Rects", imagine each rect as a box around each word in current range->store in rects array

For each rect->create span with exact dimensions and coordinates, bg color = yellow => word highlighted!

### TLDR:
Storing highlights
User selects bunch of lines->process each line, remove overlapping section-> store in highlights array

### Displaying highlights
Iterate thru highlights array->convert each highlight to Range object-> Get rects for each range->store all rects in an array of rects.
For each rect->place span at exact posn and with exact dimensions of rect with bg color yellow->area appears highlighted


Note: Thing was anchor and focus nodes always showed up as text nodes, so i needed some way to uniquely identify the line and block of line selected
Thats where id of span from text overlay is used. I can simply take parent node of selected text node, and id get parent span, which has unique id identifying that piece of text with page, block and line
(Note this is also used in handle highlight function)
 