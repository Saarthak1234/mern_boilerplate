//Basic Frontend setup with React and Vite
import React from 'react'
import {Route, Routes} from 'react-router-dom'
import './App.css'
import Login from './authPages/Login/Login'
import SignUp from './authPages/signup/SignUp'
import Verify from './authPages/verify/Verify'
import HomePage from './Pages/Home/HomePage'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/verify" element={<Verify />} />
    </Routes>
    </>
  )
}

export default App
