# 11th Feb 2026

Searched up bit about wasm and what exactly runtime environments mean.

From what I understand:

Web browser is a process, thats fed to CPU core, like any other. JS code is compiled by a browser's "engine", like chrome V8 engine or SpiderMonkey of firefox. They are usually written in C/C++, and their job is to compile (in this case) JavaScript to machine code.

Pair this engine with additional set of functionalities, like some set of web APIs like DOM api (a browser) or APIs to send/receive requests (NodeJS) and you have a runtime environment.

---

## Use case of wasm in our project

Im not 100% clear here but basically, JavaScript is what we call a "dynamically" typed language, in the sense the compiler makes assumptions about data type of code ahead of time, and it may have to correct these assumptions based on future code. So compilation takes bit while longer, although this is highly optimized by the JIT compilation method.

This is usually fine cuz this is heavily optimized, and i mean you dont have choice but to use DOM APIs to draw onto browser anyway.

But say u are reading a complex pdf file, this compilation overhead (not very sure what exactly makes up this overhead) adds up, slowing down processing and overall pdf reader, and there are plenty of options to efficiently process a pdf file. We only need to somehow get that into the JS engine.

---

## WASM solves that problem

Traditionally, the browser's execution engine could only interpret and compile JS, but in recent years devs have made it possible for another type of code to be executed in it, called WebAssembly.

For example, we can have a C/C++ program process the pdf file, and compile that to WASM.

WASM code is, by its nature, statically typed, and way simpler and faster to compile by the browser engine to machine code, giving so called "near native" machine performance (as in its as if pdf file was directly being read on desktop and compilation from engine's compilation step was minimal).

---

## Sources

https://developer.mozilla.org/en-US/docs/WebAssembly  
(check out WebAssembly concepts)

---

## Other things

Apart from this ive been learning about git branching and remotes.

Probably best resource:

Pro Git book