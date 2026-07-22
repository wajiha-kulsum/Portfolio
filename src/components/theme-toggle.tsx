"use client";

import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  // ponytail: dark-only design, toggle exists in design but always dark
  return (
    <div className={className}>
      <div className="flex items-center justify-center rounded-full bg-[#222] p-[6px] gap-[6px]">
        <div className="flex items-center justify-center rounded-full bg-black px-3 py-1.5">
          <Moon className="w-[23px] h-[23px]" />
        </div>
        <div className="flex items-center justify-center rounded-full px-3 py-1.5">
          <Sun className="w-[23px] h-[23px] text-white/40" />
        </div>
      </div>
    </div>
  );
}