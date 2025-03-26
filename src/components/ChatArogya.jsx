"use client"

import { useState, useEffect, useRef } from "react"
import { X, Send, Mic, Copy, RotateCcw, Heart, Bot, UserIcon } from "lucide-react"
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"

const ngrok_url = "https://b05f-206-84-234-161.ngrok-free.app"

// Function to send chat message to the backend
const sendChatMessage = async (question) => {
  const messageData = { question }
  try {
    const response = await axios.post(`${ngrok_url}/query`, messageData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    console.log("Response", response.data.response)
    return response.data.response
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message)
    throw new Error(error.response?.data?.message || "Error communicating with the server")
  }
}

// Component for typing animation
const TypingAnimation = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentLine, setCurrentLine] = useState(0)

  // Split text into paragraphs/lines
  const lines = text.split("\n").filter((line) => line.trim() !== "")

  useEffect(() => {
    if (currentLine >= lines.length) return

    const currentLineText = lines[currentLine]

    if (currentIndex < currentLineText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + currentLineText[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 15) // Speed of typing

      return () => clearTimeout(timeout)
    } else {
      // Move to next line
      if (currentLine < lines.length - 1) {
        const timeout = setTimeout(() => {
          setDisplayedText((prev) => prev + "\n")
          setCurrentLine((prev) => prev + 1)
          setCurrentIndex(0)
        }, 300) // Pause between lines

        return () => clearTimeout(timeout)
      }
    }
  }, [currentIndex, currentLine, lines])

  // Format the displayed text with line breaks
  const formattedText = displayedText.split("\n").map((line, i) => (
    <span key={i}>
      {line}
      {i < displayedText.split("\n").length - 1 && <br />}
    </span>
  ))

  return <>{formattedText}</>
}

// Loading indicator component
const LoadingIndicator = () => {
  const [dots, setDots] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."))
    }, 400)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-2 text-[#E4E4E4] p-3 bg-[#2A2D3A] rounded-lg max-w-[70%]">
      <div className="relative w-6 h-6 rounded-full bg-[#16A34A]/20 flex items-center justify-center">
        <Bot className="w-3 h-3 text-[#16A34A]" />
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-medium">
        Generating response{dots}
      </motion.div>
    </div>
  )
}

