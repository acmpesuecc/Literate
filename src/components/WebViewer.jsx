import { useMupdf } from "@/hooks/useMupdf.hook";
import { useEffect, useState } from "react";
import { List, useDynamicRowHeight } from "react-window";

import PageComponent from "./pageComponent.jsx";

export default function WebViewer(props) {
  const [docLoaded, setDocLoaded] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const { isWorkerInitialized, renderPage, loadDocument, countPages } =
    useMupdf();

  const rowHeight = useDynamicRowHeight({
    defaultRowHeight: 250,
  });

  useEffect(() => {
    if (!isWorkerInitialized || !props.file) {
      return;
    }

    setDocLoaded(false);
    setTotalPages(0);

    // load the document and then load the pages
    const init = async () => {
      const response = await fetch(props.file);
      const arrayBuffer = await response.arrayBuffer();
      await loadDocument(arrayBuffer);

      const total = await countPages().catch(console.error);
      setTotalPages(total);
      setDocLoaded(true);
      return true;
    };

    init()
      .then((res) => console.log("Initialized PDF document state: ", res))
      .catch((err) => console.error(err));
  }, [isWorkerInitialized, loadDocument, renderPage, props.file]);

  return (
    <div id="pages">
      {docLoaded && totalPages > 0 && (
        <List
          rowComponent={PageComponent}
          rowCount={totalPages}
          rowHeight={rowHeight}
          rowProps={{ renderPage, file: props.file }}
        />
      )}
    </div>
  );
}