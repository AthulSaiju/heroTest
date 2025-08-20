"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
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
  Share2,
  Search,
  ShoppingCart,
} from "lucide-react";

/**
 * Drop-in: Radial glows + Icon bubbles ring to match the screenshot look
 * Place somewhere inside your Hero markup (under headline/subhead).
 */

// small helper: icon list + positions around the hero (percentages)
const BUBBLES: {
  id: string;
  Icon: React.ComponentType<any>;
  pos: { left?: string; right?: string; top?: string; bottom?: string };
  color?: string;
}[] = [
  { id: "i1", Icon: Box, pos: { left: "8%", top: "6%" }, color: "#7c3aed" },
  { id: "i2", Icon: Tag, pos: { left: "24%", top: "26%" }, color: "#f97316" },
  { id: "i3", Icon: Users, pos: { left: "12%", top: "44%" }, color: "#8b5cf6" },
  { id: "i4", Icon: Download, pos: { left: "26%", bottom: "22%" }, color: "#06b6d4" },
  { id: "i5", Icon: Heart, pos: { left: "10%", bottom: "10%" }, color: "#fb7185" },
  { id: "i6", Icon: Star, pos: { left: "40%", bottom: "6%" }, color: "#fbbf24" },
  { id: "i7", Icon: Headphones, pos: { left: "54%", bottom: "6%" }, color: "#94a3b8" },
  { id: "i8", Icon: Database, pos: { right: "36%", bottom: "6%" }, color: "#ec4899" },
  { id: "i9", Icon: Grid, pos: { right: "18%", bottom: "18%" }, color: "#fb923c" },
  { id: "i10", Icon: Share2, pos: { right: "10%", bottom: "32%" }, color: "#2dd4bf" },
  { id: "i11", Icon: Search, pos: { right: "16%", top: "32%" }, color: "#3b82f6" },
  { id: "i12", Icon: ShoppingCart, pos: { right: "8%", top: "6%" }, color: "#10b981" },
];

function RadialGlows() {
  // two overlapping radial lights: red left, teal center / bottom
  return (
    <div aria-hidden className="absolute top-[20vh] inset-0 -z-10 pointer-events-none">
      <div
        style={{
          // large red soft spot left
          background:
            "radial-gradient(40rem 40rem at 12% 30%, rgba(191, 54, 54, 0.16), rgba(0,0,0,0) 35%)",
        }}
        className="absolute -left-36 top-0 w-[60rem] h-[60rem] rounded-full blur-3xl"
      />
      <div
        style={{
          // teal soft center/bottom
          background:
            "radial-gradient(36rem 36rem at 50% 56%, rgba(6, 182, 193, 0.12), rgba(0,0,0,0) 40%)",
        }}
        className="absolute left-1/2 top-1/3 w-[48rem] h-[48rem] -translate-x-1/2 rounded-full blur-3xl"
      />
      {/* subtle global vignette to deepen edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-40 mix-blend-multiply" />
    </div>
  );
}

function IconBubble({
  Icon,
  color = "#fff",
  style,
  index = 0,
}: {
  Icon: React.ComponentType<any>;
  color?: string;
  style?: React.CSSProperties;
  index?: number;
}) {
  const reduce = useReducedMotion();

  // subtle float variant
  const float = {
    y: ["0px", "-8px", "0px"],
    rotate: [0, 2, 0],
  };

  return (
    <motion.div
     
     
      style={style}
      className="absolute z-0 transform-gpu select-none will-change-transform"
    >
      <div
        className="flex h-14 w-14 items-center justify-center rounded-full"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 6px 30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.02)",
          backdropFilter: "blur(6px)",
        }}
      >
        <Icon size={18} strokeWidth={1.8} style={{ color }} />
      </div>
    </motion.div>
  );
}

export default function BubblesRing() {
  return (
    <>
      <RadialGlows />

      {/* Bubbles layer: position absolute to fill hero area */}
      <div className="absolute inset-0 -z-5 pointer-events-none b">
        <div className="relative h-full w-full">
          {BUBBLES.map((b, i) => {
            // merge positioning from pos into style
            const style: React.CSSProperties = {
              position: "absolute",
              ...Object.entries(b.pos).reduce((acc, [k, v]) => {
                // TS-friendly cast
                (acc as any)[k] = v;
                return acc;
              }, {} as React.CSSProperties),
              // slightly nudge so bubbles don't clip on edges on small screens
              transform: "translate(-50%, -50%)",
            };

            // If the position contains 'right' or 'bottom' we need to adjust translate anchor
            // to keep the circle visually centered at the percentage point.
            if ((b.pos.right && !b.pos.left) || (b.pos.bottom && !b.pos.top)) {
              // use translate(50%, 50%) for right/bottom anchored bubbles
              style.transform = "translate(50%, 50%)";
            }

            return <IconBubble key={b.id} Icon={b.Icon} color={b.color} style={style} index={i} />;
          })}
        </div>
      </div>
    </>
  );
}