export default function ChatArogya() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [typingComplete, setTypingComplete] = useState({})

  // Add refs for speech APIs
  const speechRecognitionRef = useRef(null)
  const synthesisRef = useRef(null)

  const chatRef = useRef(null)
  const messagesEndRef = useRef(null)
  const cycleRef = useRef(null)

  // Initialize browser APIs safely
  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

      if (SpeechRecognition) {
        speechRecognitionRef.current = new SpeechRecognition()
        speechRecognitionRef.current.continuous = false
        speechRecognitionRef.current.interimResults = true
        speechRecognitionRef.current.lang = "en-US"
      }

      synthesisRef.current = window.speechSynthesis
    }
  }, [])

  useEffect(() => {
    const expandCycle = () => {
      setIsExpanded(true)
      setTimeout(() => {
        setIsExpanded(false)
      }, 7000)
    }

    const startCycle = () => {
      expandCycle()
      cycleRef.current = setInterval(() => {
        expandCycle()
      }, 17000)
    }

    if (!isOpen) {
      startCycle()
    }

    return () => {
      if (cycleRef.current) {
        clearInterval(cycleRef.current)
      }
    }
  }, [isOpen])

  const toggleChat = async () => {
    if (!isOpen) {
      if (messages.length === 0) {
        setMessages([
          {
            text: "Hello! I'm ArogyaBot, your personal Ayurvedic wellness assistant. I can help you understand holistic health practices and provide guidance on natural remedies. How can I support your wellness journey today?",
            sender: "bot",
            id: Date.now(),
          },
        ])
      }
    }
    setIsOpen(!isOpen)
  }

  const handleInputChange = (e) => {
    setInputMessage(e.target.value)
  }

  const sendMessageToBackend = async (message) => {
    setIsLoading(true)
    setError("")

    try {
      const botResponse = await sendChatMessage(message)
      return botResponse
    } catch (error) {
      throw new Error("Error communicating with the server")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (inputMessage.trim() && !isLoading) {
      const userMessageId = Date.now()
      const userMessage = { text: inputMessage, sender: "user", id: userMessageId }
      setMessages((prevMessages) => [...prevMessages, userMessage])
      setInputMessage("")

      try {
        const botResponse = await sendMessageToBackend(inputMessage)
        const botMessageId = Date.now()
        setMessages((prevMessages) => [...prevMessages, { text: botResponse, sender: "bot", id: botMessageId }])
      } catch (error) {
        setError(error.message)
      }
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, typingComplete])

  const handleCopyMessage = (text) => {
    navigator.clipboard.writeText(text)
  }

  const handleRetry = (text) => {
    setInputMessage(text)
  }

  const toggleMicInput = () => {
    if (!speechRecognitionRef.current) {
      setError("Speech recognition is not supported in your browser")
      return
    }

    if (isListening) {
      speechRecognitionRef.current.stop()
      setIsListening(false)
    } else {
      setError("")
      setIsListening(true)

      speechRecognitionRef.current.start()

      speechRecognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("")

        setInputMessage(transcript)
      }

      speechRecognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error)
        setError("Error with speech recognition: " + event.error)
        setIsListening(false)
      }

      speechRecognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }
  }

  const toggleSpeakMessage = (text) => {
    if (!synthesisRef.current) {
      setError("Text-to-speech is not supported in your browser")
      return
    }

    if (synthesisRef.current.speaking) {
      synthesisRef.current.cancel()
      setIsSpeaking(false)
      return
    }

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event)
      setError("Error with text-to-speech")
      setIsSpeaking(false)
    }

    setIsSpeaking(true)
    synthesisRef.current.speak(utterance)
  }

  useEffect(() => {
    return () => {
      if (synthesisRef.current?.speaking) {
        synthesisRef.current.cancel()
      }
      if (speechRecognitionRef.current) {
        speechRecognitionRef.current.abort()
      }
    }
  }, [])

  // Helper function to conditionally join classNames
  const cn = (...classes) => {
    return classes.filter(Boolean).join(" ")
  }

  const handleTypingComplete = (id) => {
    setTypingComplete((prev) => ({ ...prev, [id]: true }))
  }

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleChat} />}
      <div className="fixed bottom-20 right-4 z-50">
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            ref={chatRef}
            className="bg-[#1E1E1E] border border-[#2A2D3A] shadow-xl flex flex-col w-full sm:w-[450px] h-[70vh] max-h-[760px] rounded-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-[#16A34A] to-[#16A34A]/80 text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-lg font-semibold">ArogyaBot</h2>
              </div>
              <button
                onClick={toggleChat}
                className="text-white hover:text-gray-200 p-1 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#1A1A1A]">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} items-start gap-2`}
                  >
                    {message.sender === "bot" && (
                      <div className="relative w-8 h-8 rounded-full bg-[#16A34A]/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-4 h-4 text-[#16A34A]" />
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] rounded-lg p-3 ${
                        message.sender === "user" ? "bg-[#16A34A] text-white" : "bg-[#2A2D3A] text-[#E4E4E4]"
                      }`}
                    >
                      {message.sender === "bot" ? (
                        <TypingAnimation text={message.text} onComplete={() => handleTypingComplete(message.id)} />
                      ) : (
                        message.text
                      )}
                    </div>
                    {message.sender === "user" && (
                      <div className="relative w-8 h-8 rounded-full bg-[#2A2D3A] flex items-center justify-center flex-shrink-0 mt-1">
                        <UserIcon className="w-4 h-4 text-[#A1A1A1]" />
                      </div>
                    )}
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() =>
                          message.sender === "user" ? handleRetry(message.text) : handleCopyMessage(message.text)
                        }
                        className="p-1 hover:bg-[#2A2D3A] rounded-full transition-colors"
                        aria-label={message.sender === "user" ? "Retry message" : "Copy message"}
                      >
                        {message.sender === "user" ? (
                          <RotateCcw className="w-4 h-4 text-[#A1A1A1]" />
                        ) : (
                          <Copy className="w-4 h-4 text-[#A1A1A1]" />
                        )}
                      </button>
                      <button
                        onClick={() => toggleSpeakMessage(message.text)}
                        className={cn(
                          "p-1 hover:bg-[#2A2D3A] rounded-full transition-colors",
                          isSpeaking && "text-[#16A34A] animate-pulse",
                        )}
                        aria-label="Speak message"
                      >
                        <Mic className="w-4 h-4 text-[#A1A1A1]" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[#FF4D4D] text-center bg-[#FF4D4D]/10 p-2 rounded-lg"
                >
                  {error}
                </motion.div>
              )}

              {isLoading && <LoadingIndicator />}

              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="border-t border-[#2A2D3A] p-4 flex gap-2 bg-[#1E1E1E]">
              <input
                type="text"
                value={inputMessage}
                onChange={handleInputChange}
                placeholder="Type a message..."
                className="flex-1 bg-[#2A2D3A] text-[#E4E4E4] border-none rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#16A34A]"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={toggleMicInput}
                className={cn(
                  "p-2 rounded-lg hover:bg-[#2A2D3A] transition-colors",
                  isListening && "text-[#16A34A] animate-pulse",
                )}
                aria-label="Toggle microphone"
              >
                <Mic className="w-5 h-5 text-[#A1A1A1]" />
              </button>
              <button
                type="submit"
                className="bg-[#16A34A] text-white rounded-lg px-4 py-2 hover:bg-[#16A34A]/80 focus:outline-none focus:ring-1 focus:ring-[#16A34A] disabled:opacity-50 transition-colors"
                aria-label="Send message"
                disabled={isLoading}
              >
                <Send size={20} />
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.button
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleChat}
            className={`bg-gradient-to-r from-[#16A34A] to-[#16A34A]/80 text-white rounded-full shadow-lg hover:shadow-[#16A34A]/20 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:ring-offset-2 focus:ring-offset-[#121212] transition-all duration-300 ease-in-out ${
              isExpanded ? "px-4 py-2" : "p-3"
            }`}
            aria-label="Open chat"
          >
            <div className="flex items-center z-30">
              <Heart size={isExpanded ? 18 : 20} className={isExpanded ? "mr-2" : ""} />
              <span
                className={`whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${
                  isExpanded ? "max-w-[100px] opacity-100" : "max-w-0 opacity-0"
                }`}
              >
                ArogyaBot
              </span>
            </div>
          </motion.button>
        )}
      </div>
    </>
  )
}

