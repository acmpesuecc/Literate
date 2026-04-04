import { useState, useEffect, useRef } from "react";
import TextOverlay from "./TextOverlay"
import HighlightOverlay from "./HighlightOverlay"
import Menu from "./Menu"
import handleHighlightCollision from "../helpers/handleHighlightCollision"
import { useStore } from "../store";

const dpr = window.devicePixelRatio || 1;
const cssWidth = 800; //fixed for now

//import highlights from zustand store
//this is for my resume ka pdf
//for now imma make the highlights work for contigous text selection, so i wont handle
//those separate text selection using ctrl c for now

//first lay img, then overlay text, finally overlay the highlights
export default function PageComponent({ index, renderPage, structuredText, file }) {
  const [url, setUrl] = useState(null);
  const highlights = useStore((state) => state.highlights)
  const [textData, setTextData] = useState(null);
  const [cssHeight, setCssHeight] = useState(0);
  const [cssScale, setCssScale] = useState(null);
  const [menuPos, setMenuPos] = useState(null)
  const containerRef = useRef(null);

  useEffect(() => {
    let objectUrl;
    renderPage(index, cssWidth, dpr)
      .then(({ pngData, cssHeight, cssScale }) => {
        objectUrl = URL.createObjectURL(new Blob([pngData], { type: "image/png" }));
        setUrl(objectUrl);
        setCssHeight(cssHeight);
        setCssScale(cssScale);
      })
      .catch(console.error);
    structuredText(index)
      .then((data)=>setTextData(data))
      .catch(err=>console.error(err));
      
    return () => { if (objectUrl) URL.revokeObjectURL(objectUrl); };
  }, [index, file]);

  const handleSelection = ()=>{
    const selection = window.getSelection();

    //do below logic only if user selects highlight button in options

    if (!selection.isCollapsed && selection.anchorNode.nodeName==='#text' && selection.focusNode.nodeName==="#text" && 
    selection.rangeCount > 0 && !selection.isCollapsed) {
      const boundingRect = selection.getRangeAt(0).getBoundingClientRect()
      //make div showing options ot highlight stuff, maybe annotate etc
      const containerRect = containerRef.current.getBoundingClientRect()
      const MENU_WIDTH = 180;

      let top = boundingRect.top - containerRect.top - 30;
      let left = boundingRect.left - containerRect.left;

      // prevent overflow
      if (left + MENU_WIDTH > containerRect.width) {
        left = containerRect.width - MENU_WIDTH - 10;
      }

      if (top < 0) {
        top = boundingRect.bottom - containerRect.top + 10;
      }

      setMenuPos({ top, left });

    }
  }
  const getLastLine = (page, block) => {
    let line = 0;
    while (document.getElementById(`${page}-${block}-${line + 1}`)) {
      line++;
    }
    return line;
  };
  const getLastBlock = (page) => {
    let block = 0;
    while (document.getElementById(`${page}-${block + 1}-0`)) {
      block++;
    }
    return block;
  };
const handleHighlight = () => {
  const selection = window.getSelection();
  if (!selection || selection.isCollapsed) return;

  let startLineSpan, endLineSpan, selectionStartOffset, selectionEndOffset;

  if (selection.direction === "forward") {
    startLineSpan = selection.anchorNode.parentNode;
    endLineSpan = selection.focusNode.parentNode;
    selectionStartOffset = selection.anchorOffset;
    selectionEndOffset = selection.focusOffset;
  } else {
    // normalize backward selection
    startLineSpan = selection.focusNode.parentNode;
    endLineSpan = selection.anchorNode.parentNode;
    selectionStartOffset = selection.focusOffset;
    selectionEndOffset = selection.anchorOffset;
  }

  let startBlock, startLine, startArr;
  let endBlock, endLine, endArr;
  let startIndex, endIndex;

  startArr = startLineSpan.id.split("-");
  endArr = endLineSpan.id.split("-");

  if (startArr.length !== 3) { console.error("improper formatting for start span"); return; }
  if (endArr.length !== 3) { console.error("Improper formatting for end span"); return; }

  startIndex = Number(startArr[0]);
  endIndex = Number(endArr[0]);

  startBlock = Number(startArr[1]);
  endBlock = Number(endArr[1]);

  startLine = Number(startArr[2]);
  endLine = Number(endArr[2]);

  let totalHighlights = [...highlights];

  //iterate through selection
  for (let page = startIndex; page <= endIndex; page++) {
    const blockStart = page === startIndex ? startBlock : 0;
    const blockEnd = page === endIndex ? endBlock : getLastBlock(page);

    for (let block = blockStart; block <= blockEnd; block++) {
      const lineStart = (page === startIndex && block === startBlock) ? startLine : 0;
      const lineEnd = (page === endIndex && block === endBlock) ? endLine : getLastLine(page, block);

      for (let line = lineStart; line <= lineEnd; line++) {
        const isFirstSpan = page === startIndex && block === startBlock && line === startLine;
        const isLastSpan = page === endIndex && block === endBlock && line === endLine;

        const startOffset = isFirstSpan ? selectionStartOffset : 0;
        const endOffset = isLastSpan
          ? selectionEndOffset
          : document.getElementById(`${page}-${block}-${line}`)?.firstChild?.length ?? 0;

        if (startOffset === endOffset) continue;

        const newHighlight = { 
          page, 
          block, 
          line, 
          startOffset, 
          endOffset,
        };

        console.log(newHighlight);

        // collision handling
        const segments = handleHighlightCollision(newHighlight, totalHighlights);

        totalHighlights = [...totalHighlights, ...segments];
      }
    }
  }
  useStore.getState().setHighlights(totalHighlights);
  setMenuPos(null);

  //gets rid of that annoying bug where menu remains open till user clicks outside page
  setTimeout(() => {
    window.getSelection().removeAllRanges();
  }, 0);
};
  return (
    <div style={{
      position: "relative",
      width: cssWidth,
      height: cssHeight,
      backgroundColor: "white",
      margin: "15px",
      overflow: "hidden",
      userSelect: "none", //ensure container isnt selected while user is selecting text
    }}
    ref={containerRef}
    onMouseUp={handleSelection}
    >
        {url && (
          <img
            src={url}
            width={cssWidth}
            height={cssHeight}
            style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none"}} //ensure img doesnt get selected while user is highlighting
          />
        )}

        {textData && cssScale &&  
          <>
            <TextOverlay textData={textData} cssScale={cssScale} index={index}/>
            <HighlightOverlay highlights={highlights} containerRef={containerRef}/>
          </>
        }
      {menuPos && (
        <Menu
          top={menuPos.top}
          left={menuPos.left}
          onClose={() => setMenuPos(null)}
          onHighlight={handleHighlight}
        />
      )}
    </div>
  )
}