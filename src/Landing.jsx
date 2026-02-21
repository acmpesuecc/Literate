import React from 'react'
import { useNavigate } from "react-router";

import { GoogleLogin } from '@react-oauth/google'

const Landing = () => {
  let navigate = useNavigate();

  return (
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
  )
}

export default Landing
