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

  renderPageAsImage(pageIndex = 0,cssWidth, dpr) {
    if (!this.pdfdocument) throw new Error("Document not loaded");

    const page = this.pdfdocument.loadPage(pageIndex);
    const bounds = page.getBounds(); // The "natural" size of the PDF page
    const pdfWidth  = bounds[2] - bounds[0]; 
    const pdfHeight = bounds[3] - bounds[1];

    const cssHeight = (pdfHeight / pdfWidth) * cssWidth;

    const scale = (cssWidth / pdfWidth) *dpr;
    
    //scale pixmap to ensure there's enough pixels for browser to work with. fixes the resolution
    const pixmap = page.toPixmap(
      [scale, 0, 0, scale, 0, 0],
      mupdf.ColorSpace.DeviceRGB
    );

    const pngData = pixmap.asPNG();
    pixmap.destroy();

    return{pngData, cssHeight, cssScale: cssWidth / pdfWidth};
  }

  getPageCount() {
    if (!this.pdfdocument) throw new Error("Document not loaded");

    return this.pdfdocument.countPages();
  }
  getStructuredText(pageIndex = 0){
    if (!this.pdfdocument) throw new Error("Document not loaded");

    const page = this.pdfdocument.loadPage(pageIndex);
    return JSON.parse(page.toStructuredText("preserve-spans").asJSON());
  }
}

Comlink.expose(new MupdfWorker());