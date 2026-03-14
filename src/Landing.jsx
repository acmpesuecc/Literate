import React from 'react'
import { useNavigate } from "react-router";
import "./index.css";
import { GoogleLogin } from '@react-oauth/google'

const Landing = () => {
  let navigate = useNavigate();

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="nav-item">About Us</div>
        <div className="nav-item">The Team</div>
        <div className="nav-item">
          <GoogleLogin 
          onSuccess={
            (credentialResponse) => {
              console.log(credentialResponse);
              navigate("/app");
            }} 
          onError={() => console.log("Failed to login :(")}
          width="200px" theme="outline" />
        </div>
      </aside>
      <main className="main-content">
        
        <div className="logo-container">
          LITERATE
        </div>
      
      </main>
    </div>
  )
}

export default Landing
