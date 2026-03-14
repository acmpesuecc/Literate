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
        <div>
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
        <h1 className="title">Literate</h1>
      </main>
    </div>
  )
}

export default Landing
