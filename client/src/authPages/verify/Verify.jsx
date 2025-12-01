import React, { useState, useRef, useEffect } from "react"
import ClickSpark from "../../components/ClickSpark/ClickSpark"
import InfiniteScroll from "../../components/InfiniteScroll/InfiniteScroll"

import { Link } from "react-router"
import { OTPForm } from "@/components/otp-form"

// Custom OTP Input Component (mimics react-verification-input)
const items = [
  { content: "Verify" },
]
const OTPInput = ({ length = 6, onChange, value }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""))
  const inputRefs = useRef([])

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  useEffect(() => {
    onChange(otp.join(""))
  }, [otp, onChange])

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))])

    // Focus next input
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        // Focus previous input if current is empty
        inputRefs.current[index - 1].focus()
      }
      // Clear current input
      setOtp([...otp.map((d, idx) => (idx === index ? "" : d))])
    }
  }

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text")
    if (paste.length === length && /^\d+$/.test(paste)) {
      const pasteArray = paste.split("")
      setOtp(pasteArray)
      inputRefs.current[length - 1].focus()
    }
  }

  return (
    <div className="flex gap-3 justify-center">
      {otp.map((data, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          maxLength="1"
          value={data}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="w-12 h-12 bg-gray-800 border border-gray-700 rounded-xl text-white text-center text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-gray-750"
        />
      ))}
    </div>
  )
}

// ClickSpark component (simplified version)

const Verify = () => {
  const [otp, setOtp] = useState("")
  const [email] = useState("user@example.com") // This would come from props or context
  const [isResending, setIsResending] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (otp.length === 6) {
      console.log("OTP submitted:", otp)
      // Handle OTP verification logic here

      try {
        const response = await fetch("http://localhost:3000/auth/verify-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp }),
        })
        const data = await response.json()
        console.log("Response:", data)
      } catch (error) {
        console.error("Error during OTP verification:", error)
      }
    }
  }

  const handleResendOTP = async () => {
    setIsResending(true)
    setCountdown(30)

    // Simulate API call
    setTimeout(() => {
      setIsResending(false)
      console.log("OTP resent")
    }, 1000)

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  return (

    <ClickSpark
      className="z-[9999]"
      sparkColor='#000000'
      sparkSize={10}
      sparkRadius={18}
      sparkCount={8}
      duration={400}>

      <div className="bg-white text-black min-h-screen flex flex-col items-center justify-center w-full p-4">
        <OTPForm />
      </div>
    </ClickSpark>
  )
}

export default Verify