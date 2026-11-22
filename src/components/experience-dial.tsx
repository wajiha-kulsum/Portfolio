"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Volume2,
  VolumeX,
} from "lucide-react";

import { TIMELINE, type TimelineVisual } from "@/lib/site";

/* -------------------------------------------------------------------------- */
/* Pacing and geometry                                                         */
/* -------------------------------------------------------------------------- */

/**
 * Scroll pacing. Each experience owns one step of scroll: for HOLD of it the
 * experience stays still and in focus, the rest is an eased move to the next.
 * LEAD adds still scroll before the first and after the last so they get the
 * same time. Nothing snaps or pulls the page: nobody gets stuck, and every
 * experience stays on screen long enough that nobody skips one.
 */
const HOLD = 0.4;
const LEAD = 0.3;
/** Fine tick lines between two experiences; each one passing plays a tick. */
const TICKS_PER_STEP = 8;
/** Vertical distance between faded neighbour rows. */
const ROW = 54;
/** Half the height of a neighbour row. */
const COMPACT_HALF = 22;
/** Space kept at the bottom of the pinned view for the controls on phones. */
const MOBILE_CONTROLS = 72;

type Mode = "static" | "pin";

type Geo = {
  w: number;
  h: number;
  /** Dial radius, centre and the pointer's x. */
  r: number;
  cx: number;
  cy: number;
  pointerX: number;
  contentLeft: number;
  /** Degrees of dial between two experiences. */
  stepDeg: number;
  /** Scroll distance per experience. */
  step: number;
  /** Half the height of the tallest focused card, and the gap below it. */
  half: number;
  gap: number;
  /** Neighbour rows that fit above and below the focus. */
  above: number;
  below: number;
  mobile: boolean;
};

const pad = (n: number) => String(n).padStart(2, "0");
const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));
const smooth = (t: number) => t * t * (3 - 2 * t);
const rad = (deg: number) => (deg * Math.PI) / 180;

/** Scroll distance into the section to a continuous position, 0..last. */
function positionAt(x: number, step: number, last: number): number {
  const raw = clamp((x - LEAD * step) / step, 0, last);
  const i = Math.floor(raw);
  const f = raw - i;
  const edge = HOLD / 2;
  if (f <= edge) return i;
  if (f >= 1 - edge) return Math.min(i + 1, last);
  return i + smooth((f - edge) / (1 - HOLD));
}

/** Opacity of a neighbour row at distance `ad` from the focus. */
function rowOpacity(ad: number): number {
  if (ad < 0.35) return 0;
  if (ad <= 1) return smooth((ad - 0.35) / 0.65) * 0.55;
  if (ad <= 2) return 0.55 - (ad - 1) * 0.25;
  if (ad <= 3) return 0.3 - (ad - 2) * 0.15;
  return Math.max(0, 0.15 - (ad - 3) * 0.3);
}

/* -------------------------------------------------------------------------- */
/* Clock tick sound: synthesized, no audio file                                */
/* -------------------------------------------------------------------------- */

const SOUND_KEY = "timeline-sound";
const SOUND_EVENT = "timeline-sound-change";
/** Fallback when storage is blocked, so the toggle still works this visit. */
let memorySound: boolean | null = null;

function readSound(): boolean {
  try {
    const saved = localStorage.getItem(SOUND_KEY);
    if (saved) return saved !== "off";
  } catch {
    // Storage blocked: fall through to the in-memory choice.
  }
  return memorySound ?? true;
}

function subscribeSound(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(SOUND_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(SOUND_EVENT, onChange);
  };
}

function playTick(ctx: AudioContext, major: boolean) {
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(major ? 1150 : 2300, t);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(major ? 0.11 : 0.05, t + 0.003);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + (major ? 0.07 : 0.04));
  osc.connect(gain).connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.08);
}

/* -------------------------------------------------------------------------- */
/* Visual for one experience                                                   */
/* -------------------------------------------------------------------------- */

