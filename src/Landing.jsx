import React from 'react'
import { useNavigate, Link } from "react-router";
import "./index.css";
import { GoogleLogin } from '@react-oauth/google'

const Landing = () => {
  let navigate = useNavigate();

  return (
    <div className="app-container">
      <aside className="sidebar">
        <Link to="/about" className="nav-item">About Us</Link>
        <Link to= "/team" className="nav-item">The Team</Link>
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
