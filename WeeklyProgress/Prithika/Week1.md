# WEEK 1

## 12 Feb 2026
Looked into
**WASM** - is basically a binary format for instructions which makes parsing n decoding code much faster than using asm.js(enables AOT-style optimisation within a JIT system), with AOT(Ahead-Of-Time) compilation. This will make reading through large documents much easier than using just Js.
**MuPDF** - Mupdf helps render large pdfs and docs fast and is compiled to WebAssembly. This allows near-native rendering and is much better than using Javascript-renderers such as which takes much longer to parse larger and complex docs.
So,  MuPDF is a high-performance engine written in C and WebAssembly is the safe environment that lets that engine run inside the browser.
**Use case in Literate** - Using Emscripten I think which acts as a bridge for compiling C/C++ code into Webassembly.


## 14 Feb 2026
Exploring Git Commands
Uploaded a doc, containing basic git commands and how to collaborate with other users on Github, to the drive.


## 15 Feb 2026
**React+Vite** We are building a React-based SPA (Single Page Application) built with Vite for fast performance.

**MuPD compiled into WASM** The PDF parsing and rendering is done by MuPDF which is compiled to WebAssembly(a binary instruction format), allowing near-native rendering speeds inside the browser.
Why? It is much better than using pure Javacript-renderers such as PDF.js becuz that is merely an extension of javascript which means parsing thru the pdf itself much slower .And Mupdf being C-based, allows smooth file handling and improves performance.

**Google drive API** this API is also used to sync any changes to the files across devices. User-approved files can be accessed directly from Drive using restricted Google OAuth scopes which makes it more secure and private

**Zustand** manages the UI states efficiently. We chose Zustand because it's simpler to use and maintain.

**Service Workers** basically caches some select files from the drive in the application’s cache storage which enables offline access of those files 

**IndexedDB** we can actually store the files and the reading state and saves any changes made to it even when ur offline on any device so you can continue right where you left off.
