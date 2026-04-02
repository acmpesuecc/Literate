import React from 'react'
import {Outlet} from 'react-router'
import WebViewer from "@/components/WebViewer.jsx";
import { useState } from "react";

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
                                    const url = URL.createObjectURL(blob);
                                    URL.revokeObjectURL(selectedFile);
                                    setSelectedFile(url);
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
