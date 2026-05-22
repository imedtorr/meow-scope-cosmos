import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const cards = [
  { name: "Luna", archetype: "The Velvet Oracle",   rarity: "Mythic",    aura: "Aurora Violet",  symbol: "♓", color: "oklch(0.65 0.22 300)" },
  { name: "Miso", archetype: "The Midnight Mischief", rarity: "Legendary", aura: "Lunar Mint",     symbol: "♏", color: "oklch(0.82 0.14 200)" },
  { name: "Pippin", archetype: "The Sunbeam Sage",  rarity: "Epic",      aura: "Stardust Rose",  symbol: "♌", color: "oklch(0.82 0.16 340)" },
  { name: "Mochi", archetype: "The Cosmic Loaf",    rarity: "Rare",      aura: "Nebula Gold",    symbol: "♉", color: "oklch(0.82 0.18 65)"  },
];

const rarityGlow: Record<string, string> = {
  Mythic: "0 0 50px oklch(0.78 0.22 320 / 0.9)",
  Legendary: "0 0 40px oklch(0.82 0.18 65 / 0.8)",
  Epic: "0 0 30px oklch(0.65 0.22 300 / 0.7)",
  Rare: "0 0 25px oklch(0.82 0.14 200 / 0.6)",
};

export function CosmicCards() {
  return (
    <section className="relative py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-aurora">
            Cosmic Cat Cards
          </h2>
          <p className="text-lg text-muted-foreground">
            Collect rare feline archetypes. Trade auras. Become the cat oracle.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10, rotate: i % 2 === 0 ? 2 : -2 }}
              className="sparkle-border rounded-3xl"
              style={{ boxShadow: rarityGlow[c.rarity] }}
            >
              <div className="glass-strong rounded-3xl p-6 h-full flex flex-col items-center text-center">
                <div className="text-xs font-mono tracking-widest text-cosmic-turquoise uppercase">
                  {c.rarity}
                </div>
                <div
                  className="w-24 h-24 rounded-full mt-4 flex items-center justify-center text-5xl"
                  style={{
                    background: `radial-gradient(circle, ${c.color}, transparent 80%)`,
                  }}
                >
                  {c.symbol}
                </div>
                <h3 className="font-display text-2xl font-bold mt-4">{c.name}</h3>
                <p className="text-sm text-muted-foreground italic mb-3">{c.archetype}</p>
                <div className="mt-auto inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full glass">
                  <Sparkles className="w-3 h-3 text-cosmic-pink" />
                  {c.aura}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
