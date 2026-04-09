import {Outlet} from 'react-router'
import WebViewer from "@/components/WebViewer.jsx";
import { useState, useEffect } from "react";
import { useStore } from './store.js';

import hydrate from "./helpers/hydrate.js"

import {db} from "./db.js"

import {
  DrivePicker,
  DrivePickerDocsView,
} from "@googleworkspace/drive-picker-react";

const App = () => {
    const [showPicker, setShowPicker] = useState(false);
    const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
	const APP_ID = import.meta.env.VITE_GOOGLE_APP_ID;


    const title = useStore((state) => state.Title);
    const currentPDFid = useStore((state)=>state.currentPDFid)
    const blob = useStore((state)=>state.blob)

    if(title) console.log(title);
    if(currentPDFid) console.log(currentPDFid)
    if(blob) console.log(blob)
    useEffect(()=>{
        // when page loads, check if meta table entry exist, if yes, refresh and load from indexedDV
        async function rehydrate(pdfID) {
            const [currentPDF, highlights] = await Promise.all([
                db.pdfs.get(pdfID),
                db.highlights.where("pdfID").equals(pdfID).toArray()
            ]);

            console.log("currently opened pdf", currentPDF);
            useStore.getState().setTitle(currentPDF.title);
            useStore.getState().setCurrentPDF(currentPDF.id);
            useStore.getState().setBlob(currentPDF.blob);

            console.log("Highlights from db", highlights);
            const storeHighlights = highlights.map((h) => ({
                page: h.page,
                block: h.block,
                line: h.line,
                startOffset: h.startOffset,
                endOffset: h.endOffset,
            }));
            useStore.getState().setHighlights(storeHighlights);
        }
        async function initSession(){
            const sessionActive = sessionStorage.getItem('pdf_session_active');
            if(!sessionActive){
                //new session, sessionStorage persists on refresh but not on tab closes, ill treat tab close as user wanting to close app
                await db.meta.clear()
                sessionStorage.setItem('pdf_session_active', 'true');
                console.log("New session: Meta table cleared.");
            }
            else{
                //refresh, restore previous active session
                console.log("Refresh detected: Keeping meta data.");
                await db.meta.toCollection().first()
                .then(async (id)=>{
                    if(id){
                        //rehydrate store back
                        const metaEntry = await db.meta.get(id)
                        console.log("metaEntry: ", metaEntry)
                        await rehydrate(metaEntry.recentPDFID)
                    }
                    //else no pdf was loaded before, put to meta when user chooses a pdf
                })
            }
        }
        initSession()
        .catch(err=>console.error(err))

    },[])
    const takeFile = async (e) => {
        const file = e.target.files[0];

        //check if file exists by name, if not, add to table
        if (file) {
            useStore.getState().setTitle(file.name)
            // setTitle(file.name);

            //create pdf entry if not exist

            //async store file name and file blob
            useStore.getState().setBlob(file)
            console.log("file opening...");
            
            await hydrate(file.name, file)
        }
    };

    return (
        <div className="app-container">
            <aside className="sidebar">
                <div className="file-input-wrapper">
                    <button className="picker-btn" onClick={() => setShowPicker(true)}>
                        Open Picker
                    </button>
                    
                    {showPicker && (
                        <DrivePicker
                        client-id={CLIENT_ID}
                        app-id={APP_ID}
                        onPicked={async (e) => {
                            const pickedData = e.detail;
                            console.log(pickedData);

                            if (pickedData.docs && pickedData.docs.length > 0) {
                                const fileId = pickedData.docs[0].id;
                                
                                try {
                                    const token = window.gapi.client.getToken().access_token;
                                    const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
                                        headers: {
                                            'Authorization': `Bearer ${token}`
                                        }
                                    });
                                    
                                    const arrayBuffer = await response.arrayBuffer();
                                    const blob = new Blob([arrayBuffer], { type: 'application/pdf' });

                                    useStore.getState().setBlob(blob)

                                    useStore.getState().setTitle(pickedData.docs[0].name);
                                    await hydrate(pickedData.docs[0].name, blob)
                                } catch (error) {
                                    console.error('Error downloading PDF:', error);
                                }
                            }

                            setShowPicker(false);
                        }}
                        onCanceled={() => setShowPicker(false)}
                        >
                        <DrivePickerDocsView owned-by-me="true" 
                            mime-types="application/pdf"
                        />
                        </DrivePicker>
                    )}
                </div>
                    
                    
                <div id="file-deets">           

                </div>
                    
                <br />
                <input className="picker-btn" onChange={takeFile} type="file" accept=".pdf" />
            </aside>

            {/* <main className="viewer-container"> */}
            <main className="container">
                {/* {title &&  (*/}
                {title?.length > 0 && (
                    <div className="viewer-header">
                        <h2>Title:{title}</h2>
                    </div>
                )}
                <div className="viewer-content">
                    {currentPDFid && currentPDFid!==undefined && (
                        <WebViewer key={currentPDFid} currentPDFid={currentPDFid} blob={blob}/>
                        )
                    }
                </div>
            </main>
        </div>
    );
}

export default App
