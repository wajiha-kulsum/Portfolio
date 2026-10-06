import { ThemeToggle } from "@/components/theme-toggle";
import { NAV_LINKS } from "@/lib/site";

/**
 * Floating frosted-glass pill navigation, fixed to the top of the viewport.
 * Links collapse on small screens where the section anchors are still
 * reachable by scrolling.
 */
export function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        aria-label="Primary"
        className="nav-glass flex items-center gap-1 rounded-full border border-border py-1.5 pl-4 pr-2 shadow-sm sm:gap-2"
      >
        <a
          href="#about"
          className="hidden pr-1 font-display text-sm font-semibold tracking-tight sm:inline-block"
        >
          Wajiha Kulsum
        </a>
        <a
          href="#about"
          className="inline-block px-1 font-display text-sm font-semibold tracking-tight sm:hidden"
          aria-label="Wajiha Kulsum — home"
        >
          WK
        </a>

        <div className="mx-1 h-4 w-px shrink-0 bg-border" aria-hidden />

        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="rounded-full px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground sm:px-3 sm:text-sm"
          >
            {link.label}
          </a>
        ))}

        <div className="mx-1 h-4 w-px shrink-0 bg-border" aria-hidden />
        <ThemeToggle className="shrink-0" />
      </nav>
    </header>
  );
}
