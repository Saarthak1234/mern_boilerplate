"use client"
import { use, useState } from "react"
import { Link } from "react-router"
import ClickSpark from "../../components/ClickSpark/ClickSpark"
import OAuthButtons from "../../components/OAuthComponent/OAuthButtons"
import { SignupForm } from "../../components/signup-form"

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    // confirmPassword: "",
  })

  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.password) newErrors.password = "Password is required"
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters"
    // if (formData.password !== formData.confirmPassword) {
    //   newErrors.confirmPassword = "Passwords do not match"
    // }

    return newErrors
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    console.log("Form submitted:", formData)

    try {
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          userName: formData.email.split('@')[0],
        }),
      })
      const data = await response.json()
      console.log("Response:", data)

      if (response.ok) {
        // Redirect to verification page or login
        window.location.href = "/login"
      }
    } catch (error) {
      console.error("Error during signup:", error)
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
        <SignupForm onSubmit={handleSubmit}
          formData={formData}
          onChange={handleChange}/>
      </div>
    </ClickSpark>
  )
}

export default Signup