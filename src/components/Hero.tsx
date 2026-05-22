import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Sparkles, Moon, Volume2, VolumeX } from "lucide-react";
import heroImg from "@/assets/cosmic-cat-hero.jpg";
import purrSrc from "@/assets/cat-purring.mp3";
import { FloatingParticles } from "./FloatingParticles";

export function Hero() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPurring, setIsPurring] = useState(false);

  const togglePurr = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(purrSrc);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.75;
    }
    const audio = audioRef.current;
    if (isPurring) {
      audio.pause();
      audio.currentTime = 0;
      setIsPurring(false);
    } else {
      void audio.play().then(() => setIsPurring(true)).catch(() => setIsPurring(false));
    }
  }, [isPurring]);
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      <FloatingParticles count={20} />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <Moon className="w-4 h-4 text-cosmic-turquoise" />
          <span className="text-sm text-muted-foreground tracking-wide">
            Cosmic readings for your fluffy familiar
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="text-6xl md:text-8xl font-bold mb-6 leading-[0.95]"
        >
          <span className="text-aurora">Meowroscope</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto font-light"
        >
          Discover your cat's cosmic destiny — written in the stars,
          delivered with extra purr.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link to="/reading">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="group relative px-8 py-4 rounded-full bg-gradient-button text-primary-foreground font-semibold text-lg shadow-glow animate-pulse-glow inline-flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Reveal My Cat's Destiny
            </motion.button>
          </Link>
          <a href="#zodiac">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-full glass text-foreground font-medium text-lg hover:shadow-glow-turquoise transition-shadow"
            >
              Explore the Wheel
            </motion.button>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="relative mt-16 mx-auto max-w-3xl"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-cosmic-turquoise"
          >
            <Volume2 className="w-4 h-4 shrink-0" />
            <span>Click the cosmic cat to hear purring</span>
          </motion.p>

          <div className="absolute -inset-8 bg-gradient-glow blur-3xl opacity-60" />
          <motion.button
            type="button"
            onClick={togglePurr}
            aria-label={isPurring ? "Stop purring" : "Play cat purring"}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            animate={{ y: [0, -12, 0] }}
            transition={{
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 0.2 },
            }}
            className="relative block w-full cursor-pointer rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cosmic-turquoise focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <motion.img
              src={heroImg}
              alt="A fluffy cosmic cat floating among constellations"
              width={1536}
              height={1536}
              className={`relative w-full rounded-3xl shadow-glow transition-shadow ${
                isPurring ? "shadow-glow-turquoise ring-2 ring-cosmic-turquoise/60" : "hover:shadow-glow-turquoise"
              }`}
            />
            <span
              className={`absolute bottom-4 right-4 flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium backdrop-blur-md transition-colors ${
                isPurring
                  ? "bg-cosmic-turquoise/30 text-cosmic-turquoise"
                  : "bg-background/60 text-muted-foreground"
              }`}
            >
              {isPurring ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  Purring… click to stop
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  Tap for purrs
                </>
              )}
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
