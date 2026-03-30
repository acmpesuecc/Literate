export default function handleHighlightCollision(newHighlight, highlights) {
  const oldHighlights = highlights.filter(
    (h) =>
      h.page === newHighlight.page &&
      h.block === newHighlight.block &&
      h.line === newHighlight.line
  );

  let segments = [newHighlight];

  oldHighlights.forEach((old) => {
    const newSegments = [];

    segments.forEach((seg) => {
      const segStart = seg.startOffset;
      const segEnd = seg.endOffset;

      const overlap =
        segStart < old.endOffset && segEnd > old.startOffset;

      // no overlap → keep as is
      if (!overlap) {
        newSegments.push(seg);
        return;
      }

      // left part remains
      if (segStart < old.startOffset) {
        newSegments.push({
          ...seg,
          startOffset: segStart,
          endOffset: old.startOffset,
        });
      }

      // right part remains
      if (segEnd > old.endOffset) {
        newSegments.push({
          ...seg,
          startOffset: old.endOffset,
          endOffset: segEnd,
        });
      }

      // middle (overlapping part) is discarded
    });

    segments = newSegments;
  });

  return segments;
}