export interface ZodiacSign {
  name: string;
  symbol: string;
  dates: string;
  element: string;
  emoji: string;
  trait: string;
  color: string;
}

export const ZODIAC_SIGNS: ZodiacSign[] = [
  { name: "Aries",       symbol: "♈", dates: "Mar 21 – Apr 19", element: "Fire",  emoji: "🔥", trait: "Chaotic zoomies champion",     color: "oklch(0.72 0.20 25)"  },
  { name: "Taurus",      symbol: "♉", dates: "Apr 20 – May 20", element: "Earth", emoji: "🌿", trait: "Professional snack receiver",   color: "oklch(0.78 0.16 140)" },
  { name: "Gemini",      symbol: "♊", dates: "May 21 – Jun 20", element: "Air",   emoji: "🌬", trait: "Two moods, both unhinged",     color: "oklch(0.85 0.14 90)"  },
  { name: "Cancer",      symbol: "♋", dates: "Jun 21 – Jul 22", element: "Water", emoji: "🌙", trait: "Lap pancake supreme",          color: "oklch(0.80 0.12 220)" },
  { name: "Leo",         symbol: "♌", dates: "Jul 23 – Aug 22", element: "Fire",  emoji: "👑", trait: "Drama, but make it regal",     color: "oklch(0.82 0.18 65)"  },
  { name: "Virgo",       symbol: "♍", dates: "Aug 23 – Sep 22", element: "Earth", emoji: "🍃", trait: "Knocks things off precisely",  color: "oklch(0.78 0.12 155)" },
  { name: "Libra",       symbol: "♎", dates: "Sep 23 – Oct 22", element: "Air",   emoji: "⚖️", trait: "Diplomatic until dinner time", color: "oklch(0.82 0.14 320)" },
  { name: "Scorpio",     symbol: "♏", dates: "Oct 23 – Nov 21", element: "Water", emoji: "🦂", trait: "Mysterious midnight gremlin",  color: "oklch(0.55 0.18 320)" },
  { name: "Sagittarius", symbol: "♐", dates: "Nov 22 – Dec 21", element: "Fire",  emoji: "🏹", trait: "Window-watching philosopher",  color: "oklch(0.75 0.18 50)"  },
  { name: "Capricorn",   symbol: "♑", dates: "Dec 22 – Jan 19", element: "Earth", emoji: "🏔", trait: "CEO of the cardboard box",     color: "oklch(0.65 0.08 260)" },
  { name: "Aquarius",    symbol: "♒", dates: "Jan 20 – Feb 18", element: "Air",   emoji: "💧", trait: "Drinks only from forbidden cups", color: "oklch(0.78 0.14 200)" },
  { name: "Pisces",      symbol: "♓", dates: "Feb 19 – Mar 20", element: "Water", emoji: "🐟", trait: "Dreamy little fish-watcher",   color: "oklch(0.78 0.12 250)" },
];

export function getZodiacFromDate(dateStr: string): ZodiacSign {
  const d = new Date(dateStr);
  const m = d.getMonth() + 1;
  const day = d.getDate();
  const ranges: [number, number, number, number, number][] = [
    [3, 21, 4, 19, 0],
    [4, 20, 5, 20, 1],
    [5, 21, 6, 20, 2],
    [6, 21, 7, 22, 3],
    [7, 23, 8, 22, 4],
    [8, 23, 9, 22, 5],
    [9, 23, 10, 22, 6],
    [10, 23, 11, 21, 7],
    [11, 22, 12, 21, 8],
    [12, 22, 12, 31, 9],
    [1, 1, 1, 19, 9],
    [1, 20, 2, 18, 10],
    [2, 19, 3, 20, 11],
  ];
  for (const [sm, sd, em, ed, idx] of ranges) {
    if ((m === sm && day >= sd) || (m === em && day <= ed)) {
      return ZODIAC_SIGNS[idx];
    }
  }
  return ZODIAC_SIGNS[0];
}

export function generateReading(name: string, sign: ZodiacSign) {
  // Deterministic-ish pseudo-random from name
  const seed = [...name].reduce((a, c) => a + c.charCodeAt(0), 0);
  const rand = (n: number) => (seed * 9301 + 49297) % n;

  const snacks = ["churu tubes", "rotisserie chicken", "lickable tuna mousse", "forbidden butter", "salmon sashimi", "creamy cheese flake"];
  const colors = ["moonlit lavender", "midnight teal", "cosmic rose", "stardust silver", "aurora mint", "nebula pink"];
  const activities = ["3am floor sprints", "supervising laptop work", "judging the houseplants", "ambushing ankles", "long contemplative window staring", "loaf formation meditation"];
  const predictions = [
    "A mysterious red dot will return. You must protect the realm.",
    "The treat drawer will open unexpectedly. Position yourself accordingly.",
    "A new cardboard box arrives this week — your kingdom expands.",
    "Mercury is in catnip retrograde. Expect zoomies at 3:17am sharp.",
    "Venus aligns with the laundry basket. A nap of legend awaits.",
    "A bird shall taunt you through glass. Stay vigilant, stay vibing.",
  ];
  const archetypes = ["The Velvet Oracle", "The Midnight Mischief", "The Sunbeam Sage", "The Cosmic Loaf", "The Stardust Trickster", "The Nebula Napper"];
  const rarities = ["Common", "Rare", "Epic", "Legendary", "Mythic"];
  const auras = ["Aurora Violet", "Lunar Mint", "Stardust Rose", "Galactic Sapphire", "Nebula Gold"];

  return {
    personality: `${name} is a true ${sign.name}: ${sign.trait.toLowerCase()}. Charged with ${sign.element.toLowerCase()} energy, this little soul oscillates between regal serenity and pure feral joy. The stars whisper that ${name}'s purrs can realign your aura.`,
    strengths: ["Hypnotic stare", "Strategic napping", "Vibe curation", "Emotional support loafing"],
    weaknesses: ["Object permanence (selective)", "Believes 4am = breakfast", "Allergic to closed doors"],
    chaosLevel: 40 + (rand(60) % 60),
    cuddleCompat: 55 + (rand(45) % 45),
    activities: [activities[rand(activities.length)], activities[(rand(activities.length) + 2) % activities.length]],
    luckySnack: snacks[rand(snacks.length)],
    luckyColor: colors[rand(colors.length)],
    prediction: predictions[rand(predictions.length)],
    archetype: archetypes[rand(archetypes.length)],
    rarity: rarities[rand(rarities.length)],
    aura: auras[rand(auras.length)],
  };
}
