"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
const DARK_QUERY = "(prefers-color-scheme: dark)";

const OPTIONS = [
  { id: "light", icon: Sun, label: "Light mode" },
  { id: "dark", icon: Moon, label: "Dark mode" },
] as const;

function getSavedTheme(): Theme | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "dark" || saved === "light" ? saved : null;
  } catch {
    // Storage unavailable — fall back to the OS setting.
    return null;
  }
}

function getSystemTheme(): Theme {
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
}

/** Effective theme: an explicit saved choice wins, otherwise follow the OS. */
function getTheme(): Theme {
  return getSavedTheme() ?? getSystemTheme();
}

/** React reports "light" for SSR; the client value is adopted after hydration. */
function getServerTheme(): Theme {
  return "light";
}

/**
 * The OS setting, the saved choice, and the DOM attribute are all external
 * systems, so subscribe to every one of them: OS switches, cross-tab
 * storage events, and attribute mutations.
 */
function subscribe(onChange: () => void): () => void {
  const media = window.matchMedia(DARK_QUERY);
  media.addEventListener("change", onChange);
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  window.addEventListener("storage", onChange);
  return () => {
    media.removeEventListener("change", onChange);
    observer.disconnect();
    window.removeEventListener("storage", onChange);
  };
}

function readAttribute(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

/**
 * Light/dark segmented control. With no saved choice the site follows the
 * device's OS color scheme (and keeps following it if the OS setting
 * changes); picking a side here saves an explicit override. A tiny script in
 * the root layout applies the right value before first paint — no flash.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const active = useSyncExternalStore(subscribe, getTheme, getServerTheme);
  const [requested, setRequested] = useState<Theme | null>(null);

  // Persist explicit choices and reflect them in the DOM (the attribute
  // mutation notifies the subscription above, which re-renders with the
  // new effective theme).
  useEffect(() => {
    if (requested === null) return;
    if (requested === "dark") {
      document.documentElement.dataset.theme = "dark";
    } else {
      delete document.documentElement.dataset.theme;
    }
    try {
      localStorage.setItem(STORAGE_KEY, requested);
    } catch {
      // Private browsing / storage disabled — theme just won't persist.
    }
  }, [requested]);

  // Keep the DOM attribute in sync with the effective theme. This covers OS
  // switches while following the system, plus cross-tab changes.
  useEffect(() => {
    if (readAttribute() === active) return;
    if (active === "dark") {
      document.documentElement.dataset.theme = "dark";
    } else {
      delete document.documentElement.dataset.theme;
    }
  }, [active]);

  return (
    <div className={className} role="group" aria-label="Color scheme">
      <div className="flex items-center gap-0.5 rounded-full border border-border p-0.5">
        {OPTIONS.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => setRequested(id)}
            aria-label={label}
            aria-pressed={active === id}
            className={`flex h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 ${
              active === id
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon size={13} strokeWidth={2} />
            <span className="sr-only">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
