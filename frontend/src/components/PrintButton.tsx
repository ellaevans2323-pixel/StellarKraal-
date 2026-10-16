"use client";

/**
 * PrintButton — triggers the browser print dialog (or "Save as PDF").
 *
 * The button is hidden from print output via:
 *   1. The `print:hidden` Tailwind utility class.
 *   2. The global `@media print { button { display: none } }` rule in globals.css.
 *
 * Closes #1247
 */

interface Props {
  className?: string;
}

export default function PrintButton({ className }: Props) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      aria-label="Print or save this loan agreement as PDF"
      className={[
        "print:hidden inline-flex items-center gap-2 px-4 py-2 rounded-xl",
        "bg-[color:var(--token-surface)] border border-[color:var(--token-border-strong)]",
        "text-[color:var(--token-text)] text-sm font-medium",
        "hover:bg-[color:var(--token-surface-raised)] hover:border-[color:var(--token-primary)]",
        "transition focus:outline-none focus-visible:ring-2",
        "focus-visible:ring-[color:var(--token-accent)] focus-visible:ring-offset-2",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Printer icon */}
      <svg
        aria-hidden="true"
        className="h-4 w-4 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
        />
      </svg>
      Print / Save as PDF
    </button>
  );
}
