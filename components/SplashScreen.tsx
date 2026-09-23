"use client";

import { useEffect, useState } from "react";

/**
 * Welcome splash shown every time the site opens (and on refresh): a full
 * white screen that shows the greeting one word at a time in the centre —
 * "Welcome" (Nunito), then Arabic, Hindi and Malayalam — each fading in and
 * being replaced by the next, before the whole splash fades away to reveal the
 * site. Purely decorative (aria-hidden).
 */
const WORDS = [
  { t: "Welcome", lang: "en", dir: "ltr" as const },
  { t: "أهلاً وسهلاً", lang: "ar", dir: "rtl" as const },
  { t: "स्वागत है", lang: "hi", dir: "ltr" as const },
  { t: "സ്വാഗതം", lang: "ml", dir: "ltr" as const },
];

const STEP_MS = 650; // time each word is on screen
const FADE_MS = 500; // final fade-out of the whole splash

export default function SplashScreen() {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (index < WORDS.length - 1) {
      const next = setTimeout(() => setIndex((i) => i + 1), STEP_MS);
      return () => clearTimeout(next);
    }
    // Last word shown → fade the whole splash out, then unmount.
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
