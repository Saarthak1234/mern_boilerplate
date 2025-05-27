import React, { useState, useRef, useEffect } from "react"
import ClickSpark from "../../components/ClickSpark/ClickSpark"
import InfiniteScroll from "../../components/InfiniteScroll/InfiniteScroll"

import { Link } from "react-router"

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

  const handleSubmit = (e) => {
    e.preventDefault()
    if (otp.length === 6) {
      console.log("OTP submitted:", otp)
      // Handle OTP verification logic here
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
      sparkColor='#fff'
      sparkSize={10}
      sparkRadius={18}
      sparkCount={10}
      duration={300}>

      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center w-full p-4">
          <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-800">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Verify Your Account</h1>
              <p className="text-gray-400 mb-2">
                We've sent a verification code to
              </p>
              <p className="text-blue-400 font-medium">{email}</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="text-center">
                  <label className="block text-gray-300 text-sm font-medium mb-4">
                    Enter 6-digit verification code
                  </label>
                  <OTPInput
                    length={6}
                    onChange={setOtp}
                    value={otp}
                  />
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={otp.length !== 6}
                className="relative w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-100 hover:scale-102 hover:from-blue-500 hover:to-blue-500 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Verify Account
              </button>

              <div className="text-center space-y-2">
                <p className="text-gray-400 text-sm">
                  Didn't receive the code?
                </p>
                <button
                  onClick={handleResendOTP}
                  disabled={isResending || countdown > 0}
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                >
                  {isResending ? "Sending..." : countdown > 0 ? `Resend in ${countdown}s` : "Resend Code"}
                </button>
              </div>

              <div className="text-center">
                <p className="text-gray-400 text-sm">
                  Remember your password?{" "}
                  <Link to="/login" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
                    Back to Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        
      </div>
    </ClickSpark>
  )
}

export default Verify