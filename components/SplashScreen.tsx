"use client";

import { useEffect, useState } from "react";
import type { SplashWord } from "@/lib/cms/site";

/**
 * Clean Multilingual Welcome Splash Screen:
 * Flashes greetings quickly one word at a time in the centre
 * (English, Arabic, Hindi, Malayalam, etc.), then smoothly fades away to reveal the Hero.
 */

const FADE_MS = 450;

export default function SplashScreen({
  words,
  stepMs = 220,
}: {
  words: SplashWord[];
  stepMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!words || words.length === 0) {
      setShow(false);
      return;
    }
    if (index < words.length - 1) {
      const next = setTimeout(() => setIndex((i) => i + 1), stepMs);
      return () => clearTimeout(next);
    }
    const fade = setTimeout(() => setLeaving(true), stepMs);
    const done = setTimeout(() => setShow(false), stepMs + FADE_MS);
    return () => {
      clearTimeout(fade);
      clearTimeout(done);
    };
  }, [index, words, stepMs]);

  if (!show || !words || words.length === 0) return null;

  const word = words[index] || words[0];
  return (
    <div
      onClick={() => setShow(false)}
      className={`splash${leaving ? " splash--leaving" : ""}`}
      aria-hidden="true"
    >
      <span key={index} className="splash__word" lang={word.lang} dir={word.dir}>
        {word.word}
      </span>
    </div>
  );
}
