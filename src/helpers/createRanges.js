//highlights must be imported from zustand store
//file to create range objects and pass them back to my page component

//helper component iterates over each range and renders a highlight

export default function createRanges(highlights){
    let rangeArray = [];
    highlights.forEach(segment=>{
            //before that i shud try testing if i can create a range from the above
            //nice it works, so after loading highlights from somewhere, i should run thru the highlights array and do following
            let highlightRange = document.createRange();

            let id = `${segment.page}-${segment.block}-${segment.line}`

            //ill apply highlights on a segment by segment basis
            const startNodeSpan = document.getElementById(id)

            //hopefully each span has only one text node
            highlightRange.setStart(startNodeSpan.childNodes[0], segment.startOffset) 
            highlightRange.setEnd(startNodeSpan.childNodes[0], segment.endOffset)

            rangeArray.push(highlightRange) //store in rangearray
            console.log("highlighted range", highlightRange);
    })
    return rangeArray;
}
