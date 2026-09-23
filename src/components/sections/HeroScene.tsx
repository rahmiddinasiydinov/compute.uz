"use client";

import { useRef } from "react";
import Image from "next/image";
import { Cloud, Code2, Globe, Terminal } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

// Floating tiles: position + parallax depth (higher = moves more with the cursor)
const tiles = [
  { Icon: Terminal, className: "left-[6%] top-[12%] rotate-[-8deg]", depth: 1.4 },
  { Icon: Code2, className: "left-[2%] top-[54%] rotate-[6deg]", depth: 1.1 },
  { Icon: Cloud, className: "right-[4%] top-[8%] rotate-[8deg]", depth: 1.25 },
  { Icon: Globe, className: "right-[6%] top-[56%] rotate-[-6deg]", depth: 1.55 },
];

export function HeroScene() {
  const scene = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scene.current;
      if (!root) return;

      const logo = root.querySelector<HTMLElement>("[data-logo]")!;
      const glow = root.querySelector<HTMLElement>("[data-glow]")!;
      const platform = root.querySelector<HTMLElement>("[data-platform]")!;
      const beam = root.querySelector<HTMLElement>("[data-beam]")!;
      const outers = gsap.utils.toArray<HTMLElement>("[data-tile]");
      const inners = gsap.utils.toArray<HTMLElement>("[data-tile-inner]");

      if (prefersReducedMotion()) {
        gsap.set([logo, glow, platform, beam, ...inners], { autoAlpha: 1 });
        return;
      }

      // 1. Intro: platform lights up, logo rises, tiles pop in around it
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.fromTo(
        platform,
        { autoAlpha: 0, scaleX: 0.4 },
        { autoAlpha: 1, scaleX: 1, duration: 1.2 },
      )
        .fromTo(
          beam,
          { autoAlpha: 0, scaleY: 0, transformOrigin: "50% 100%" },
          { autoAlpha: 1, scaleY: 1, duration: 1 },
          "-=0.9",
        )
        .fromTo(
          logo,
          { autoAlpha: 0, y: 70, scale: 0.8, rotateY: -25 },
          { autoAlpha: 1, y: 0, scale: 1, rotateY: 0, duration: 1.4 },
          "-=0.8",
        )
        .fromTo(
          glow,
          { autoAlpha: 0, scale: 0.6 },
          { autoAlpha: 1, scale: 1, duration: 1.2 },
          "<",
        )
        .fromTo(
          inners,
          { autoAlpha: 0, y: 40, scale: 0.85 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 1, stagger: 0.12 },
          "-=1",
        );

      // 2. Idle: everything gently floats, glow breathes
      inners.forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -14 : 12,
          duration: 2.6 + i * 0.35,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 1.4,
        });
      });
      gsap.to(logo, {
        y: -12,
        duration: 3.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.4,
      });
      gsap.to(glow, {
        scale: 1.15,
        opacity: 0.75,
        duration: 2.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.4,
      });

      // 3. Scroll: scene drifts up slower than the page (depth)
      gsap.to(root, {
        y: -60,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top 20%", end: "bottom top", scrub: 0.8 },
      });

      // 4. Cursor parallax: tiles shift by depth, logo tilts slightly
      if (!window.matchMedia("(hover: none)").matches) {
        const setters = outers.map((el) => ({
          x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3" }),
          y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3" }),
        }));
        const rotX = gsap.quickTo(logo, "rotateX", { duration: 1, ease: "power3" });
        const rotY = gsap.quickTo(logo, "rotateY", { duration: 1, ease: "power3" });

        const onMove = (e: MouseEvent) => {
          const r = root.getBoundingClientRect();
          const nx = (e.clientX - (r.left + r.width / 2)) / r.width; // -0.5..0.5
          const ny = (e.clientY - (r.top + r.height / 2)) / r.height;
          setters.forEach((s, i) => {
            s.x(nx * 36 * tiles[i].depth);
            s.y(ny * 28 * tiles[i].depth);
          });
          rotY(nx * 14);
          rotX(-ny * 10);
        };
        const onLeave = () => {
          setters.forEach((s) => {
            s.x(0);
            s.y(0);
          });
          rotX(0);
          rotY(0);
        };
        window.addEventListener("mousemove", onMove);
        root.addEventListener("mouseleave", onLeave);
        return () => {
          window.removeEventListener("mousemove", onMove);
          root.removeEventListener("mouseleave", onLeave);
        };
      }
    },
    { scope: scene },
  );

  return (
    <div
      ref={scene}
      className="relative mx-auto aspect-square w-full max-w-[520px] [perspective:1200px]"
      aria-hidden="true"
    >
      {/* Ambient glow */}
      <div
        data-glow
        className="gsap-hidden absolute left-1/2 top-1/2 size-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(46,224,255,0.35)_0%,rgba(27,92,255,0.18)_40%,transparent_70%)] blur-2xl"
      />

      {/* Light beam from platform to logo */}
      <div
        data-beam
        className="gsap-hidden absolute bottom-[14%] left-1/2 h-[46%] w-[28%] -translate-x-1/2 bg-[linear-gradient(to_top,rgba(46,224,255,0.28),transparent)] blur-md"
      />

      {/* Platform */}
      <div
        data-platform
        className="gsap-hidden absolute bottom-[10%] left-1/2 h-[9%] w-[62%] -translate-x-1/2"
      >
        <div className="absolute inset-0 rounded-[50%] bg-[linear-gradient(180deg,#0f2a62_0%,#071536_100%)] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)]" />
        <div className="absolute inset-x-[10%] top-[10%] h-[45%] rounded-[50%] bg-[radial-gradient(ellipse,rgba(46,224,255,0.55),transparent_70%)] blur-sm" />
        <div className="absolute inset-x-[30%] top-[25%] h-[20%] rounded-[50%] bg-cyan/80 blur-[6px]" />
      </div>

      {/* Logo */}
      <div
        data-logo
        className="gsap-hidden absolute left-1/2 top-[44%] w-[46%] -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d]"
      >
        <div className="absolute inset-[22%] rounded-full bg-cyan/70 blur-2xl" />
        <Image
          src="/logo.png"
          alt=""
          width={364}
          height={382}
          priority
          className="relative w-full drop-shadow-[0_30px_50px_rgba(10,47,184,0.6)]"
        />
      </div>

      {/* Floating tiles */}
      {tiles.map(({ Icon, className }, i) => (
        <div key={i} data-tile className={`absolute ${className}`}>
          <div
            data-tile-inner
            className="gsap-hidden glass flex size-[76px] items-center justify-center rounded-2xl text-cyan shadow-[0_20px_40px_-20px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.08)] sm:size-[88px]"
          >
            <Icon className="size-8 sm:size-9" strokeWidth={1.6} />
          </div>
        </div>
      ))}
    </div>
  );
}
