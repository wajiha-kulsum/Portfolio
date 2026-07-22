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
      <div className="flex items-center justify-center rounded-full bg-[#222] dark-toggle-bg p-[6px] gap-[6px]">
        <button
          type="button"
          onClick={() => toggleTheme("dark")}
          className={`flex items-center justify-center rounded-full px-3 py-1.5 transition-all cursor-pointer ${
            theme === "dark" ? "bg-black text-white shadow" : "text-white/40 hover:text-white"
          }`}
          aria-label="Dark mode"
        >
          <Moon className="w-[23px] h-[23px]" />
        </button>
        <button
          type="button"
          onClick={() => toggleTheme("light")}
          className={`flex items-center justify-center rounded-full px-3 py-1.5 transition-all cursor-pointer ${
            theme === "light" ? "bg-white text-black shadow" : "text-white/40 hover:text-white"
          }`}
          aria-label="Light mode"
        >
          <Sun className="w-[23px] h-[23px]" />
        </button>
      </div>
    </div>
  );
}