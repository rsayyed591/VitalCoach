"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

export function Modal({ isOpen, onClose, children, title }) {
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      onClose()
    }, 300)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${isClosing ? "opacity-0" : "opacity-50"}`}
        onClick={handleClose}
      />
      <div
        className={`relative bg-[#1E1E1E] border border-[#2A2D3A] rounded-lg shadow-lg w-full max-w-md mx-4 max-h-[90vh] flex flex-col transition-all duration-300 ${
          isClosing ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-[#2A2D3A]">
          <h2 className="text-lg font-semibold text-[#E4E4E4]">{title}</h2>
          <button onClick={handleClose} className="text-[#A1A1A1] hover:text-[#E4E4E4] transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="overflow-auto p-4 flex-1">{children}</div>
      </div>
    </div>
  )
}

export function Dialog({ isOpen, onClose, title, children }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      {children}
    </Modal>
  )
}

