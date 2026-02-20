import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { createBrowserRouter, RouterProvider } from 'react-router';
import Landing from './Landing.jsx';

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const router = createBrowserRouter([
    {path: "/", Component: Landing}
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <GoogleOAuthProvider clientId = {CLIENT_ID} >
            <RouterProvider router={router} />
        </GoogleOAuthProvider>
    </StrictMode>
)