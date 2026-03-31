import { Dexie } from "dexie"

export const db = new Dexie("IndexedDB")
db.version(1).stores({
  pdf: "++id, title, pg",
  highlight:"++id,pg,para,wordlen",
})