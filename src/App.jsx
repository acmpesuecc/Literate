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
        const url = URL.createObjectURL(file);
        console.log("file opening...");
        setSelectedFile(url);
        }
    };

    return (
        <div>
            <div>Crazy cool Literate app UI</div>
            <div>
                <button onClick={() => setShowPicker(true)}>
                    Open Picker
                </button>
                {showPicker && (
                    <DrivePicker
                    client-id={CLIENT_ID}
                    app-id={APP_ID}
                    onPicked={(e) => {
                        document.getElementById("file-deets").textContent = JSON.stringify(e.detail);
                        console.log(e.detail);

                        //make api request to google drive api to download and view said content of pdf
                        setShowPicker(false);
                    }}
                    onCanceled={() => setShowPicker(false)}
                    >
                    <DrivePickerDocsView owned-by-me="true" 
                        mime-types="application/pdf"
                    />
                    </DrivePicker>
                )}

                <div id="file-deets">
        

                </div>

            </div>

            <input onChange={takeFile} type="file" accept=".pdf" />
            <WebViewer file={selectedFile} />
        </div>
    );
}

export default App
