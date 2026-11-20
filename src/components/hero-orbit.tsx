"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { PROFILE } from "@/lib/site";

/** Real work that orbits the avatar. `w`/`h` are the card's design size. */
const ORBIT = [
  { src: "/work/meridian-hero.webp", w: 200, h: 125 },
  { src: "/work/akaiearn-tasks.webp", w: 84, h: 150 },
  { src: "/work/penumbra.webp", w: 170, h: 133 },
  { src: "/work/akaispace-live.webp", w: 200, h: 125 },
  { src: "/work/splitr.webp", w: 170, h: 133 },
  { src: "/work/akaiearn-upi.webp", w: 84, h: 150 },
  { src: "/work/meridian-agent.webp", w: 200, h: 125 },
  { src: "/work/horizon.webp", w: 170, h: 133 },
];

/**
 * The avatar at the center of a 3D orbit of real project screens. Cards
 * travel on a tilted ellipse, passing in front of and behind the avatar
 * (true depth via preserve-3d), and the pointer steers speed and direction.
 * Reduced motion: the orbit is laid out once and stays still. Offscreen: the
 * loop stops.
 */
export function HeroOrbit() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let angle = 0.35;
    let speed = 0.0032;
    let target = 0.0032;
    let frame = 0;
    let running = false;

    const place = () => {
      const { width, height } = stage.getBoundingClientRect();
      const rx = Math.min(width * 0.44, 560);
      const ry = Math.min(height * 0.13, 70);
      const rz = rx * 0.55;
      const scale = width < 640 ? 0.62 : 1;
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const a = angle + (i / ORBIT.length) * Math.PI * 2;
        const x = Math.sin(a) * rx;
        const z = Math.cos(a) * rz;
        const y = Math.cos(a) * ry;
        const depth = (Math.cos(a) + 1) / 2; // 0 back, 1 front
        card.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) scale(${scale})`;
        card.style.opacity = (0.35 + depth * 0.65).toFixed(2);
      });
    };

    const tick = () => {
      speed += (target - speed) * 0.04;
      angle += speed;
      place();
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || still) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const onMove = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
      target = 0.0032 + x * 0.02;
    };
    const onLeave = () => {
      target = 0.0032;
    };

    place();
    const observer = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    observer.observe(stage);
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", place);
    return () => {
      stop();
      observer.disconnect();
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", place);
    };
  }, []);

  return (
    <div ref={stageRef} className="orbit-stage">
      <div className="orbit-scene">
        <div className="orbit-avatar">
          <div className="relative h-full w-full">
            <Image
              src={PROFILE.avatar}
              alt={`${PROFILE.name}'s avatar from GitHub`}
              fill
              priority
              sizes="(min-width: 640px) 260px, 170px"
              className="rounded-full object-cover"
            />
            <span aria-hidden className="sel" style={{ opacity: 1, inset: "-12px" }}>
              <span className="sel-handle" />
              <span className="sel-handle" />
              <span className="sel-handle" />
              <span className="sel-handle" />
              <span className="sel-tag">@wajiha-kulsum</span>
            </span>
          </div>
        </div>

        {ORBIT.map((item, i) => (
          <div
            key={item.src}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            aria-hidden
            className="orbit-card"
            style={{ width: item.w, height: item.h, marginLeft: -item.w / 2, marginTop: -item.h / 2 }}
          >
            <Image src={item.src} alt="" fill sizes="200px" className="object-cover object-top" />
          </div>
        ))}
      </div>
    </div>
  );
}
