import { motion } from "framer-motion";
import { useState } from "react";
import { Heart, Cat, User } from "lucide-react";
import { ZODIAC_SIGNS } from "@/lib/zodiac";

type Mode = "cat-owner" | "cat-cat";

export function Compatibility() {
  const [mode, setMode] = useState<Mode>("cat-owner");
  const [a, setA] = useState(ZODIAC_SIGNS[0].name);
  const [b, setB] = useState(ZODIAC_SIGNS[4].name);
  const [score, setScore] = useState<number | null>(null);

  const calc = () => {
    const ia = ZODIAC_SIGNS.findIndex((s) => s.name === a);
    const ib = ZODIAC_SIGNS.findIndex((s) => s.name === b);
    const diff = Math.abs(ia - ib);
    const base = 60 + ((ia * 7 + ib * 13) % 35);
    const bonus = ZODIAC_SIGNS[ia].element === ZODIAC_SIGNS[ib].element ? 10 : 0;
    setScore(Math.min(99, base + bonus - (diff % 5)));
  };

  return (
    <section className="relative py-32 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-aurora">
            Cosmic Compatibility
          </h2>
          <p className="text-lg text-muted-foreground">
            Are you and your fluff destined? Let the stars do the math.
          </p>
        </div>

        <div className="glass-strong rounded-3xl p-8 shadow-card-cosmic">
          <div className="flex gap-2 p-1 rounded-full glass mb-8 w-fit mx-auto">
            {(["cat-owner", "cat-cat"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setScore(null); }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  mode === m
                    ? "bg-gradient-button text-primary-foreground shadow-glow"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {m === "cat-owner" ? "Cat + Human" : "Cat + Cat"}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
            <Picker icon={<Cat className="w-5 h-5" />} label="Your cat" value={a} onChange={setA} />
            <Heart className="w-8 h-8 text-cosmic-pink mx-auto animate-pulse" />
            <Picker
              icon={mode === "cat-owner" ? <User className="w-5 h-5" /> : <Cat className="w-5 h-5" />}
              label={mode === "cat-owner" ? "You" : "Their cat"}
              value={b}
              onChange={setB}
            />
          </div>

          <button
            onClick={calc}
            className="mt-8 mx-auto block px-8 py-3 rounded-full bg-gradient-button text-primary-foreground font-semibold shadow-glow hover:scale-105 transition-transform"
          >
            Consult the Stars
          </button>

          {score !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-10 text-center"
            >
              <div className="text-6xl font-display font-bold text-aurora mb-3">
                {score}%
              </div>
              <div className="h-3 max-w-md mx-auto rounded-full glass overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${score}%` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="h-full bg-gradient-button shadow-glow"
                />
              </div>
              <p className="text-muted-foreground mt-4">
                {score > 85
                  ? "Soulmates across the cosmos. ✨"
                  : score > 70
                  ? "Strong cosmic chemistry brewing."
                  : score > 55
                  ? "Promising vibes — needs more snacks."
                  : "Opposites attract. Mostly."}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

function Picker({
  icon, label, value, onChange,
}: { icon: React.ReactNode; label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="glass rounded-2xl p-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
        {icon} {label}
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-lg font-display font-semibold focus:outline-none cursor-pointer"
      >
        {ZODIAC_SIGNS.map((s) => (
          <option key={s.name} value={s.name} className="bg-cosmic-midnight">
            {s.symbol} {s.name}
          </option>
        ))}
      </select>
    </div>
  );
}
