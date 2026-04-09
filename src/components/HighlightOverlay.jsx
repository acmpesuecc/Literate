import { useState , useEffect} from "react";
import createRanges from "../helpers/createRanges";

export default function HighlightOverlay({ highlights, containerRef}) {
  const [rects, setRects] = useState([]);
  useEffect(()=>{
    if (!containerRef.current) return;

    const ranges = createRanges(highlights);
    if (ranges.length === 0) return;

    const containerRect = containerRef.current.getBoundingClientRect();

    let allRects = [];

    ranges.forEach((range) => {
      const rectArray = Array.from(range.getClientRects());

      rectArray.forEach((rect) => {
        allRects.push({
          top: rect.top - containerRect.top, //positioned the highlights relative to the root div container
          left: rect.left - containerRect.left,
          width: rect.width,
          height: rect.height
        });
      });
    });

    setRects(allRects);
  },[highlights])
    

  return (
    <>
      {rects.map((rect, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            backgroundColor: "rgba(253, 253, 127, 0.4)",
            top: `${rect.top}px`,
            left: `${rect.left}px`,
            width: `${rect.width}px`,
            height: `${rect.height}px`,
            pointerEvents: "none"
          }}
        />
      ))}
    </>
  );
}