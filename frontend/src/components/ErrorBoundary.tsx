"use client";
import { Component, ReactNode } from "react";

/**
 * ErrorBoundary — enhanced fallback UI with illustration and error tracker support.
 *
 * Features:
 * - Branded SVG warning illustration (design-token colours → dark mode safe).
 * - role="alert" + aria-live="assertive" on the fallback container.
 * - onError callback prop for forwarding to Sentry / Datadog / custom trackers.
 * - Errors are always logged to the console (not dev-only).
 * - Error message shown in a collapsible <details> block in non-production.
 * - onRetry prop resets the boundary and re-renders children (#522).
 *
 * Closes #1245
 */

interface Props {
  children: ReactNode;
  /** Shown above the generic message — e.g. "Dashboard" */
  section?: string;
  /**
   * When provided, the primary action becomes a retry button that calls
   * this instead of reloading the whole page — and the boundary clears its
   * own error state so the retried content gets a fresh render.
   */
  onRetry?: () => void;
  /** Label for the retry button. Defaults to "Try again". Ignored without onRetry. */
  retryLabel?: string;
  /**
   * Optional external error tracker callback.
   * Called with the error and component stack whenever componentDidCatch fires.
   *
   * @example
   *   <ErrorBoundary onError={(err, info) => Sentry.captureException(err, { extra: info })}>
   */
  onError?: (error: Error, info: React.ErrorInfo) => void;
}

interface State {
  error: Error | null;
}

/** Branded SVG warning illustration. Uses CSS design tokens for dark-mode support. */
function ErrorIllustration() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      role="img"
      aria-label="Something went wrong illustration"
      className="mb-4"
    >
      {/* Warning triangle */}
      <path
        d="M40 8 L72 64 H8 L40 8Z"
        fill="var(--token-warning-subtle, #FEF3C7)"
        stroke="var(--token-warning, #D97706)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Exclamation stem */}
      <rect
        x="37"
        y="28"
        width="6"
        height="20"
        rx="3"
        fill="var(--token-warning, #D97706)"
      />
      {/* Exclamation dot */}
      <circle cx="40" cy="54" r="3.5" fill="var(--token-warning, #D97706)" />
      {/* Cow ear silhouettes — brand nod */}
      <path
        d="M18 62 Q14 56 17 53 Q21 56 18 62Z"
        fill="var(--token-primary, #5D3C15)"
        opacity="0.3"
      />
      <path
        d="M62 62 Q66 56 63 53 Q59 56 62 62Z"
        fill="var(--token-primary, #5D3C15)"
        opacity="0.3"
      />
    </svg>
  );
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Always log — useful for both dev debugging and production log aggregators.
    console.error("[ErrorBoundary]", error, info.componentStack);
    // Forward to external tracker (Sentry, Datadog, etc.) if provided.
    this.props.onError?.(error, info);
  }

  handleRetry = () => {
    this.setState({ error: null });
    this.props.onRetry?.();
  };

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    const section = this.props.section ? `${this.props.section} — ` : "";
    const { onRetry, retryLabel } = this.props;
    const isDev = process.env.NODE_ENV !== "production";

    return (
      <div
        role="alert"
        aria-live="assertive"
        className="flex flex-col items-center justify-center min-h-[200px] p-8 text-center"
      >
        <ErrorIllustration />

        <h2 className="text-xl font-semibold text-brown mb-2">
          {section}Something went wrong
        </h2>
        <p className="text-brown/60 mb-6 text-sm max-w-sm">
          An unexpected error occurred. Please reload the page or report the
          issue if it persists.
        </p>

        {/* Collapsible error details — non-production only */}
        {isDev && (
          <details className="mb-4 max-w-sm w-full text-left">
            <summary className="text-xs text-brown/50 cursor-pointer hover:text-brown/80 transition select-none">
              Error details
            </summary>
            <pre className="mt-2 text-xs bg-brown/5 rounded-lg p-3 overflow-auto text-brown/70 whitespace-pre-wrap break-words">
              {error.message}
            </pre>
          </details>
        )}

        <div className="flex gap-3 flex-wrap justify-center">
          {onRetry ? (
            <button
              onClick={this.handleRetry}
              className="bg-gold text-brown font-semibold px-4 py-2 rounded-lg hover:bg-gold/80 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            >
              {retryLabel ?? "Try again"}
            </button>
          ) : (
            <button
              onClick={() => window.location.reload()}
              className="bg-gold text-brown font-semibold px-4 py-2 rounded-lg hover:bg-gold/80 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            >
              Reload page
            </button>
          )}
          <a
            href="/help/faq"
            className="border border-brown/30 text-brown px-4 py-2 rounded-lg hover:bg-brown/5 transition text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brown focus-visible:ring-offset-2"
          >
            Visit FAQ
          </a>
          <a
            href="https://github.com/teslims2/StellarKraal-/issues/new"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-brown/30 text-brown px-4 py-2 rounded-lg hover:bg-brown/5 transition text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brown focus-visible:ring-offset-2"
          >
            Report issue
          </a>
        </div>
      </div>
    );
  }
}
