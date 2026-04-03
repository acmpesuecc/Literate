import { useMupdf } from "@/hooks/useMupdf.hook";
import { useEffect, useState } from "react";
import { List, useDynamicRowHeight } from "react-window";

import PageComponent from "./pageComponent.jsx";

export default function WebViewer(props) {
  const [docLoaded, setDocLoaded] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const { isWorkerInitialized, renderPage, loadDocument, countPages, structuredText } =
    useMupdf();

  const rowHeight = useDynamicRowHeight({
    defaultRowHeight: 250,
  });

  const handler = (visibleRows, allRows) => {
    console.log("Visible rows: ",visibleRows)
    console.log("All rows",allRows)
  }
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
  }, [isWorkerInitialized, props.file]);

  return (
    <div id="pages" style={{
      height: "100vh", 
      overflow: "hidden"
      }}>
      {docLoaded && totalPages > 0 && (
        <List
          rowComponent={PageComponent}
          rowCount={totalPages}
          rowHeight={rowHeight}
          rowProps={{ renderPage,structuredText, file: props.file , totalPages}}
          onRowsRendered = {handler}
        />
      )}
    </div>
  );
}