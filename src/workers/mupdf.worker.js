import * as Comlink from "comlink";
import * as mupdf from "mupdf";

export const MUPDF_LOADED = "MUPDF_LOADED";

export class MupdfWorker {
  constructor() {
    this.pdfdocument = null;
    this.initializeMupdf();
  }

  initializeMupdf() {
    try {
      postMessage(MUPDF_LOADED);
    } catch (error) {
      console.error("Failed to initialize MuPDF:", error);
    }
  }

  loadDocument(document) {
    this.pdfdocument = mupdf.Document.openDocument(
      document,
      "application/pdf"
    );

    return true;
  }

  renderPageAsImage(pageIndex = 0, scale = 1) {
    if (!this.pdfdocument) throw new Error("Document not loaded");

    const page = this.pdfdocument.loadPage(pageIndex);

    const pixmap = page.toPixmap(
      [scale, 0, 0, scale, 0, 0],
      mupdf.ColorSpace.DeviceRGB
    );

    const png = pixmap.asPNG();
    pixmap.destroy();

    return png;
  }

  getPageCount() {
    if (!this.pdfdocument) throw new Error("Document not loaded");

    return this.pdfdocument.countPages();
  }
}

Comlink.expose(new MupdfWorker());