"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

const OPTIONS = [
  { id: "light", icon: Sun, label: "Light mode" },
  { id: "dark", icon: Moon, label: "Dark mode" },
] as const;

/** Reads the applied theme from the <html> attribute (string identity is stable). */
function getTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

/** React reports "light" for SSR; the client value is adopted after hydration. */
function getServerTheme(): Theme {
  return "light";
}

/**
 * The DOM attribute + localStorage are external systems: other documents may
 * change the attribute (e.g. cross-tab storage events), so subscribe with a
 * MutationObserver plus a storage listener.
 */
function subscribe(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  window.addEventListener("storage", onChange);
  return () => {
    observer.disconnect();
    window.removeEventListener("storage", onChange);
  };
}

/**
 * Light/dark segmented control. Light is the default; a tiny script in the
 * root layout applies `data-theme="dark"` before first paint, so there is
 * never a flash. The toggle only sets an intention — an effect applies it to
 * the DOM and persists the choice.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const active = useSyncExternalStore(subscribe, getTheme, getServerTheme);
  const [requested, setRequested] = useState<Theme | null>(null);

  // Apply intentions to the external world (attribute + persistence).
  useEffect(() => {
    if (requested === null || requested === getTheme()) return;
    if (requested === "dark") {
      document.documentElement.dataset.theme = "dark";
    } else {
      delete document.documentElement.dataset.theme;
    }
    try {
      localStorage.setItem("theme", requested);
    } catch {
      // Private browsing / storage disabled — theme just won't persist.
    }
  }, [requested]);

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
