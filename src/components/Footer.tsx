import { Moon } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative py-12 px-4 border-t border-border">
      <div className="max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 mb-3">
          <Moon className="w-5 h-5 text-cosmic-turquoise" />
          <span className="font-display text-xl font-bold text-aurora">Meowroscope</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Written in the stars · Delivered with extra purr · © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
