import { Dexie } from "dexie"

export const db = new Dexie("IndexedDB")
db.version(1).stores({
  pdfs: "++id, currentpdf, title, pg",
  highlights:"++id,pdfID,page,block,line,startOffset,endOffset",
  meta:"++id,recentpdf",
})