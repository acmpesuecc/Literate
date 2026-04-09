import {db} from "../db"
import {useStore} from "../store"

export default async function hydrate(name, blob){
    await db.pdfs.where("title").equals(name).first()
        .then(async (selectedPDF)=>{
            if(selectedPDF){
                console.log("PDF found! ", selectedPDF)
                useStore.getState().setCurrentPDF(selectedPDF.id)
                //update currently opened pdf id in meta in indexedDB
                //clear old entry and replace with new one
                await db.meta.clear()
                console.log("Changed PDF , Meta table cleared.");

                await db.meta.put({
                    recentPDFID: selectedPDF.id
                    })
                }
                else{
                    console.log("PDF not found, creating new entry...");
                    await db.pdfs.add({
                        title: name,
                        pg:0,
                        blob: blob
                    })
                    .then(async (id)=>{
                        useStore.getState().setCurrentPDF(id)
                        await db.meta.clear()
                        console.log("Changed PDF , Meta table cleared.");
                        await db.meta.put({
                            recentPDFID: id
                        }) 
                    })
                }
            })
        .catch(err=>console.error(err))
}
     
