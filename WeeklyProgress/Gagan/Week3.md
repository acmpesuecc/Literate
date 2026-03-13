# Week 3 Documentation

I read through the react code example for the webviewer component. They had implemented it in 3 parts.

---

## 1) Worker file

Worker file defined a `MupdfWorker` class. Internally first time a pdf is opened, worker script runs, initializes an object of `MupdfWorker`.

This `MupdfWorker` object has bunch of methods and `pdfdocument` property, which stores a `PDFDocument` class (defined in mupdf) object, basically just stores reference to the currently opened pdf document.

### MupdfWorker class has following

pdfdocument

property which stores currently opened pdfdocument as a `PDFDocument` object (`PDFDocument` class is defined in mupdf)

initializeMupdf

health testing function, just first tries to `postMessage` to main thread, if no error then mupdf initialized (constructor ran successfully) successfully, else error.

loadDocument

api that calls mupdf's `OpenDocument`, which takes in file name and returns a `Document` (or i guess in our case `PDFDocument`) object, stores it in `pdfdocument` property.

API ref:
```
Document -> OpenDocument
```

renderPageAsImage

takes in `pageIndex` 0 to n-1, calls `loadPage` api of `pdfdocument` property, which returns a `Page` object representing that page.

Steps:

```
pdfdocument.loadPage(pageIndex)
```

generates pixmap, renders it to PNG, and returns `pngData`.

getPageCount

just calls `countPages` api.

ref:

```
Document -> countPages
```

---

## About the comlink library

Our main thread runs this worker file on a separate worker thread, and for communication between main and worker thread you'd normally use:

- `postMessage`
- `eventListener`

But that can be little annoying. Thats where comlink comes in.

Inside worker thread we can use:

```
comlink.expose()
```

to expose anything, in our case the object of class `MupdfWorker`, to main thread.

In the main thread we initialize worker and call:

```
comlink.wrap(worker)
```

which basically returns a proxy object.

This proxy is kind of like a representation of the `MupdfWorker` object in main thread, when the actual `MupdfWorker` object exists only in worker thread.

We call functions and methods from this proxy, which handles the actual communication to and fro from worker thread.

---

## About mupdf import

When i first tried importing and setting up mupdf in our project, the vite dev server was unable to resolve the wasm files from the import

```
import * mupdf as mupdf
```

turns out it was a prebundling issue. The wasm files simply did not exist in prebundled `.vite/deps`.

Fix was simple: configure vite to not include mupdf in the prebundling (code example did this).

https://vite.dev/guide/dep-pre-bundling

I think this issue shouldn't exist when we deploy it.

---

# 2) useMupdf hook

This hook is used inside `webviewer` component.

It stores 2 states:

- `currentPage`
- `workerInitialized`

It also stores 2 refs:

- `document` → arrayBuffer of currently opened PDF
- `mupdfWorker` → ref to Comlink wrapped worker

`useMupdf` runs on main thread.

It creates a Worker thread which runs `mupdf.worker.js` file and sets `mupdfWorker` ref to the Comlink wrapped worker.

It also defines few methods.

These are actual methods our `webviewer` can use.

`Webviewer` and this hook all run on main thread. These methods call the APIs defined in worker (running on worker thread).

Notice how we can simply call it as if worker code was also on main thread. Thats what comlink is for.

---

# 3) WebViewer component

The actual react component which makes use of all above to render pages of PDF as PNG images.

Takes in a Javascript `URLObject` as input.

Calls `useMupdf` hook to get all those methods defined.

Then mupdf hook runs, initializes worker and all that, and returns proxy object.

---

# Virtualization

For quick rendering we are making use of something called virtualization (idk what that is yet).

For this part I'm using lighter version of `react-virtualizer` called:

```
react-window
```

Basically the library allows efficient rendering of large lists by only rendering those list elements which are currently in user's viewport.

In our case we are rendering list of pages as `img`s.

In the future though we might want to change that and render them inside `canvas` elements instead, might take lesser time.

---

# Bits for my reference

We essentially reused the exact same setup from mupdf react code example, but rewrote it from ts to js.

The original code rendered all the pages on worker thread, then returned all those pages all at once to main thread.

That is what caused our main page to blank out.

Now we render only those pages which are in user's viewport.

(There's few more details here regarding virtualization and react-window and its exact working that i haven't looked into, will do next week)

---

# File loading

Current setup loads a file from file explorer and returns object url to webviewer.

Next week when we setup loading from gdrive api, we can simply do same setup but instead on file-picker react component, calling the `handleFile` or whatever to `onPicked` attribute.

---

# Rendering

In our case rendering means:

- loading page of the document from memory
- converting the page data to `pngData` in worker thread
- returning that to main thread
- using it inside an `<img>` tag

---

# Important note

We use the term rendering in two different contexts.

### Rendering page to image

Rendering page to img (PNG in our case) is as described above.

### Rendering in React

Rendering in react refers to React's render/commit process:

https://react.dev/learn/render-and-commit

These are two completely different meanings.

---

# References

https://react.dev/reference/react/useCallback  
https://react.dev/reference/react/useRef  
https://react-window.vercel.app/list/images  
https://github.com/GoogleChromeLabs/comlink?tab=readme-ov-file#api  
https://davidea.st/articles/comlink-simple-web-worker/