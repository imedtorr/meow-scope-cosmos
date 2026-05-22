import { useMemo } from "react";

interface StarFieldProps {
  density?: number;
}

export function StarField({ density = 80 }: StarFieldProps) {
  const stars = useMemo(
    () =>
      Array.from({ length: density }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 4,
      })),
    [density],
  );

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.30_0.15_300_/_0.4),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,oklch(0.40_0.15_200_/_0.25),transparent_60%)]" />
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-cosmic-silver animate-twinkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            boxShadow: `0 0 ${s.size * 3}px oklch(0.92 0.02 280 / 0.8)`,
          }}
        />
      ))}
    </div>
  );
}
