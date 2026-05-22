import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Sparkles, Moon } from "lucide-react";
import heroImg from "@/assets/cosmic-cat-hero.jpg";
import { FloatingParticles } from "./FloatingParticles";

export function Hero() {
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
          <div className="absolute -inset-8 bg-gradient-glow blur-3xl opacity-60" />
          <motion.img
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            src={heroImg}
            alt="A fluffy cosmic cat floating among constellations"
            width={1536}
            height={1536}
            className="relative rounded-3xl shadow-glow"
          />
        </motion.div>
      </div>
    </section>
  );
}
