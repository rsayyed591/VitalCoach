import { useState, useEffect, useRef } from "react"
import { X, Send, Mic, Copy, RotateCcw, Heart } from 'lucide-react'
import axios from 'axios'

const ngrok_url_m = "your_ngrok_url_here"
const mToken = "your_token_here"

const apim = axios.create({
  baseURL: `${ngrok_url_m}/`,
})

// Function to send chat message to the backend
const sendChatMessage = async (message) => {
  const messageData = { message }
  try {
    const response = await apim.post("/query", messageData, {
      headers: {
        Authorization: `Bearer ${mToken}`,
        "Content-Type": "application/json",
      },
    })
    return response.data.reply
  } catch (error) {
    throw new Error("Error communicating with the server")
  }
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

  // Add refs for speech APIs
  const speechRecognitionRef = useRef(null)
  const synthesisRef = useRef(null)

  const chatRef = useRef(null)
  const messagesEndRef = useRef(null)
  const cycleRef = useRef(null)

  // Initialize browser APIs safely
  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
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
      const userMessage = { text: inputMessage, sender: "user" }
      setMessages((prevMessages) => [...prevMessages, userMessage])
      setInputMessage("")

      try {
        const botResponse = await sendMessageToBackend(inputMessage)
        setMessages((prevMessages) => [...prevMessages, { text: botResponse, sender: "bot" }])
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
  }, [messages])

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
    return classes.filter(Boolean).join(' ')
  }

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleChat} />}
      <div className="fixed bottom-20 right-4 z-50">
        {isOpen ? (
          <div
            ref={chatRef}
            className="bg-[#1E1E1E] border border-[#2A2D3A] shadow-xl flex flex-col w-full sm:w-[450px] h-[70vh] max-h-[760px] rounded-lg overflow-hidden"
          >
            <div className="bg-[#16A34A] text-white p-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold">ArogyaBot</h2>
              <button onClick={toggleChat} className="text-white hover:text-gray-200" aria-label="Close chat">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} items-start gap-2`}
                >
                  {message.sender === "bot" && (
                    <div className="relative w-4 h-4 rounded-full bg-[#16A34A]/20 flex items-center justify-center">
                      <Heart className="w-2 h-2 text-[#16A34A]" />
                    </div>
                  )}
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender === "user" 
                        ? "bg-[#16A34A] text-white" 
                        : "bg-[#2A2D3A] text-[#E4E4E4]"
                    }`}
                  >
                    {message.text}
                  </div>
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
                        isSpeaking && "text-[#16A34A] animate-pulse"
                      )}
                      aria-label="Speak message"
                    >
                      <Mic className="w-4 h-4 text-[#A1A1A1]" />
                    </button>
                  </div>
                </div>
              ))}
              {error && <div className="text-[#FF4D4D] text-center">{error}</div>}
              {isLoading && (
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#16A34A]"></div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="border-t border-[#2A2D3A] p-4 flex gap-2">
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
                  isListening && "text-[#16A34A] animate-pulse"
                )}
                aria-label="Toggle microphone"
              >
                <Mic className="w-5 h-5 text-[#A1A1A1]" />
              </button>
              <button
                type="submit"
                className="bg-[#16A34A] text-white rounded-lg px-4 py-2 hover:bg-[#16A34A]/80 focus:outline-none focus:ring-1 focus:ring-[#16A34A] disabled:opacity-50"
                aria-label="Send message"
                disabled={isLoading}
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        ) : (
          <button
            onClick={toggleChat}
            className={`bg-[#16A34A] text-white rounded-full shadow-lg hover:bg-[#16A34A]/80 focus:outline-none focus:ring-1 focus:ring-[#16A34A] transition-all duration-300 ease-in-out ${
              isExpanded ? "px-2 py-1" : "p-2"
            }`}
            aria-label="Open chat"
          >
            <div className="flex items-center z-30">
              <Heart size={18} className={isExpanded ? "mr-2" : ""} />
              <span
                className={`whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${
                  isExpanded ? "max-w-[100px] opacity-100" : "max-w-0 opacity-0"
                }`}
              >
                ArogyaBot
              </span>
            </div>
          </button>
        )}
      </div>
    </>
  )
}
