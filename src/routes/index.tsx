import { createFileRoute } from "@tanstack/react-router";
import { StarField } from "@/components/StarField";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ZodiacWheel } from "@/components/ZodiacWheel";
import { DailyHoroscope } from "@/components/DailyHoroscope";
import { Compatibility } from "@/components/Compatibility";
import { CosmicCards } from "@/components/CosmicCards";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Meowroscope — Discover your cat's cosmic destiny" },
      {
        name: "description",
        content:
          "Magical astrology for cats. Discover zodiac readings, daily horoscopes, compatibility, and collectible cosmic cat cards.",
      },
      { property: "og:title", content: "Meowroscope — Cosmic destiny for cats" },
      { property: "og:description", content: "Magical astrology readings for your fluffy familiar." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen">
      <StarField />
      <Nav />
      <main>
        <Hero />
        <ZodiacWheel />
        <DailyHoroscope />
        <Compatibility />
        <CosmicCards />
      </main>
      <Footer />
    </div>
  );
}
