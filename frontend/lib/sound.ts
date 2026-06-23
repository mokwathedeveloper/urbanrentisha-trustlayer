"use client";

const SOUND_ENABLED_KEY = "ur_sound_enabled";

export type SoundKind = "message" | "report" | "reservation" | "general";

const TONES: Record<SoundKind, { frequencies: number[]; durationMs: number }> = {
  message: { frequencies: [880, 1175], durationMs: 90 },
  report: { frequencies: [440, 330], durationMs: 140 },
  reservation: { frequencies: [660, 880, 990], durationMs: 90 },
  general: { frequencies: [740], durationMs: 110 },
};

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AudioContextClass = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!audioContext) audioContext = new AudioContextClass();
  return audioContext;
}

export function isSoundEnabled(): boolean {
  if (typeof window === "undefined") return true;
  const stored = window.localStorage.getItem(SOUND_ENABLED_KEY);
  return stored === null ? true : stored === "true";
}

export function setSoundEnabled(enabled: boolean) {
  window.localStorage.setItem(SOUND_ENABLED_KEY, String(enabled));
}

/**
 * Synthesizes a short tone with the Web Audio API rather than shipping
 * audio asset files - keeps this dependency-free and avoids bundling
 * licensed sound effects. Each kind gets a distinct short note sequence so
 * messages, reports, reservation updates, and general alerts are
 * distinguishable by ear, not just by reading the screen.
 */
export function playSound(kind: SoundKind) {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const { frequencies, durationMs } = TONES[kind];
  const noteSeconds = durationMs / 1000;

  frequencies.forEach((frequency, index) => {
    const startTime = ctx.currentTime + index * noteSeconds;
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(0.2, startTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + noteSeconds);
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start(startTime);
    oscillator.stop(startTime + noteSeconds);
  });
}
