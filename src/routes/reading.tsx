import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Sparkles, Upload, Cat, ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { StarField } from "@/components/StarField";
import { FloatingParticles } from "@/components/FloatingParticles";
import { getZodiacFromDate, generateReading, type ZodiacSign } from "@/lib/zodiac";

export const Route = createFileRoute("/reading")({
  head: () => ({
    meta: [
      { title: "Your Cat's Cosmic Reading — Meowroscope" },
      { name: "description", content: "Enter your cat's birth details and receive their personalized cosmic reading." },
    ],
  }),
  component: ReadingPage,
});

interface Result {
  name: string;
  photo: string | null;
  sign: ZodiacSign;
  reading: ReturnType<typeof generateReading>;
}

function ReadingPage() {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !birthDate) return;
    setLoading(true);
    setTimeout(() => {
      const sign = getZodiacFromDate(birthDate);
      setResult({ name, photo, sign, reading: generateReading(name, sign) });
      setLoading(false);
    }, 1800);
  };

  return (
    <div className="relative min-h-screen pb-20">
      <StarField />
      <FloatingParticles count={10} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 pt-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to the cosmos
        </Link>

        <AnimatePresence mode="wait">
          {loading ? (
            <Loading key="loading" />
          ) : result ? (
            <ResultView key="result" result={result} onReset={() => setResult(null)} />
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-strong rounded-3xl p-8 md:p-12 shadow-card-cosmic"
            >
              <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-aurora mb-3">
                  Tell us about your cat
                </h1>
                <p className="text-muted-foreground">
                  The stars need a few details to align properly.
                </p>
              </div>

              <form onSubmit={submit} className="space-y-6">
                <Field label="Cat's name" required>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Sir Whiskers III"
                    className="cosmic-input"
                    required
                  />
                </Field>

                <div className="grid md:grid-cols-2 gap-6">
                  <Field label="Birth date" required>
                    <input
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="cosmic-input"
                      required
                    />
                  </Field>
                  <Field label="Birth time (optional)">
                    <input
                      type="time"
                      value={birthTime}
                      onChange={(e) => setBirthTime(e.target.value)}
                      className="cosmic-input"
                    />
                  </Field>
                </div>

                <Field label="Cat photo (optional)">
                  <label className="block cursor-pointer">
                    <input type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
                    <div className="glass rounded-2xl border-2 border-dashed border-border p-6 flex items-center gap-4 hover:border-cosmic-pink transition-colors">
                      {photo ? (
                        <img src={photo} alt="" className="w-16 h-16 rounded-xl object-cover" />
                      ) : (
                        <div className="w-16 h-16 rounded-xl glass flex items-center justify-center">
                          <Upload className="w-6 h-6 text-cosmic-turquoise" />
                        </div>
                      )}
                      <div className="text-sm text-muted-foreground">
                        {photo ? "Photo uploaded ✨" : "Click to upload your cosmic familiar"}
                      </div>
                    </div>
                  </label>
                </Field>

                <button
                  type="submit"
                  className="w-full px-8 py-4 rounded-full bg-gradient-button text-primary-foreground font-semibold text-lg shadow-glow hover:scale-[1.02] transition-transform inline-flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" /> Reveal Cosmic Destiny
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .cosmic-input {
          width: 100%;
          padding: 0.875rem 1rem;
          border-radius: 1rem;
          background: oklch(0.97 0.02 300 / 0.06);
          border: 1px solid oklch(0.97 0.02 300 / 0.15);
          color: var(--color-foreground);
          font-size: 1rem;
          transition: all 0.2s;
          color-scheme: dark;
        }
        .cosmic-input:focus {
          outline: none;
          border-color: var(--cosmic-pink);
          box-shadow: 0 0 20px oklch(0.78 0.18 320 / 0.4);
        }
        .cosmic-input::placeholder { color: var(--color-muted-foreground); }
      `}</style>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground/90 mb-2">
        {label} {required && <span className="text-cosmic-pink">*</span>}
      </label>
      {children}
    </div>
  );
}

function Loading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-center py-32"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="text-7xl mb-6 inline-block"
      >
        ✦
      </motion.div>
      <h2 className="text-3xl font-display font-bold text-aurora mb-2">
        Consulting the stars...
      </h2>
      <p className="text-muted-foreground">Aligning whiskers with constellations</p>
    </motion.div>
  );
}

function ResultView({ result, onReset }: { result: Result; onReset: () => void }) {
  const { name, photo, sign, reading } = result;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      {/* Hero card */}
      <div className="glass-strong rounded-3xl p-8 md:p-12 text-center shadow-glow sparkle-border">
        <div className="text-sm uppercase tracking-[0.3em] text-cosmic-turquoise mb-4">
          {sign.dates} · {sign.element}
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-2">
          <span className="text-aurora">{name}</span>
        </h1>
        <div className="text-2xl font-display">
          {sign.symbol} {sign.name} {sign.emoji}
        </div>

        {/* AI Aura portrait */}
        <div className="mt-8 relative w-48 h-48 mx-auto">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-4 rounded-full"
            style={{
              background: "conic-gradient(from 0deg, oklch(0.78 0.18 320), oklch(0.82 0.14 200), oklch(0.82 0.16 340), oklch(0.78 0.18 320))",
              filter: "blur(20px)",
              opacity: 0.7,
            }}
          />
          <div className="relative w-full h-full rounded-full overflow-hidden glass-strong flex items-center justify-center">
            {photo ? (
              <img src={photo} alt={name} className="w-full h-full object-cover" />
            ) : (
              <Cat className="w-20 h-20 text-cosmic-pink" />
            )}
          </div>
        </div>

        <p className="mt-8 text-lg text-foreground/85 max-w-2xl mx-auto leading-relaxed">
          {reading.personality}
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <StatCard label="Chaos Level" value={reading.chaosLevel} color="oklch(0.78 0.18 320)" />
        <StatCard label="Cuddle Compatibility" value={reading.cuddleCompat} color="oklch(0.82 0.14 200)" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <ListCard title="Cosmic Strengths" emoji="✨" items={reading.strengths} />
        <ListCard title="Adorable Weaknesses" emoji="🌙" items={reading.weaknesses} />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <InfoCard title="Lucky Snack" value={reading.luckySnack} emoji="🍣" />
        <InfoCard title="Lucky Color" value={reading.luckyColor} emoji="🎨" />
        <InfoCard title="Aura" value={reading.aura} emoji="🌌" />
      </div>

      <div className="glass-strong rounded-3xl p-8 shadow-card-cosmic">
        <div className="text-sm uppercase tracking-widest text-cosmic-pink mb-3">
          Cosmic Prediction
        </div>
        <p className="text-2xl font-display italic leading-relaxed">
          "{reading.prediction}"
        </p>
      </div>

      {/* Collectible card */}
      <div
        className="sparkle-border rounded-3xl"
        style={{ boxShadow: "0 0 40px oklch(0.78 0.22 320 / 0.7)" }}
      >
        <div className="glass-strong rounded-3xl p-8 text-center">
          <div className="text-xs font-mono tracking-widest text-cosmic-turquoise uppercase">
            {reading.rarity} Card · Unlocked
          </div>
          <h3 className="font-display text-3xl font-bold mt-3 text-aurora">{reading.archetype}</h3>
          <p className="text-muted-foreground mt-2">A new card joins your cosmic collection.</p>
        </div>
      </div>

      <div className="text-center pt-4">
        <button
          onClick={onReset}
          className="px-8 py-3 rounded-full glass hover:shadow-glow-turquoise transition-shadow font-medium"
        >
          Read another cat
        </button>
      </div>
    </motion.div>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="glass-strong rounded-3xl p-6 shadow-card-cosmic">
      <div className="flex items-baseline justify-between mb-3">
        <div className="text-sm uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="font-display text-3xl font-bold" style={{ color }}>
          {value}%
        </div>
      </div>
      <div className="h-2 rounded-full glass overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: color, boxShadow: `0 0 12px ${color}` }}
        />
      </div>
    </div>
  );
}

function ListCard({ title, emoji, items }: { title: string; emoji: string; items: string[] }) {
  return (
    <div className="glass rounded-3xl p-6">
      <h3 className="font-display text-xl font-semibold mb-4">
        {emoji} {title}
      </h3>
      <ul className="space-y-2">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-2 text-foreground/85">
            <span className="text-cosmic-pink mt-1">✦</span>
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function InfoCard({ title, value, emoji }: { title: string; value: string; emoji: string }) {
  return (
    <div className="glass rounded-3xl p-6 text-center">
      <div className="text-3xl mb-2">{emoji}</div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{title}</div>
      <div className="font-display text-lg font-semibold mt-1 capitalize">{value}</div>
    </div>
  );
}
