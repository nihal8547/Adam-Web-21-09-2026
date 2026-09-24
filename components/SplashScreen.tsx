"use client";

import { useEffect, useState } from "react";
import type { SplashWord } from "@/lib/cms/site";

/**
 * Welcome splash shown on every load / refresh: a full white screen where the
 * greeting flashes quickly one word at a time in the centre — driven by CMS
 * (SiteSettings → Splash Screen tab) with static fallback.
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
    if (words.length === 0) {
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
  }, [index, words.length, stepMs]);

  if (!show || words.length === 0) return null;

  const word = words[index];
  return (
    <div className={`splash${leaving ? " splash--leaving" : ""}`} aria-hidden="true">
      <span key={index} className="splash__word" lang={word.lang} dir={word.dir}>
        {word.word}
      </span>
    </div>
  );
}
