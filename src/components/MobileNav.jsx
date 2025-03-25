import React, { useState, useMemo, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function MobileNav({ navItems }) {
  const location = useLocation();
  const pathname = location.pathname;
  const [showMore, setShowMore] = useState(false);
  const mainNavItems = useMemo(() => navItems.slice(0, 5), [navItems]);
  const moreNavItems = useMemo(() => navItems.slice(5), [navItems]);

  const toggleShowMore = useCallback(() => setShowMore((prev) => !prev), []);

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-[#2A2D3A] bg-[#1E1E1E] z-50">
      <nav className="flex items-center justify-around">
        {mainNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} to={item.href} className="flex flex-col items-center gap-1 p-2 text-sm">
              <item.icon className={`w-6 h-6 ${isActive ? "text-[#16A34A]" : "text-[#A1A1A1]"}`} />
              <span className={`text-xs ${isActive ? "text-[#16A34A] font-medium" : "text-[#A1A1A1]"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
        {moreNavItems.length > 0 && (
          <button onClick={toggleShowMore} className="flex flex-col items-center gap-1 p-2 text-sm">
            <MoreHorizontal className="w-6 h-6 text-[#A1A1A1]" />
            <span className="text-xs text-[#A1A1A1]">More</span>
          </button>
        )}
      </nav>
      <AnimatePresence>
        {showMore && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute bottom-full left-0 right-0 bg-[#1E1E1E] border-t border-[#2A2D3A] shadow-lg"
          >
            <nav className="grid grid-cols-5 gap-4 p-4">
              {moreNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.href} to={item.href} className="flex flex-col items-center gap-1 p-2 text-sm">
                    <item.icon className={`w-6 h-6 ${isActive ? "text-[#16A34A]" : "text-[#A1A1A1]"}`} />
                    <span className={`text-xs ${isActive ? "text-[#16A34A] font-medium" : "text-[#A1A1A1]"}`}>
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}