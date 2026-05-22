import { useRef, useCallback, useEffect } from "react";
import meowUrl from "@/assets/meow.mp3";

const MEOW_COOLDOWN_MS = 280;

export function useMeowSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastPlayRef = useRef(0);

  useEffect(() => {
    const audio = new Audio(meowUrl);
    audio.preload = "auto";
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      audioRef.current = null;
    };
  }, []);

  const play = useCallback(() => {
    const nowMs = Date.now();
    if (nowMs - lastPlayRef.current < MEOW_COOLDOWN_MS) return;
    lastPlayRef.current = nowMs;

    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    void audio.play().catch(() => {
      /* браузер может блокировать autoplay до первого клика */
    });
  }, []);

  return { play };
}
