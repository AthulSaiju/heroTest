"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextType from "./TextType";
import {
  Box,
  Tag,
  Users,
  Download,
  Heart,
  Star,
  Headphones,
  Database,
  Grid,
  Upload,
  Search,
  ShoppingCart,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const BUBBLES = [
  { id: "b1", Icon: Box, x: -630, y: -360, color: "#7c3aed", start: "top top", end: "+=1000", tooltipSide: "bottom" },
  { id: "b2", Icon: Tag, x: -450, y: -230, color: "#fb923c", start: "top+=200 top", end: "+=600", tooltipSide: "bottom" },
  { id: "b3", Icon: ShoppingCart, x: 580, y: -332, color: "#10b981", start: "top+=500 top", end: "+=800", tooltipSide: "bottom" },
  { id: "b4", Icon: Users, x: -670, y: -123, color: "#a78bfa", start: "top+=300 top", end: "+=800", tooltipSide: "bottom" },
  { id: "b5", Icon: Search, x: 427, y: -130, color: "#3b82f6", start: "top+=400 top", end: "+=800", tooltipSide: "bottom" },
  { id: "b6", Icon: Upload, x: 622, y: 30, color: "#2dd4bf", start: "top+=500 top", end: "+=600", tooltipSide: "top" },
  { id: "b7", Icon: Download, x: -460, y: 0, color: "#06b6d4", start: "top+=600 top", end: "+=400", tooltipSide: "bottom" },
  { id: "b8", Icon: Grid, x: 370, y: 160, color: "#fbbf24", start: "top+=700 top", end: "+=500", tooltipSide: "right" },
  { id: "b9", Icon: Star, x: -340, y: 200, color: "#fbbf24", start: "top+=750 top", end: "+=400", tooltipSide: "right" },
  { id: "b10", Icon: Database, x: 105, y: 305, color: "#ec4899", start: "top+=800 top", end: "+=500", tooltipSide: "left" },
  { id: "b11", Icon: Heart, x: -630, y: 147, color: "#fb7185", start: "top+=850 top", end: "+=400", tooltipSide: "right" },
  { id: "b12", Icon: Headphones, x: -100, y: 198, color: "#9ca3af", start: "top+=800 top", end: "+=400", tooltipSide: "right" },
];

const Demo = () => {
  const bubbleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const paraRef = useRef<HTMLParagraphElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    bubbleRefs.current = bubbleRefs.current.slice(0, BUBBLES.length);

    bubbleRefs.current.forEach((el, i) => {
      if (!el) return;
      const b = BUBBLES[i];
      gsap.to(el, {
        x: 0,
        y: 0,
        scale: 0,
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".scroll-container",
          start: b.start,
          end: b.end,
          scrub: true,
        },
      });
    });

    const textTargets = [titleRef.current, paraRef.current, btnRef.current].filter(Boolean) as Element[];

    let tl: gsap.core.Timeline | null = null;

    if (textTargets.length) {
      // master timeline spans the whole scroll area
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".scroll-container",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

     
      const placement = 1;

      tl.to(
        textTargets,
        {
          y: -114,
          opacity: 0,
          ease: "sine.out",
          stagger: 0.18,
        },
        placement
      );
    }

   
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf(bubbleRefs.current);
      gsap.killTweensOf([titleRef.current, paraRef.current, btnRef.current]);
      if (tl && tl.scrollTrigger) {
        try {
          tl.scrollTrigger.kill();
        } catch (e) {}
      }
    };
  }, []);

  const getTooltipPosition = (side: string) => {
    switch (side) {
      case "left":
        return "right-full mr-2 top-1/2 -translate-y-1/2";
      case "right":
        return "left-full ml-2 top-1/2 -translate-y-1/2";
      case "top":
        return "bottom-full mb-2 left-1/2 -translate-x-1/2";
      case "bottom":
        return "top-full mt-2 left-1/2 -translate-x-1/2";
      default:
        return "right-full mr-2 top-1/2 -translate-y-1/2";
    }
  };

  return (
    <div className="scroll-container h-[190vh]">
      <div className="sticky top-[9vh] bg-neutral-950 h-[92vh] flex items-center justify-center z-10">
        <div className="absolute inset-0 z-10">
          <div className="relative h-full w-full">
            {BUBBLES.map((b, i) => (
              <div
                key={b.id}
                ref={(el) => {
                  bubbleRefs.current[i] = el;
                }}
                className="absolute top-1/2 left-1/2 will-change-transform group pointer-events-auto"
                style={{
                  transform: `translate(${b.x}px, ${b.y}px)`,
                  zIndex: 50 - i,
                }}
              >
                {/* Bubble */}
                <div
                  className="group relative flex h-18 w-18 items-center justify-center rounded-full
                    backdrop-blur-lg
                    bg-white/70 dark:bg-white/10
                    border border-white/40 dark:border-white/10
                    shadow-[0px_2px_10px_rgba(0,0,0,0.1)]
                    bg-gradient-to-r from-white/70 to-emerald-50 dark:from-white/10 dark:to-transparent
                    hover:scale-105 hover:cursor-grab hover:bg-white transition-all duration-500 ease-in-out"
                >
                  <b.Icon size={24} strokeWidth={1.6} style={{ color: b.color }} />
                </div>

                {/* Tooltip */}
                <div
                  className={`absolute opacity-0 scale-95 
                    group-hover:opacity-100 group-hover:scale-100
                    transition-all duration-500 ease-in-out 
                    pointer-events-none
                    h-[120px] w-[250px] border border-[#4a4a4a] border-dotted 
                    px-3 py-1 rounded-md z-25 bg-[#171717] text-white text-xs 
                    ${getTooltipPosition(b.tooltipSide)}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Text + Button Section */}
        <div className="absolute w-full lg:top-[25%] flex flex-col items-center justify-center gap-10 pointer-events-none">
          <div
            ref={titleRef}
            className="w-[50%] h-[140px] lg:text-[48px] text-center text-[#E6E6E6] font-bold"
          >
            <TextType
              text={[
                "Discover, Buy and Sell \n Digital Products",
                "Sell For Free, \n Pay Only You Earn",
                "Instant Payouts, \n Full Control, No Limits",
                "Buy Once, Download \n Anytime, Keep Forever",
              ]}
              typingSpeed={80}
              pauseDuration={4500}
              deletingSpeed={70}
              showCursor={true}
              cursorBlinkDuration={0.4}
              cursorCharacter="|"
            />
          </div>

          <p ref={paraRef} className="lg:text-[18px] text-center text-[#A3A3A3] mt-15px tracking-wide">
            Your one-stop digital platform for 3D models and digital creations.
            <br />
            Join our community of creators and collectors today.
          </p>

          <button
            ref={btnRef}
            className="relative overflow-hidden lg:px-14 lg:py-3 border border-[#404040] rounded-full mt-8 hover:bg-[#262626] transition-colors duration-300 ease-in-out pointer-events-auto"
          >
            <span className="relative z-10">Explore All Products</span>
            <span className="absolute top-0 left-[-150%] w-[120%] h-full bg-gradient-to-r from-transparent via-white/55 to-transparent skew-x-[-20deg] animate-[shine_3.5s_linear_infinite]" />
          </button>
        </div>
      </div>

      <div className="h-[100vh]" />
    </div>
  );
};

export default Demo;
