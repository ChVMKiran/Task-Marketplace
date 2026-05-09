"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />; // Placeholder to avoid layout shift
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative w-9 h-9 rounded-xl flex items-center justify-center text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors border border-transparent hover:border-neutral-200"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme === "dark" ? "dark" : "light"}
          initial={{ y: -20, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, rotate: 45 }}
          transition={{ duration: 0.2 }}
        >
          {theme === "dark" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
