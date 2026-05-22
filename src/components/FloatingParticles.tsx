import { motion } from "framer-motion";
import { useMemo } from "react";

const symbols = ["✦", "✧", "⋆", "✩", "❋", "✺"];

export function FloatingParticles({ count = 14 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        symbol: symbols[i % symbols.length],
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 12 + Math.random() * 24,
        duration: 8 + Math.random() * 12,
        delay: Math.random() * 6,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute text-cosmic-pink"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            fontSize: p.size,
            filter: "drop-shadow(0 0 8px oklch(0.82 0.16 340 / 0.8))",
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.2, 1, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {p.symbol}
        </motion.span>
      ))}
    </div>
  );
}
