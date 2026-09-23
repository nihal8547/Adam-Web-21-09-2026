"use client";

import { useEffect, useState } from "react";

/**
 * Welcome splash shown when the site first opens: a full white screen with
 * "Welcome" (Nunito) and the greeting in Arabic, Hindi and Malayalam, which
 * then fades away to reveal the site. Shown once per browser session so it
 * doesn't repeat on every navigation. Purely decorative (aria-hidden), and it
 * collapses instantly for visitors who prefer reduced motion.
 */
const GREETINGS = [
  { label: "أهلاً وسهلاً", lang: "ar", dir: "rtl" as const },
  { label: "स्वागत है", lang: "hi", dir: "ltr" as const },
  { label: "സ്വാഗതം", lang: "ml", dir: "ltr" as const },
];

const HOLD_MS = 2200; // greetings visible before the fade-out starts
const FADE_MS = 600; // fade-out duration

export default function SplashScreen() {
  const [show, setShow] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("adam_splash_seen") === "1";
    } catch {
      /* sessionStorage unavailable (private mode) — just show it */
    }
    if (seen) {
      setShow(false);
      return;
    }

    try {
      sessionStorage.setItem("adam_splash_seen", "1");
    } catch {
      /* ignore */
    }

    const fadeTimer = setTimeout(() => setLeaving(true), HOLD_MS);
    const doneTimer = setTimeout(() => setShow(false), HOLD_MS + FADE_MS);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (!show) return null;

  return (
    <div className={`splash${leaving ? " splash--leaving" : ""}`} aria-hidden="true">
      <div className="splash__inner">
        <span className="splash__welcome">Welcome</span>
        <span className="splash__rule" />
        <div className="splash__greetings">
          {GREETINGS.map((g, i) => (
            <span
              key={g.lang}
              className="splash__greet"
              lang={g.lang}
              dir={g.dir}
              style={{ animationDelay: `${0.35 + i * 0.25}s` }}
            >
              {g.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
