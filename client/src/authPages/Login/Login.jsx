"use client"
import { useState } from "react"
import { Link } from "react-router"
import ClickSpark from "../../components/ClickSpark/ClickSpark"
import OAuthButtons from "../../components/OAuthComponent/OAuthButtons"
import { LoginForm } from "../../components/login-form"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      console.log("Response:", data)
    } catch (error) {
      console.error("Error during login:", error)
    }
  }

  return (
    <ClickSpark
      className="z-[9999]"
      sparkColor='#000000'
      sparkSize={10}
      sparkRadius={18}
      sparkCount={10}
      duration={300}>

      <div className="bg-white text-black min-h-screen flex flex-col items-center justify-center w-full p-4">

        <LoginForm 
        onSubmit={handleSubmit}
          formData={formData}
          onChange={handleChange}/>
      </div>
    </ClickSpark>
  )
}

export default Login