"use client";
import React from "react";

/**
 * AnimalIcon — SVG icons for livestock collateral types.
 *
 * Each icon:
 * - Uses CSS custom properties (design tokens) for dark-mode colour flipping.
 * - Is decorative by default (aria-hidden="true" on the wrapper).
 * - Exposes role="img" + aria-label when an accessible label is provided.
 *
 * Supported types: cattle, goat, sheep, camel, other (fallback for unknowns).
 *
 * Closes #1249
 */

interface Props {
  /** Animal type string (case-insensitive). Falls back to "other". */
  type: string;
  /** Size in px. Defaults to 40. */
  size?: number;
  /** When provided, exposed to screen readers as an image with this label. */
  "aria-label"?: string;
  className?: string;
}

/* ── Individual SVG icons ─────────────────────────────────────────────────── */

function CattleIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      {/* Body */}
      <ellipse cx="20" cy="27" rx="12" ry="8" fill="var(--token-surface)" stroke="var(--token-primary)" strokeWidth="1.5" />
      {/* Head */}
      <ellipse cx="20" cy="14" rx="7" ry="6" fill="var(--token-surface)" stroke="var(--token-primary)" strokeWidth="1.5" />
      {/* Left horn */}
      <path d="M14 10 Q10 4 13 2 Q15 6 14 10Z" fill="var(--token-accent)" opacity="0.85" />
      {/* Right horn */}
      <path d="M26 10 Q30 4 27 2 Q25 6 26 10Z" fill="var(--token-accent)" opacity="0.85" />
      {/* Left ear */}
      <path d="M13 13 Q9 10 11 8 Q14 10 13 13Z" fill="var(--token-primary)" opacity="0.5" />
      {/* Right ear */}
      <path d="M27 13 Q31 10 29 8 Q26 10 27 13Z" fill="var(--token-primary)" opacity="0.5" />
      {/* Eyes */}
      <circle cx="17" cy="13" r="1" fill="var(--token-primary)" />
      <circle cx="23" cy="13" r="1" fill="var(--token-primary)" />
      {/* Nostrils */}
      <ellipse cx="18.5" cy="17" rx="1" ry="0.7" fill="var(--token-primary)" opacity="0.5" />
      <ellipse cx="21.5" cy="17" rx="1" ry="0.7" fill="var(--token-primary)" opacity="0.5" />
      {/* Legs */}
      <line x1="13" y1="34" x2="12" y2="39" stroke="var(--token-primary)" strokeWidth="2" strokeLinecap="round" />
      <line x1="17" y1="35" x2="17" y2="39" stroke="var(--token-primary)" strokeWidth="2" strokeLinecap="round" />
      <line x1="23" y1="35" x2="23" y2="39" stroke="var(--token-primary)" strokeWidth="2" strokeLinecap="round" />
      <line x1="27" y1="34" x2="28" y2="39" stroke="var(--token-primary)" strokeWidth="2" strokeLinecap="round" />
      {/* Tail */}
      <path d="M32 25 Q36 22 34 28" stroke="var(--token-primary)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Brand tag — finance motif */}
      <circle cx="8" cy="8" r="2.5" fill="var(--token-accent)" opacity="0.8" />
    </svg>
  );
}

function GoatIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      {/* Body */}
      <ellipse cx="20" cy="27" rx="11" ry="7" fill="var(--token-surface)" stroke="var(--token-primary)" strokeWidth="1.5" />
      {/* Head — more angular */}
      <path d="M13 17 Q14 9 20 9 Q26 9 27 17 Q26 20 20 20 Q14 20 13 17Z" fill="var(--token-surface)" stroke="var(--token-primary)" strokeWidth="1.5" />
      {/* Beard */}
      <path d="M18 20 Q20 24 22 20" stroke="var(--token-primary)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Horns — curved back */}
      <path d="M15 11 Q10 5 12 2 Q16 4 15 11Z" fill="var(--token-accent)" opacity="0.85" />
      <path d="M25 11 Q30 5 28 2 Q24 4 25 11Z" fill="var(--token-accent)" opacity="0.85" />
      {/* Ears — long drooping */}
      <path d="M13 15 Q8 15 8 19 Q11 19 13 17Z" fill="var(--token-primary)" opacity="0.5" />
      <path d="M27 15 Q32 15 32 19 Q29 19 27 17Z" fill="var(--token-primary)" opacity="0.5" />
      {/* Eyes */}
      <circle cx="17" cy="14" r="1" fill="var(--token-primary)" />
      <circle cx="23" cy="14" r="1" fill="var(--token-primary)" />
      {/* Legs */}
      <line x1="13" y1="33" x2="12" y2="39" stroke="var(--token-primary)" strokeWidth="2" strokeLinecap="round" />
      <line x1="17" y1="34" x2="17" y2="39" stroke="var(--token-primary)" strokeWidth="2" strokeLinecap="round" />
      <line x1="23" y1="34" x2="23" y2="39" stroke="var(--token-primary)" strokeWidth="2" strokeLinecap="round" />
      <line x1="27" y1="33" x2="28" y2="39" stroke="var(--token-primary)" strokeWidth="2" strokeLinecap="round" />
      {/* Tail — upright */}
      <path d="M31 23 Q35 19 33 25" stroke="var(--token-primary)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function SheepIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      {/* Fluffy body — overlapping circles */}
      <circle cx="16" cy="27" r="7" fill="var(--token-surface)" stroke="var(--token-primary)" strokeWidth="1" />
      <circle cx="24" cy="27" r="7" fill="var(--token-surface)" stroke="var(--token-primary)" strokeWidth="1" />
      <circle cx="20" cy="23" r="7" fill="var(--token-surface)" stroke="var(--token-primary)" strokeWidth="1" />
      {/* Wool texture */}
      <circle cx="15" cy="24" r="1.2" fill="var(--token-border-strong,#D4A05A)" opacity="0.4" />
      <circle cx="20" cy="21" r="1.2" fill="var(--token-border-strong,#D4A05A)" opacity="0.4" />
      <circle cx="25" cy="24" r="1.2" fill="var(--token-border-strong,#D4A05A)" opacity="0.4" />
      {/* Head — small and darker */}
      <ellipse cx="20" cy="12" rx="5" ry="4.5" fill="var(--token-primary)" opacity="0.75" />
      {/* Ears */}
      <path d="M15 11 Q12 7 14 5 Q17 7 15 11Z" fill="var(--token-primary)" opacity="0.6" />
      <path d="M25 11 Q28 7 26 5 Q23 7 25 11Z" fill="var(--token-primary)" opacity="0.6" />
      {/* Eyes */}
      <circle cx="18" cy="11" r="0.8" fill="var(--token-surface)" />
      <circle cx="22" cy="11" r="0.8" fill="var(--token-surface)" />
      {/* Legs */}
      <line x1="14" y1="34" x2="13" y2="39" stroke="var(--token-primary)" strokeWidth="2" strokeLinecap="round" />
      <line x1="18" y1="35" x2="18" y2="39" stroke="var(--token-primary)" strokeWidth="2" strokeLinecap="round" />
      <line x1="22" y1="35" x2="22" y2="39" stroke="var(--token-primary)" strokeWidth="2" strokeLinecap="round" />
      <line x1="26" y1="34" x2="27" y2="39" stroke="var(--token-primary)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CamelIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      {/* Body */}
      <path d="M8 29 Q8 21 14 21 Q16 21 18 19 Q20 15 22 19 Q24 21 26 21 Q32 21 32 29 Q32 33 20 33 Q8 33 8 29Z" fill="var(--token-surface)" stroke="var(--token-primary)" strokeWidth="1.5" />
      {/* Humps */}
      <path d="M15 21 Q16 15 18 13 Q19 11 20 13 Q21 15 22 15 Q24 13 25 15 Q27 19 26 21" fill="var(--token-surface)" stroke="var(--token-primary)" strokeWidth="1.5" />
      {/* Neck */}
      <path d="M14 21 Q12 16 14 11 Q16 9 18 11 Q18 16 16 21" fill="var(--token-surface)" stroke="var(--token-primary)" strokeWidth="1.5" />
      {/* Head */}
      <ellipse cx="14" cy="9" rx="4" ry="3.5" fill="var(--token-surface)" stroke="var(--token-primary)" strokeWidth="1.5" />
      {/* Ear */}
      <path d="M11 7 Q9 4 11 3 Q13 4 11 7Z" fill="var(--token-primary)" opacity="0.5" />
      {/* Eye */}
      <circle cx="13" cy="8" r="0.8" fill="var(--token-primary)" />
      {/* Lips */}
      <path d="M12 11 Q14 13 16 11" stroke="var(--token-primary)" strokeWidth="1" strokeLinecap="round" fill="none" />
      {/* Legs */}
      <line x1="12" y1="33" x2="11" y2="39" stroke="var(--token-primary)" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="33" x2="16" y2="39" stroke="var(--token-primary)" strokeWidth="2" strokeLinecap="round" />
      <line x1="22" y1="33" x2="22" y2="39" stroke="var(--token-primary)" strokeWidth="2" strokeLinecap="round" />
      <line x1="28" y1="33" x2="28" y2="39" stroke="var(--token-primary)" strokeWidth="2" strokeLinecap="round" />
      {/* Tail */}
      <path d="M32 27 Q36 25 35 30" stroke="var(--token-primary)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function OtherAnimalIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      {/* Generic quadruped body */}
      <ellipse cx="20" cy="26" rx="12" ry="8" fill="var(--token-surface)" stroke="var(--token-primary)" strokeWidth="1.5" />
      {/* Head */}
      <circle cx="20" cy="14" r="6" fill="var(--token-surface)" stroke="var(--token-primary)" strokeWidth="1.5" />
      {/* Question mark — indicates unknown type */}
      <text
        x="20"
        y="18"
        textAnchor="middle"
        fontSize="8"
        fontWeight="700"
        fill="var(--token-primary)"
        aria-hidden="true"
      >
        ?
      </text>
      {/* Legs */}
      <line x1="12" y1="33" x2="11" y2="39" stroke="var(--token-primary)" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="34" x2="16" y2="39" stroke="var(--token-primary)" strokeWidth="2" strokeLinecap="round" />
      <line x1="24" y1="34" x2="24" y2="39" stroke="var(--token-primary)" strokeWidth="2" strokeLinecap="round" />
      <line x1="28" y1="33" x2="29" y2="39" stroke="var(--token-primary)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* ── Icon map ─────────────────────────────────────────────────────────────── */

const ICON_MAP: Record<string, (size: number) => React.ReactElement> = {
  cattle: (s) => <CattleIcon size={s} />,
  goat: (s) => <GoatIcon size={s} />,
  sheep: (s) => <SheepIcon size={s} />,
  camel: (s) => <CamelIcon size={s} />,
};

/* ── Public component ─────────────────────────────────────────────────────── */

export function AnimalIcon({
  type,
  size = 40,
  "aria-label": ariaLabel,
  className,
}: Props) {
  const normalised = type?.toLowerCase() ?? "other";
  const renderIcon = ICON_MAP[normalised] ?? ((s: number) => <OtherAnimalIcon size={s} />);

  return (
    <span
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : "true"}
      className={className}
    >
      {renderIcon(size)}
    </span>
  );
}

export default AnimalIcon;
