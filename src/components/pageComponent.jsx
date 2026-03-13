import { useMupdf } from "@/hooks/useMupdf.hook";
import { useState, useEffect } from "react";

export default function PageComponent({ index, renderPage, file }) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    let objectUrl;

    renderPage(index)
      .then((pngData) => {
        objectUrl = URL.createObjectURL(
          new Blob([pngData], { type: "image/png" })
        );
        setUrl(objectUrl);
      })
      .catch((err) => console.error(err));

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [index, renderPage, file]);

  return (
    <div>
      <img src={url} />
    </div>
  );
}