import { motion } from "framer-motion";
import { ZODIAC_SIGNS } from "@/lib/zodiac";

const horoscopes = [
  "A sunbeam shall migrate across the floor. Follow it. Trust it.",
  "Beware the vacuum. Or befriend it. Today's vibes are ambiguous.",
  "An unattended snack appears. The universe is testing your stealth.",
  "A box arrives today. It is yours. It has always been yours.",
  "Mercury says: knock one item off the table. Just one. You'll know.",
  "A guest will arrive. Judge them silently from atop the bookshelf.",
  "Love is in the air. Also a moth. Prioritize the moth.",
  "Your zoomies peak at 11:42pm. Hydrate. Stretch. Detonate.",
  "Tail dignity is non-negotiable today. Defend it.",
  "An ancient prophecy: the red dot returns. Be ready.",
  "Drink from the forbidden cup. The water tastes of destiny.",
  "Loaf for 4 hours. Emerge transformed. Demand dinner.",
];

export function DailyHoroscope() {
  return (
    <section className="relative py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-aurora">
            Today's Whiskers
          </h2>
          <p className="text-lg text-muted-foreground">
            Daily cosmic guidance, served fresh with a side of churu.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {ZODIAC_SIGNS.map((sign, i) => (
            <motion.div
              key={sign.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 4) * 0.08, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass rounded-3xl p-5 shadow-card-cosmic hover:shadow-glow transition-shadow"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-3"
                style={{
                  background: `radial-gradient(circle, ${sign.color}, transparent 80%)`,
                  boxShadow: `0 0 20px ${sign.color}`,
                }}
              >
                {sign.symbol}
              </div>
              <div className="font-display font-semibold text-lg">{sign.name}</div>
              <div className="text-xs text-muted-foreground mb-3">{sign.dates}</div>
              <p className="text-sm text-foreground/85 leading-relaxed">
                {horoscopes[i]}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
