import React from 'react'
import { GoogleLogin } from '@react-oauth/google'

const Landing = () => {
  return (
    <div>
      <GoogleLogin 
      onSuccess={(credentialResponse) => {console.log(credentialResponse)}} 
      onError={() => console.log("Failed to login :(")}
      width="200px" theme="outline" />
    </div>
  )
}

export default Landing
