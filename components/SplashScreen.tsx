"use client";

import { useEffect, useState } from "react";

/**
 * Welcome splash shown on every load / refresh. The greeting flashes quickly
 * one word at a time in the centre — "Welcome" (Nunito), then Arabic, Hindi and
 * Malayalam — after which a fire hose rises from the bottom and sprays water,
 * and the splash is washed up and away to reveal the site. On-theme for a fire
 * protection company. Purely decorative (aria-hidden).
 */
const WORDS = [
  { t: "WELCOME", lang: "en", dir: "ltr" as const },
  { t: "أهلاً وسهلاً", lang: "ar", dir: "rtl" as const },
  { t: "स्वागत है", lang: "hi", dir: "ltr" as const },
  { t: "സ്വാഗതം", lang: "ml", dir: "ltr" as const },
];

const STEP_MS = 360; // each word flashes quickly
const SPRAY_MS = 950; // hose rises and sprays
const WASH_MS = 600; // splash washed away

// Deterministic water droplets (no Math.random → no hydration mismatch).
// High count, high rise and short duration → a forceful, high-pressure jet.
const DROPS = Array.from({ length: 46 }, (_, i) => {
  const angle = (i / 45) * Math.PI; // 0..π fan
  const x = Math.round(Math.cos(angle) * (70 + (i % 6) * 34));
  return {
    x,
    rise: 72 + (i % 6) * 12, // vh — shoots high, off the top
    delay: Number(((i % 14) * 0.035).toFixed(3)), // tight → dense stream
    dur: Number((0.5 + (i % 4) * 0.09).toFixed(3)), // short → fast/forceful
    size: 5 + (i % 4) * 3,
  };
});

type Phase = "words" | "spray" | "washing";

export default function SplashScreen() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("words");
  const [show, setShow] = useState(true);

  // Cycle the words, then move on to the hose/spray phase.
  useEffect(() => {
    if (phase !== "words") return;
    if (index < WORDS.length - 1) {
      const t = setTimeout(() => setIndex((i) => i + 1), STEP_MS);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPhase("spray"), STEP_MS);
    return () => clearTimeout(t);
  }, [index, phase]);

  // Spray, then wash the splash away, then unmount. Each phase schedules the
  // next on its own so the timers survive the phase change.
  useEffect(() => {
    if (phase === "spray") {
      const t = setTimeout(() => setPhase("washing"), SPRAY_MS);
      return () => clearTimeout(t);
    }
    if (phase === "washing") {
      const t = setTimeout(() => setShow(false), WASH_MS);
      return () => clearTimeout(t);
    }
  }, [phase]);

  if (!show) return null;

  const word = WORDS[index];
  const spraying = phase === "spray" || phase === "washing";

  return (
    <div className={`splash${phase === "washing" ? " splash--washing" : ""}`} aria-hidden="true">
      {phase === "words" && (
        <span key={index} className="splash__word" lang={word.lang} dir={word.dir}>
          {word.t}
        </span>
      )}

      {spraying && (
        <div className="splash__scene">
          <span className="splash__jet" />
          <div className="splash__spray">
            {DROPS.map((d, i) => (
              <span
                key={i}
                className="splash__drop"
                style={
                  {
                    "--x": `${d.x}px`,
                    "--rise": `${d.rise}vh`,
                    width: `${d.size}px`,
                    height: `${d.size}px`,
                    animationDelay: `${d.delay}s`,
                    animationDuration: `${d.dur}s`,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
          <div className="splash__hose">
            <span className="splash__nozzle" />
          </div>
        </div>
      )}
    </div>
  );
}
