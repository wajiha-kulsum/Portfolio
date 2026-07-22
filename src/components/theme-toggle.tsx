"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    if (saved) {
      setTheme(saved);
      if (saved === "light") {
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.remove("light");
      }
    }
  }, []);

  const toggleTheme = (newTheme: "dark" | "light") => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-center rounded-full bg-[#1A1A1A] light:bg-[#EAEAEA] p-[3px] border border-white/10 light:border-black/10">
        <button
          type="button"
          onClick={() => toggleTheme("dark")}
          className={`flex items-center justify-center rounded-full px-2.5 py-1 text-xs font-medium transition-all cursor-pointer ${
            theme === "dark"
              ? "bg-[#2A2A2A] text-white shadow-sm"
              : "text-white/50 hover:text-white"
          }`}
          aria-label="Dark mode"
        >
          <Moon className="w-4 h-4 mr-1" />
          <span>Dark</span>
        </button>
        <button
          type="button"
          onClick={() => toggleTheme("light")}
          className={`flex items-center justify-center rounded-full px-2.5 py-1 text-xs font-medium transition-all cursor-pointer ${
            theme === "light"
              ? "bg-white text-black shadow-sm"
              : "text-white/50 light:text-black/50 hover:text-black"
          }`}
          aria-label="Light mode"
        >
          <Sun className="w-4 h-4 mr-1" />
          <span>Light</span>
        </button>
      </div>
    </div>
  );
}