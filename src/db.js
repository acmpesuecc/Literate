import { Dexie } from "dexie"

export const db = new Dexie("IndexedDB")
db.version(1).stores({
  pdfs: "++id, title, pg, blob",
  highlights:"++id,pdfID,page,block,line,startOffset,endOffset",
  meta:"++id,recentPDFID",
})