function Visual({
  visual,
  tabbable,
}: {
  visual: TimelineVisual;
  tabbable: boolean;
}) {
  if (visual.kind === "image") {
    return (
      <a
        href={visual.href}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={tabbable ? undefined : -1}
        className="dial-media group"
        aria-label={`${visual.shot.alt} (opens in a new tab)`}
      >
        <Image
          src={visual.shot.src}
          alt={visual.shot.alt}
          fill
          sizes="(min-width: 1024px) 380px, 80vw"
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        <span aria-hidden className="dial-media-arrow">
          <ArrowUpRight size={15} strokeWidth={2} />
        </span>
      </a>
    );
  }
  if (visual.kind === "stat") {
    return (
      <div className="dial-panel justify-end">
        <p className="text-[clamp(2.5rem,min(5vw,8vh),4.25rem)] leading-none tracking-[-0.04em]">
          {visual.value}
        </p>
        <p className="mt-3 max-w-[26ch] text-muted-foreground">
          {visual.label}
        </p>
      </div>
    );
  }
  return (
    <ul className="dial-panel justify-center gap-1 font-mono text-[13px]">
      {visual.items.map((item) => (
        <li
          key={item.name}
          className="flex items-center justify-between gap-4 py-1.5"
        >
          <span className="truncate">
            {visual.prefix && (
              <span className="hidden text-muted-foreground sm:inline">
                {visual.prefix}
              </span>
            )}
            {item.name}
          </span>
          <span className="shrink-0 tabular-nums text-muted-foreground">
            {item.date}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* -------------------------------------------------------------------------- */
/* The dial                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Experience as a scroll-driven clock. The section pins and one number, the
 * scroll position, drives everything on every frame: the tall, thin dial on
 * the left turns so its tick lines pass the pointer (each with a soft tick),
 * the progress arc fills, and the experiences glide through focus. The one at
 * the pointer is sharp; past ones above and coming ones below are smaller,
 * fainter and softer the further they are. Short screens and no-JS get a
 * plain list.
 */
export function ExperienceDial() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const dialRef = useRef<SVGGElement>(null);
  const progressRef = useRef<SVGPathElement>(null);
  const numRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const detailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const compactRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const updateRef = useRef<() => void>(() => {});
  const audioRef = useRef<AudioContext | null>(null);
  const soundRef = useRef(true);
  const geoRef = useRef<Geo | null>(null);

  const [mode, setMode] = useState<Mode>("static");
  const [geo, setGeo] = useState<Geo | null>(null);
  const [active, setActive] = useState(0);
  const sound = useSyncExternalStore(subscribeSound, readSound, () => true);

  const last = TIMELINE.length - 1;
  const pinned = mode === "pin";

  useEffect(() => {
    soundRef.current = sound;
  }, [sound]);

  // Browsers only allow audio after a user gesture: create or resume the
  // context on the first click, tap or key press anywhere on the page.
  const unlockAudio = useCallback(() => {
    if (!soundRef.current) return;
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return;
    if (!audioRef.current) audioRef.current = new Ctor();
    if (audioRef.current.state === "suspended") void audioRef.current.resume();
  }, []);

  useEffect(() => {
    const events = ["pointerdown", "keydown", "touchstart"] as const;
    events.forEach((e) =>
      window.addEventListener(e, unlockAudio, { passive: true }),
    );
    return () => {
      events.forEach((e) => window.removeEventListener(e, unlockAudio));
      void audioRef.current?.close();
      audioRef.current = null;
    };
  }, [unlockAudio]);

  // Paint as soon as the pinned layout renders, not on the first scroll.
  useEffect(() => {
    updateRef.current();
  }, [mode, geo]);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const header = headerRef.current;
    if (!section || !stage || !header) return;

    let currentMode: Mode = "static";
    let lastTick: number | null = null;
    let lastActive = -1;
    let lastSoundAt = 0;
    let frame = 0;
    let measuredW = 0;
    let measuredH = 0;

    const update = () => {
      const g = geoRef.current;
      if (currentMode !== "pin" || !g) return;
      const x = -section.getBoundingClientRect().top;
      const p = positionAt(x, g.step, last);

      // Dial and progress arc. In the dial's own frame experience i sits at
      // i * stepDeg; turning it by -p * stepDeg brings the current one to the
      // pointer, and the arc from experience 0 to here is the time behind.
      dialRef.current?.setAttribute(
        "transform",
        `rotate(${(-p * g.stepDeg).toFixed(4)} ${g.cx} ${g.cy})`,
      );
      const end = rad(p * g.stepDeg);
      progressRef.current?.setAttribute(
        "d",
        p < 0.001
          ? ""
          : `M ${g.cx + g.r} ${g.cy} A ${g.r} ${g.r} 0 0 1 ${(g.cx + g.r * Math.cos(end)).toFixed(2)} ${(g.cy + g.r * Math.sin(end)).toFixed(2)}`,
      );

      // Numbers ride just outside the dial; the one at the pointer gives way
      // to the big number in the card.
      const ring = g.r + (g.mobile ? 16 : 28);
      const visibleDeg =
        (Math.asin(Math.min(1, g.h / 2 / ring)) * 180) / Math.PI;
      numRefs.current.forEach((el, i) => {
        if (!el) return;
        const d = i - p;
        const theta = d * g.stepDeg;
        const nx = g.cx + Math.cos(rad(theta)) * ring;
        const ny = g.cy + Math.sin(rad(theta)) * ring;
        const near = clamp((Math.abs(d) - 0.3) / 0.4, 0, 1);
        const far = clamp(1 - Math.abs(theta) / visibleDeg, 0, 1);
        el.style.transform = `translate(${nx.toFixed(1)}px, ${ny.toFixed(1)}px) translate(-50%, -50%) rotate(${theta.toFixed(2)}deg)`;
        el.style.opacity = (near * far * 0.6).toFixed(3);
      });

      // Cards and neighbour rows, all scroll-linked: the focused card drifts
      // and softens as it leaves while its row slides out to the side it
      // belongs to; the next row slides in and hands over to its card.
      const reach = g.half + g.gap;
      for (let i = 0; i <= last; i++) {
        const d = i - p;
        const ad = Math.abs(d);
        const dir = d < 0 ? -1 : 1;

        const card = detailRefs.current[i];
        if (card) {
          // A clean handover: the outgoing card is gone just before the
          // midpoint and the incoming one starts just after, so two cards
          // never stack.
          const o = smooth(clamp(1 - ad / 0.46, 0, 1));
          card.style.setProperty("--y", `${(d * 110).toFixed(1)}px`);
          card.style.setProperty("--s", (1 - Math.min(ad, 1) * 0.05).toFixed(4));
          card.style.opacity = o.toFixed(3);
          card.style.filter = ad < 0.01 ? "none" : `blur(${(ad * 10).toFixed(2)}px)`;
          card.style.visibility = o < 0.01 ? "hidden" : "visible";
          card.style.pointerEvents = o > 0.6 ? "auto" : "none";
        }

        const row = compactRefs.current[i];
        if (row) {
          const y = ad <= 1 ? dir * ad * reach : dir * (reach + (ad - 1) * ROW);
          const limit = d < 0 ? g.above : g.below;
          const o = rowOpacity(ad) * clamp((limit + 0.5 - ad) / 0.5, 0, 1);
          row.style.setProperty("--y", `${y.toFixed(1)}px`);
          row.style.setProperty("--s", (1 - Math.min(ad, 3) * 0.06).toFixed(4));
          row.style.setProperty("--o", o.toFixed(3));
          row.style.setProperty(
            "--b",
            `${(Math.min(ad, 3.5) * 0.9).toFixed(2)}px`,
          );
          row.style.visibility = o < 0.01 ? "hidden" : "visible";
          row.style.pointerEvents = o > 0.1 ? "auto" : "none";
        }
      }

      const index = Math.round(p);
      const entryChanged = lastActive !== -1 && index !== lastActive;
      if (index !== lastActive) {
        lastActive = index;
        setActive(index);
      }

      const tick = Math.round(p * TICKS_PER_STEP);
      if (lastTick !== null && tick !== lastTick) {
        const ctx = audioRef.current;
        const now = performance.now();
        // At most one sound per frame and never faster than every 28ms.
        if (
          soundRef.current &&
          ctx?.state === "running" &&
          now - lastSoundAt > 28
        ) {
          playTick(ctx, entryChanged);
          lastSoundAt = now;
        }
      }
      lastTick = tick;
    };

    const measure = () => {
      const w = document.documentElement.clientWidth;
      const h = window.innerHeight;
      measuredW = w;
      measuredH = h;
      const mobile = w < 768;
      const laneLeft = Math.max(mobile ? 16 : 24, (w - 1120) / 2 + 24);
      // A tall, thin clock: a big radius with the centre far off screen, so
      // the arc spans the whole height but bulges only a little.
      const r = mobile ? clamp(h * 1.1, 620, 1000) : clamp(h * 1.25, 760, 1400);
      const pointerX = mobile ? 22 : Math.max(64, laneLeft - 80);
      const contentLeft = pointerX + (mobile ? 46 : 104);
      const contentRight = mobile ? 16 : Math.max(24, (w - 1120) / 2 + 24);
      const gap = mobile ? 36 : h < 720 ? 36 : 48;
      const step = Math.round(clamp(h * 0.85, 560, 820));
      // Space along the arc between two experiences, as an angle.
      const stepDeg = (clamp(h * 0.17, 96, 160) / r) * (180 / Math.PI);
      stage.style.setProperty("--content-left", `${contentLeft}px`);
      stage.style.setProperty("--content-right", `${contentRight}px`);

      // Measure in the pinned layout. The focused card sits on the pointer
      // with at least one neighbour above and below; pin only if that fits
      // between the header and the bottom edge, otherwise fall back to the
      // plain list so nothing is ever cropped.
      section.dataset.mode = "pin";
      const half =
        Math.max(...detailRefs.current.map((el) => el?.offsetHeight ?? 0)) / 2;
      const reach = half + gap + COMPACT_HALF;
      const top = header.offsetTop + header.offsetHeight + 8;
      const bottom = h - 16 - (mobile ? MOBILE_CONTROLS : 0);
      const minCy = top + reach;
      const maxCy = bottom - reach;
      const cy = Math.round(clamp((top + bottom) / 2, minCy, maxCy));
      const above = clamp(Math.floor((cy - reach - top) / ROW) + 1, 1, 3);
      const below = clamp(Math.floor((bottom - (cy + reach)) / ROW) + 1, 1, 3);
      stage.style.setProperty("--cy", `${cy}px`);

      const next: Geo = {
        w,
        h,
        r,
        cx: pointerX - r,
        cy,
        pointerX,
        contentLeft,
        stepDeg,
        step,
        half,
        gap,
        above,
        below,
        mobile,
      };
      geoRef.current = next;
      currentMode = minCy <= maxCy && w >= 340 ? "pin" : "static";
      section.dataset.mode = currentMode;
      setMode(currentMode);
      setGeo(next);
      update();
    };

    // Phones resize the viewport when the address bar shows or hides; that
    // must not re-lay the section mid-scroll. Re-measure only for real
    // changes: a new width or a large height change.
    const onResize = () => {
      const w = document.documentElement.clientWidth;
      if (w === measuredW && Math.abs(window.innerHeight - measuredH) < 150)
        return;
      measure();
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    updateRef.current = update;
    measure();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [last]);

  const goTo = useCallback(
    (index: number) => {
      const section = sectionRef.current;
      const g = geoRef.current;
      if (!section || !g || mode !== "pin") return;
      const i = clamp(index, 0, last);
      const top = section.getBoundingClientRect().top + window.scrollY;
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      // The middle of that experience's hold, so it lands still and in focus.
      window.scrollTo({
        top: top + LEAD * g.step + i * g.step,
        behavior: reduce ? "auto" : "smooth",
      });
    },
    [last, mode],
  );

  const toggleSound = () => {
    const next = !sound;
    soundRef.current = next;
    memorySound = next;
    try {
      localStorage.setItem(SOUND_KEY, next ? "on" : "off");
    } catch {
      // Storage blocked: the preference can't be saved.
    }
    window.dispatchEvent(new Event(SOUND_EVENT));
    if (next) unlockAudio();
  };

  // Tick marks for the part of the dial that can come into view.
  const ticks = (() => {
    if (!geo) return [];
    const minorDeg = geo.stepDeg / TICKS_PER_STEP;
    const margin = (Math.asin(Math.min(1, geo.h / geo.r)) * 180) / Math.PI;
    const from = Math.floor(-margin / minorDeg);
    const to = Math.ceil((last * geo.stepDeg + margin) / minorDeg);
    return Array.from({ length: to - from + 1 }, (_, n) => {
      const k = from + n;
      const deg = k * minorDeg;
      const entryIndex = k / TICKS_PER_STEP;
      const major =
        Number.isInteger(entryIndex) && entryIndex >= 0 && entryIndex <= last;
      const mid = k % (TICKS_PER_STEP / 2) === 0;
      const len = major ? 26 : mid ? 15 : 9;
      const c = Math.cos(rad(deg));
      const s = Math.sin(rad(deg));
      return {
        key: k,
        x1: geo.cx + c * geo.r,
        y1: geo.cy + s * geo.r,
        x2: geo.cx + c * (geo.r - len),
        y2: geo.cy + s * (geo.r - len),
        kind: major ? "major" : mid ? "mid" : "minor",
      };
    });
  })();

  const entry = TIMELINE[active];
  const totalScroll = geo ? Math.round(geo.step * (last + 2 * LEAD)) : 0;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="experience-title"
      data-mode={mode}
      className="dial relative mt-28 sm:mt-36"
      style={pinned ? { height: `calc(100dvh + ${totalScroll}px)` } : undefined}
    >
      {/* Link target: lands the pinned view exactly at its top, clear of the
          page's scroll padding for the floating nav. */}
      <span id="experience" aria-hidden className="dial-anchor" />

      <div ref={stageRef} className="dial-stage">
        <div ref={headerRef} className="dial-header">
          <h2
            id="experience-title"
            className="text-[clamp(2rem,4vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.025em]"
          >
            Experience
          </h2>
          <p className="mt-2 text-muted-foreground">
            From my first internship to Meridian
            {pinned ? ". Scroll to move through time." : "."}
          </p>
        </div>

        {pinned && (
          <div className="dial-controls">
            <span
              className="mr-2 font-mono text-[13px] tabular-nums text-muted-foreground"
              aria-hidden
            >
              <span className="text-foreground">{pad(active + 1)}</span> /{" "}
              {pad(TIMELINE.length)}
            </span>
            <button
              type="button"
              onClick={toggleSound}
              aria-pressed={sound}
              aria-label={sound ? "Mute clock ticks" : "Play clock ticks"}
              title={sound ? "Ticking sound on" : "Ticking sound off"}
              className="dial-btn"
            >
              {sound ? (
                <Volume2 size={16} strokeWidth={1.75} />
              ) : (
                <VolumeX size={16} strokeWidth={1.75} />
              )}
            </button>
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              disabled={active === 0}
              aria-label="Previous experience"
              className="dial-btn"
            >
              <ArrowUp size={16} strokeWidth={1.75} />
            </button>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              disabled={active === last}
              aria-label="Next experience"
              className="dial-btn dial-btn-solid"
            >
              <ArrowDown size={16} strokeWidth={1.75} />
            </button>
          </div>
        )}

        {/* The clock: a long, faint arc with fine tick lines */}
        {pinned && geo && (
          <svg
            aria-hidden
            className="dial-svg"
            width={geo.w}
            height={geo.h}
            viewBox={`0 0 ${geo.w} ${geo.h}`}
          >
            <circle cx={geo.cx} cy={geo.cy} r={geo.r} className="dial-arc" />
            <g ref={dialRef}>
              {ticks.map((t) => (
                <line
                  key={t.key}
                  x1={t.x1}
                  y1={t.y1}
                  x2={t.x2}
                  y2={t.y2}
                  className={`dial-tick dial-tick-${t.kind}`}
                />
              ))}
              <path ref={progressRef} className="dial-progress" />
            </g>
            {!geo.mobile && (
              <line
                x1={geo.pointerX + 14}
                y1={geo.cy}
                x2={geo.contentLeft - 18}
                y2={geo.cy}
                className="dial-hand"
              />
            )}
            <circle
              cx={geo.pointerX}
              cy={geo.cy}
              r={9}
              className="dial-pointer-halo"
            />
            <circle
              cx={geo.pointerX}
              cy={geo.cy}
              r={4}
              className="dial-pointer"
            />
          </svg>
        )}

        {pinned &&
          TIMELINE.map((item, i) => (
            <span
              key={item.date}
              ref={(el) => {
                numRefs.current[i] = el;
              }}
              aria-hidden
              className="dial-arcnum"
            >
              {pad(i + 1)}
            </span>
          ))}

        <p className="sr-only" aria-live="polite">
          {pinned ? `${entry.date}, ${entry.title}, ${entry.org}` : ""}
        </p>

        <ol className="dial-list">
          {TIMELINE.map((item, i) => {
            const role = i - active;
            return (
              <li
                key={item.date}
                className="dial-item"
                aria-current={pinned && role === 0 ? "step" : undefined}
              >
                <div
                  ref={(el) => {
                    detailRefs.current[i] = el;
                  }}
                  className="dial-detail"
                >
                  <div className="dial-grid">
                    <span className="dial-bignum" aria-hidden>
                      {pad(i + 1)}
                    </span>
                    <div className="min-w-0">
                      <p className="font-mono text-[13px] text-muted-foreground">
                        <span className="dial-smallnum">{pad(i + 1)}</span>
                        {item.date}
                      </p>
                      <h3 className="mt-1.5 text-[clamp(1.5rem,2.4vw,2.1rem)] font-medium leading-tight tracking-[-0.02em]">
                        {item.title}
                      </h3>
                      <p className="mt-1 font-mono text-[13px] text-accent">
                        {item.org}
                      </p>
                      <p className="mt-3 leading-relaxed text-muted-foreground text-pretty">
                        {item.body}
                      </p>
                      <ul className="dial-highlights">
                        {item.highlights.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                      <ul className="dial-chips" aria-label="Details">
                        {item.meta.map((chip) => (
                          <li key={chip}>{chip}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="dial-visual">
                      <Visual
                        visual={item.visual}
                        tabbable={!pinned || role === 0}
                      />
                    </div>
                  </div>
                </div>

                {pinned && (
                  <button
                    type="button"
                    ref={(el) => {
                      compactRefs.current[i] = el;
                    }}
                    className="dial-compact"
                    tabIndex={Math.abs(role) === 1 ? 0 : -1}
                    aria-hidden={Math.abs(role) === 1 ? undefined : true}
                    aria-label={`Go to ${item.date}, ${item.title}`}
                    onClick={() => goTo(i)}
                  >
                    <span className="font-mono text-muted-foreground">
                      {pad(i + 1)}
                    </span>
                    <span className="font-mono text-muted-foreground">
                      {item.date}
                    </span>
                    <span className="font-medium">{item.title}</span>
                  </button>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
