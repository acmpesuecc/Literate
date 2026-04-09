import { useMupdf } from "@/hooks/useMupdf.hook";
import { useEffect, useState } from "react";
import { List, useDynamicRowHeight } from "react-window";

import PageComponent from "./pageComponent.jsx";

import {useStore} from "../store.js"

export default function WebViewer(props) {
  const [docLoaded, setDocLoaded] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const { isWorkerInitialized, renderPage, loadDocument, countPages, structuredText } =
    useMupdf();

  const rowHeight = useDynamicRowHeight({
    defaultRowHeight: 250,
  });

  const handler = (visibleRows) => {
    if (visibleRows.stopIndex === 0) return; // not ready yet

    const currentPage = useStore.getState().currentPage
    if(currentPage!== visibleRows.startIndex){
      useStore.getState().setCurrentPage(visibleRows.startIndex)
    }
  }
  useEffect(() => {
    if (!isWorkerInitialized || !props.blob) {
      return;
    }

    setDocLoaded(false);
    setTotalPages(0);

    // load the document and then load the pages
    const init = async () => {
      const arrayBuffer = await props.blob.arrayBuffer();
      await loadDocument(arrayBuffer);

      const total = await countPages().catch(console.error);
      setTotalPages(total);
      setDocLoaded(true);
      return true;
    };

    init()
      .then((res) => console.log("Initialized PDF document state: ", res))
      .catch((err) => console.error(err));
  }, [isWorkerInitialized, props.blob]);

  return (
    <div id="pages">
      {docLoaded && totalPages > 0 && (
        <List
          rowComponent={PageComponent}
          rowCount={totalPages}
          rowHeight={rowHeight}
          rowProps={{ renderPage,structuredText, totalPages, pdfID: props.currentPDFid}}
        />
      )}
    </div>
  );
}