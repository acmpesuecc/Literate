//cache to store textwidth, cuz measureText is expensive
const textWidthCache = new Map();

// Measure natural rendered width of text using a hidden canvas
function measureTextWidth(text, fontStyle, fontWeight, fontSize, fontFamily) {
  const key = `${text}|${fontStyle}|${fontWeight}|${fontSize}|${fontFamily}`;
  if (textWidthCache.has(key)) return textWidthCache.get(key);
  const ctx = document.createElement("canvas").getContext("2d");
  ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;
  const width = ctx.measureText(text).width;
  textWidthCache.set(key, width);
  return width;
}

export default function TextOverlay({textData, cssScale, index}){
    return (
        textData.blocks.map((block, bIndex) => //overlay text
        block.lines.map((line, lIndex) => {
            const fontSize = line.font.size * cssScale;
            const naturalW = measureTextWidth(line.text, line.font.style, line.font.weight, fontSize, line.font.family);
            const scaleX = naturalW > 0 ? (line.bbox.w * cssScale) / naturalW : 1;
            
              // line.y is the baseline. Subtract fontSize to get top of text.
              // 0.75 is the typical ascender ratio (matches most browser fonts).
            const top = (line.y - line.font.size * 0.75) * cssScale;

            return (
              <span
                key={`${index}-${bIndex}-${lIndex}`}
                id={`${index}-${bIndex}-${lIndex}`}
                style={{
                  position: "absolute",
                  left: line.bbox.x * cssScale,
                  top,
                  fontSize,
                  fontFamily: line.font.family,
                  fontWeight: line.font.weight,
                  fontStyle: line.font.style,
                  whiteSpace: "pre",
                  display: "inline-block",
                  transformOrigin: "left top",
                  transform: `scaleX(${scaleX})`, //im just stretching each overlay text to match width of the text in the image
                  color: "transparent",
                  lineHeight: 1,
                  userSelect: "text", //ensure only text is selectable
                  cursor: "text",
                }}
              >
                {line.text}
              </span>
            );
          })
    ))
}