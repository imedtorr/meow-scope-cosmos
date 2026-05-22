import { Link } from "@tanstack/react-router";
import { Moon } from "lucide-react";

export function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <div className="max-w-6xl mx-auto glass rounded-full px-6 py-3 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2">
          <Moon className="w-5 h-5 text-cosmic-turquoise" />
          <span className="font-display text-lg font-bold text-aurora">Meowroscope</span>
        </Link>
        <Link
          to="/reading"
          className="px-5 py-2 rounded-full bg-gradient-button text-primary-foreground text-sm font-semibold shadow-glow hover:scale-105 transition-transform"
        >
          Get Reading
        </Link>
      </div>
    </header>
  );
}
