import { motion } from "framer-motion";
import { useState } from "react";
import { ZODIAC_SIGNS } from "@/lib/zodiac";
import { usePurrSound } from "@/hooks/usePurrSound";

export function ZodiacWheel() {
  const [hovered, setHovered] = useState<number | null>(null);
  const active = hovered ?? 0;
  const sign = ZODIAC_SIGNS[active];
  const { play, stop } = usePurrSound();

  return (
    <section id="zodiac" className="relative py-32 px-4">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-5xl md:text-6xl font-bold mb-4 text-aurora">
          The Feline Zodiac
        </h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Twelve signs. Twelve personalities. All equally convinced they own you.
        </p>
      </div>

      <div className="relative max-w-2xl mx-auto aspect-square">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        >
          {ZODIAC_SIGNS.map((s, i) => {
            const angle = (i / 12) * 360 - 90;
            const rad = (angle * Math.PI) / 180;
            const r = 42;
            const x = 50 + r * Math.cos(rad);
            const y = 50 + r * Math.sin(rad);
            return (
              <motion.button
                key={s.name}
                onHoverStart={() => {
                  setHovered(i);
                  play();
                }}
                onHoverEnd={() => {
                  setHovered(null);
                  stop();
                }}
                onFocus={() => {
                  setHovered(i);
                  play();
                }}
                onBlur={() => {
                  setHovered(null);
                  stop();
                }}
                whileHover={{ scale: 1.3 }}
                className="absolute -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full glass-strong flex items-center justify-center text-2xl cursor-pointer"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  boxShadow: hovered === i ? `0 0 30px ${s.color}` : undefined,
                }}
              >
                <motion.span
                  animate={{ rotate: -360 }}
                  transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                >
                  {s.symbol}
                </motion.span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Center orb */}
        <div className="absolute inset-[28%] rounded-full glass-strong flex flex-col items-center justify-center text-center p-6 shadow-glow">
          <motion.div
            key={sign.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-5xl mb-2">{sign.symbol}</div>
            <div className="font-display text-xl font-semibold">{sign.name}</div>
            <div className="text-xs text-muted-foreground mt-1">{sign.dates}</div>
            <div className="text-sm text-cosmic-turquoise mt-3 italic">"{sign.trait}"</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
