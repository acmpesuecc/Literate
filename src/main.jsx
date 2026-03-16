import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { createBrowserRouter, RouterProvider } from 'react-router';
import Landing from './Landing.jsx';
import { Mainview } from './Mainview.jsx'

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const router = createBrowserRouter([
    {path: "/", Component: Landing},
    {path: "/app", 
        Component: App,
    children:[
        {
            index:true,
            Component: Mainview
        },
        
        
    ]},
    {
        path: "about", 
        element: <div className="text-view">
            <h1> &nbsp; About Us</h1>
                <p> &nbsp;   Most PDF viewers today are either locked to one device or rely on a company's server, which risks your privacy and access if that server goes down which is very risky to our data.</p>
                <p> &nbsp;   Literate enables users to maintain a unified reading experience across devices without relying on proprietary servers. Users select specific folders within their own cloud storage (starting with Google Drive) to serve as their library..</p>
            </div> //&nbsp; is a HTML entity for a non-breaking space, which is used here to create indentation for the paragraphs.
    },
    {
        path: "team", 
        element: <div className="text-view">
            <h1>  The Team</h1>
                <p>  
                    <ul className="team-list">
                        <li>&nbsp;  Arjun (Mentor)</li>
                        <li>&nbsp;  Hemanth (Mentor)</li>
                        <li>&nbsp;  Gagan (Mentee)</li>
                        <li>&nbsp;  Prithika (Mentee)</li>
                        <li>&nbsp;  Harshul (Mentee)</li>
                        <li>&nbsp;  Avantika (Mentee)</li>
                        <li>&nbsp;  Krithik (Mentee)</li>
                        <li>&nbsp;  Anna (Mentee)</li>
                    </ul>
                </p>
            </div>
    }
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <GoogleOAuthProvider clientId = {CLIENT_ID} >
            <RouterProvider router={router} />
        </GoogleOAuthProvider>
    </StrictMode>
)