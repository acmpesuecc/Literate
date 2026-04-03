import { Dexie } from "dexie"

export const db = new Dexie("IndexedDB")
db.version(1).stores({
  pdf: "++id, title, pg",
  highlight:"++id,pdfID,page,block,line,startOffset,endOffset",
  meta:"++id,recentpdf",
})