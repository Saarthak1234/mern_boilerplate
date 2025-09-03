"use client"
import { useState } from "react"
import { Link } from "react-router"
import ClickSpark from "../../components/ClickSpark/ClickSpark"

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    username: "", // Fixed typo from "useranme"
    isAdmin: false,
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      console.log("Response:", response)
    } catch (error) {
      console.error("Error during login:", error)
    }

  }

  return (
    <ClickSpark
      className="z-[9999]"
      sparkColor='#fff'
      sparkSize={10}
      sparkRadius={18}
      sparkCount={10}
      duration={300}>

      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center w-full p-4">
        <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-800">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Login</h1>
            <p className="text-gray-400">Login to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">

              <input
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                type="email"
                placeholder="Email"
                value={formData.email}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-gray-750"
              />

              <input
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                type="password"
                placeholder="Password"
                value={formData.password}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-gray-750"
              />

            </div>
            <button
              type="submit"
              className="z-[-1]relative w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-100 hover:scale-102 hover:from-blue-500 hover:to-blue-500 active:scale-92"
            >
              Log In
            </button>

            <div className="text-center">
              <p className="text-gray-400">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </ClickSpark>
  )
}

export default Login