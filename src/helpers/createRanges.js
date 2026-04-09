export default function createRanges(highlights) {
  const rangeArray = [];

  highlights.forEach((segment) => {
    const id = `${segment.page}-${segment.block}-${segment.line}`;
    const span = document.getElementById(id);

    if (!span) {
      console.error("Missing span:", id);
      return;
    }

    // get a usable text node
    let node = span.firstChild;

    // fallback: find first text node if structure changed
    if (!node || node.nodeType !== Node.TEXT_NODE) {
      node = Array.from(span.childNodes).find(
        (n) => n.nodeType === Node.TEXT_NODE
      );
    }

    if (!node) {
      console.error("No text node in span:", id);
      return;
    }

    const textLength = node.length;

    // clamp offsets
    let start = Math.max(0, segment.startOffset);
    let end = Math.max(0, segment.endOffset);

    start = Math.min(start, textLength);
    end = Math.min(end, textLength);

    // invalid / empty range → skip
    if (start >= end) {
      console.warn("Skipping invalid range:", segment);
      return;
    }

    try {
      const range = document.createRange();
      range.setStart(node, start);
      range.setEnd(node, end);

      rangeArray.push(range);
    } catch (err) {
      console.error("Range creation failed:", segment, err);
    }
  });

  return rangeArray;
}