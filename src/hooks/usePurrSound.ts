import { useRef, useCallback } from "react";

export function usePurrSound() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{
    osc1: OscillatorNode;
    osc2: OscillatorNode;
    lfo: OscillatorNode;
    gain: GainNode;
    lfoGain: GainNode;
    filter: BiquadFilterNode;
  } | null>(null);

  const stop = useCallback(() => {
    if (nodesRef.current) {
      const now = audioCtxRef.current?.currentTime ?? 1;
      nodesRef.current.gain.gain.setTargetAtTime(1e-5, now, 0.1);
      setTimeout(() => {
        try {
          nodesRef.current?.osc1.stop();
          nodesRef.current?.osc2.stop();
          nodesRef.current?.lfo.stop();
        } catch {
          /* ignore */
        }
        nodesRef.current = null;
      }, 200);
    }
  }, []);

  const play = useCallback(() => {
    stop();

    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = audioCtxRef.current ?? new AudioContextClass();
    audioCtxRef.current = ctx;
    if (ctx.state === "suspended") ctx.resume();

    const now = ctx.currentTime;

    // Two low oscillators for warm body tone
    const osc1 = ctx.createOscillator();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(45, now);

    const osc2 = ctx.createOscillator();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(48, now);

    // LFO for purr rhythm ~ 25 Hz flutter
    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.setValueAtTime(24, now);

    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(0.25, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(1e-5, now);
    gain.gain.exponentialRampToValueAtTime(1.5, now + 0.05);

    // Lowpass to keep it soft and rumbly
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(800, now);
    filter.Q.setValueAtTime(0.5, now);

    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    lfo.start(now);

    nodesRef.current = { osc1, osc2, lfo, gain, lfoGain, filter };
  }, [stop]);

  return { play, stop };
}
