import React from 'react'
import {Outlet} from 'react-router'
import WebViewer from "@/components/WebViewer.jsx";
import { useState } from "react";
import { gapi } from 'gapi-script';

import {
  DrivePicker,
  DrivePickerDocsView,
} from "@googleworkspace/drive-picker-react";

const App = () => {
    const [showPicker, setShowPicker] = useState(false);

    const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
	const APP_ID = import.meta.env.VITE_GOOGLE_APP_ID;

    const [selectedFile, setSelectedFile] = useState(null);

    const takeFile = (e) => {
        const file = e.target.files[0];

        if (file) {
            URL.revokeObjectURL(selectedFile);
            const url = URL.createObjectURL(file);
            console.log("file opening...");
            setSelectedFile(url);
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
                            // e.detail.docs is an array, get the first selected file
                            
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
                    
        
                <input className="picker-btn" onChange={takeFile} type="file" accept=".pdf" />
            </aside>

            <main className="viewer-container">
                <div className="viewer-content">
                    <WebViewer key={selectedFile} file={selectedFile} />
                </div>
            </main>
                    
        </div>
    );
}

export default App
