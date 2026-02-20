import React from 'react'
import Landing from './Landing.jsx'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<Landing />} />
    </Routes>
    </>
  )
}

export default App
