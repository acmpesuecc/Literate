import { MUPDF_LOADED } from "@/workers/mupdf.worker";
import * as Comlink from "comlink";
import { useCallback, useEffect, useRef, useState } from "react";

export function useMupdf() {
  const [isWorkerInitialized, setIsWorkerInitialized] = useState(false);

  const document = useRef(null);
  const mupdfWorker = useRef(null);

  useEffect(() => {
    const worker = new Worker(
      new URL("../workers/mupdf.worker", import.meta.url),
      {
        type: "module",
      }
    );

    mupdfWorker.current = Comlink.wrap(worker);

    worker.addEventListener("message", (event) => {
      if (event.data === MUPDF_LOADED) {
        setIsWorkerInitialized(true);
      }
    });

    return () => {
      worker.terminate();
    };
  }, []);

  const loadDocument = useCallback((arrayBuffer) => {
    document.current = arrayBuffer;
    return mupdfWorker.current.loadDocument(arrayBuffer);
  }, []);

  const renderPage = useCallback((pageIndex,cssWidth, dpr) => {
    if (!document.current) {
      throw new Error("Document not loaded");
    }

    return mupdfWorker.current.renderPageAsImage(pageIndex,cssWidth, dpr);
  }, []);

  const countPages = useCallback(() => {
    if (!document.current) {
      throw new Error("Document not loaded");
    }

    return mupdfWorker.current.getPageCount();
  }, []);
  const structuredText = useCallback((pageIndex=0)=>{
    if(!document.current){
      throw new Error("Document not loaded")
    }
    return mupdfWorker.current.getStructuredText(pageIndex);
  },[]);
  return {
    isWorkerInitialized,
    loadDocument,
    renderPage,
    countPages,
    structuredText,
  };
}