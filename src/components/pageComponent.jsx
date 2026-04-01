import { useState, useEffect, useRef } from "react";
import TextOverlay from "./TextOverlay"
import HighlightOverlay from "./HighlightOverlay"

const dpr = window.devicePixelRatio || 1;
const cssWidth = 800;

//import highlights from zustand store
//this is for my resume ka pdf
let highlights = [
    {
        page: "0",
        block: "0",
        line: "0",
        startOffset: 0,
        endOffset: 3,
    }
]

//first lay img, then overlay text, finally overlay the highlights
export default function PageComponent({ index, renderPage, structuredText, file }) {
  const [url, setUrl] = useState(null);
  const [textData, setTextData] = useState(null);
  const [cssHeight, setCssHeight] = useState(0);
  const [cssScale, setCssScale] = useState(null);
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
    >
        {url && (
          <img
            src={url}
            width={cssWidth}
            height={cssHeight}
            style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }} //ensure img doesnt get selected while user is highlighting
          />
        )}

        {textData && cssScale &&  
          <>
            <TextOverlay textData={textData} cssScale={cssScale} index={index}/>
            <HighlightOverlay highlights={highlights} containerRef={containerRef}/>
          </>
        }
    </div>
  );
}