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
            <h1> {' '}  About Us</h1>
                <p>    Most PDF viewers today are either locked to one device or rely on a company's server, which risks your privacy and access if that server goes down which is very risky to our data.</p>
                <p>    Literate enables users to maintain a unified reading experience across devices without relying on proprietary servers. Users select specific folders within their own cloud storage (starting with Google Drive) to serve as their library..</p>
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