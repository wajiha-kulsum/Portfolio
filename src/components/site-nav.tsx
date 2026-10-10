"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { NAV_LINKS } from "@/lib/site";

/**
 * Floating frosted-glass pill navigation. Desktop keeps the inline links;
 * phones collapse them into a dropdown menu under the pill, driven by a
 * hamburger toggle. Links close the menu after navigating to an anchor.
 */
export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div className="relative w-full sm:w-fit">
        <nav
          aria-label="Primary"
          className="nav-glass flex items-center justify-between gap-1 rounded-full border border-border py-1.5 pl-4 pr-2 shadow-sm sm:justify-start sm:gap-2"
        >
          <a
            href="#about"
            onClick={() => setOpen(false)}
            className="pr-1 font-display text-sm font-semibold tracking-tight"
          >
            <span className="hidden sm:inline">Wajiha Kulsum</span>
            <span className="sm:hidden">Wajiha</span>
          </a>

          <div className="mx-1 h-4 w-px shrink-0 bg-border" aria-hidden />

          {/* Inline links — desktop only */}
          <div className="hidden items-center sm:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="link-underline rounded-full px-3 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mx-1 hidden h-4 w-px shrink-0 bg-border sm:block" aria-hidden />

          <div className="flex items-center gap-1">
            <ThemeToggle className="shrink-0" />
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground sm:hidden"
            >
              {open ? <X size={15} strokeWidth={2} /> : <Menu size={15} strokeWidth={2} />}
            </button>
          </div>
        </nav>

        {/* Mobile dropdown */}
        {open && (
          <div className="nav-glass absolute inset-x-0 top-full mt-2 rounded-2xl border border-border p-2 shadow-lg sm:hidden">
            <ul className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-[var(--hover)]"
                  >
                    {link.label}
                    <span aria-hidden className="text-muted-foreground">
                      &rarr;
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
