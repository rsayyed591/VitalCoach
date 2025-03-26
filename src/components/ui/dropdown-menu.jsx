"use client"

import React, { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight } from "lucide-react"

const DropdownMenuContext = React.createContext({
  open: false,
  setOpen: () => {},
  triggerRef: null,
})

export const DropdownMenu = ({ children }) => {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef(null)

  return <DropdownMenuContext.Provider value={{ open, setOpen, triggerRef }}>{children}</DropdownMenuContext.Provider>
}

export const DropdownMenuTrigger = ({ children, asChild = false }) => {
  const { open, setOpen, triggerRef } = React.useContext(DropdownMenuContext)

  const handleClick = (e) => {
    e.stopPropagation()
    setOpen(!open)
  }

  const childrenWithProps = React.cloneElement(
    asChild ? children : <button className="inline-flex items-center justify-center">{children}</button>,
    {
      ref: triggerRef,
      onClick: handleClick,
      "aria-expanded": open,
      "aria-haspopup": true,
    },
  )

  return childrenWithProps
}

export const DropdownMenuContent = ({ children, align = "center", sideOffset = 4, className = "", onClose }) => {
  const { open, setOpen, triggerRef } = React.useContext(DropdownMenuContext)
  const contentRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setOpen(false)
        if (onClose) onClose()
      }
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false)
        if (onClose) onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscape)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [setOpen, onClose])

  // Calculate position
  const [position, setPosition] = useState({ top: 0, left: 0 })

  useEffect(() => {
    if (open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      const contentRect = contentRef.current?.getBoundingClientRect()
      const contentWidth = contentRect?.width || 200

      let left
      if (align === "start") {
        left = rect.left
      } else if (align === "end") {
        left = rect.right - contentWidth
      } else {
        left = rect.left + rect.width / 2 - contentWidth / 2
      }

      // Ensure dropdown doesn't go off screen
      const rightEdge = left + contentWidth
      if (rightEdge > window.innerWidth) {
        left = window.innerWidth - contentWidth - 10
      }
      if (left < 10) left = 10

      setPosition({
        top: rect.bottom + sideOffset + window.scrollY,
        left,
      })
    }
  }, [open, align, sideOffset])

  if (!open) return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.15 }}
          style={{
            position: "absolute",
            top: position.top,
            left: position.left,
            zIndex: 50,
          }}
          className={`dropdown-menu ${className}`}
          role="menu"
          aria-orientation="vertical"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

export const DropdownMenuItem = ({ children, onSelect, disabled = false, className = "", icon, rightIcon }) => {
  const { setOpen } = React.useContext(DropdownMenuContext)

  const handleClick = () => {
    if (disabled) return
    if (onSelect) onSelect()
    setOpen(false)
  }

  return (
    <div
      className={`dropdown-item ${className}`}
      role="menuitem"
      onClick={handleClick}
      data-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
    >
      {icon && <span className="mr-2 h-4 w-4">{icon}</span>}
      {children}
      {rightIcon && <span className="ml-auto h-4 w-4">{rightIcon}</span>}
    </div>
  )
}

export const DropdownMenuSeparator = ({ className = "" }) => {
  return <div className={`dropdown-separator ${className}`} role="separator" />
}

export const DropdownMenuLabel = ({ children, className = "" }) => {
  return <div className={`px-3 py-2 text-sm font-medium text-[#A1A1A1] ${className}`}>{children}</div>
}

export const DropdownMenuGroup = ({ children, className = "" }) => {
  return (
    <div className={`px-1 py-1 ${className}`} role="group">
      {children}
    </div>
  )
}

export const DropdownMenuSubTrigger = ({ children, icon, className = "" }) => {
  return (
    <div className={`dropdown-item ${className}`} role="menuitem">
      {icon && <span className="mr-2 h-4 w-4">{icon}</span>}
      <span className="flex-1">{children}</span>
      <ChevronRight className="ml-auto h-4 w-4" />
    </div>
  )
}

export const DropdownMenuCheckboxItem = ({
  children,
  checked = false,
  onCheckedChange,
  disabled = false,
  className = "",
}) => {
  const handleClick = () => {
    if (disabled) return
    if (onCheckedChange) onCheckedChange(!checked)
  }

  return (
    <div
      className={`dropdown-item ${className}`}
      role="menuitemcheckbox"
      aria-checked={checked}
      onClick={handleClick}
      data-disabled={disabled}
    >
      <div className="mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-[#A1A1A1]">
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3 w-3"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
      {children}
    </div>
  )
}

export const DropdownMenuRadioGroup = ({ children, value, onValueChange }) => {
  return (
    <div role="radiogroup" aria-orientation="vertical">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            checked: child.props.value === value,
            onSelect: () => onValueChange(child.props.value),
          })
        }
        return child
      })}
    </div>
  )
}

export const DropdownMenuRadioItem = ({
  children,
  value,
  checked = false,
  onSelect,
  disabled = false,
  className = "",
}) => {
  const handleClick = () => {
    if (disabled) return
    if (onSelect) onSelect()
  }

  return (
    <div
      className={`dropdown-item ${className}`}
      role="menuitemradio"
      aria-checked={checked}
      onClick={handleClick}
      data-disabled={disabled}
    >
      <div className="mr-2 flex h-4 w-4 items-center justify-center rounded-full border border-[#A1A1A1]">
        {checked && <div className="h-2 w-2 rounded-full bg-[#16A34A]" />}
      </div>
      {children}
    </div>
  )
}

