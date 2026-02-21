import React from 'react'

import {
  DrivePicker,
  DrivePickerDocsView,
} from "@googleworkspace/drive-picker-react";
import {useState} from 'react'

const App = () => {
const [showPicker, setShowPicker] = useState(false);
  const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
	const APP_ID = import.meta.env.VITE_GOOGLE_APP_ID;
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
        </div>
    );
}

export default App
