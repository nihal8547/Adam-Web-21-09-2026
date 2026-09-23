"use client";

import { useEffect, useState } from "react";

/**
 * Welcome splash shown on every load / refresh: a full white screen where the
 * greeting flashes quickly one word at a time in the centre — "WELCOME"
 * (Nunito), then Arabic, Hindi and Malayalam — before the splash fades away to
 * reveal the site. Purely decorative (aria-hidden).
 */
const WORDS = [
  { t: "WELCOME", lang: "en", dir: "ltr" as const },
  { t: "أهلاً وسهلاً", lang: "ar", dir: "rtl" as const },
  { t: "स्वागत है", lang: "hi", dir: "ltr" as const },
  { t: "സ്വാഗതം", lang: "ml", dir: "ltr" as const },
];

const STEP_MS = 360; // each word flashes quickly
const FADE_MS = 450; // final fade-out

export default function SplashScreen() {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (index < WORDS.length - 1) {
      const next = setTimeout(() => setIndex((i) => i + 1), STEP_MS);
      return () => clearTimeout(next);
    }
    const fade = setTimeout(() => setLeaving(true), STEP_MS);
    const done = setTimeout(() => setShow(false), STEP_MS + FADE_MS);
    return () => {
      clearTimeout(fade);
      clearTimeout(done);
    };
  }, [index]);

  if (!show) return null;

  const word = WORDS[index];
  return (
    <div className={`splash${leaving ? " splash--leaving" : ""}`} aria-hidden="true">
      <span key={index} className="splash__word" lang={word.lang} dir={word.dir}>
        {word.t}
      </span>
    </div>
  );
}
