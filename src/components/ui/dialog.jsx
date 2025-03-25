import React from "react";
import { X } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

export function Dialog({ isOpen, onClose, title, children, className = "" }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`relative bg-[#1E1E1E] border border-[#2A2D3A] rounded-lg shadow-lg w-full max-w-md mx-4 max-h-[90vh] flex flex-col ${className}`}
          >
            <div className="flex items-center justify-between p-4 border-b border-[#2A2D3A]">
              <h2 className="text-lg font-semibold text-[#E4E4E4]">{title}</h2>
              <button onClick={onClose} className="text-[#A1A1A1] hover:text-[#E4E4E4] transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="overflow-auto p-4 flex-1">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
