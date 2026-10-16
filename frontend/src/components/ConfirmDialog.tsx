"use client";
import { useState, useId } from "react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

/**
 * ConfirmDialog — enhanced for #1243
 *
 * New features vs previous version:
 *  - `role="alertdialog"` for destructive variants (via Modal's aria-modal container).
 *  - `details` prop renders a summary table (action name, loan ID, amount).
 *  - `confirmationId` prop: when set, the user must type the value to unlock the
 *    confirm button — prevents accidental destructive actions.
 *  - Fully keyboard-accessible: focus trapped, Escape cancels, Enter submits when
 *    the confirmation input value matches.
 *
 * Variants:
 *   `default`     → confirm button uses secondary (gold) style, role="dialog"
 *   `destructive` → confirm button uses danger (red), role="alertdialog"
 */

export type ConfirmDialogVariant = "default" | "destructive";

export interface ActionDetail {
  label: string;
  value: string;
}

interface Props {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: ConfirmDialogVariant;
  destructiveAriaLabel?: string;
  /**
   * Key details shown in the dialog body (e.g. loan ID, amount).
   * Rendered as a compact definition list.
   */
  details?: ActionDetail[];
  /**
   * When set, the user must type this exact string into a confirmation input
   * before the confirm button becomes active. Use the loan ID for destructive
   * actions (liquidation, bulk-delete).
   */
  confirmationId?: string;
  /** Placeholder for the confirmation input. Defaults to "Type to confirm" */
  confirmationPlaceholder?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  destructiveAriaLabel,
  details,
  confirmationId,
  confirmationPlaceholder,
  onConfirm,
  onCancel,
}: Props) {
  const isDestructive = variant === "destructive";
  const [inputValue, setInputValue] = useState("");
  const inputId = useId();

  const requiresConfirmation = Boolean(confirmationId);
  const confirmationMatches = !requiresConfirmation || inputValue === confirmationId;

  function handleConfirm() {
    if (!confirmationMatches) return;
    setInputValue("");
    onConfirm();
  }

  function handleCancel() {
    setInputValue("");
    onCancel();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && confirmationMatches) {
      e.preventDefault();
      handleConfirm();
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleCancel}
      title={title}
      size="sm"
      role={isDestructive ? "alertdialog" : undefined}
      footer={
        <>
          <Button variant="ghost" onClick={handleCancel}>
            {cancelLabel}
          </Button>
          <Button
            variant={isDestructive ? "danger" : "secondary"}
            onClick={handleConfirm}
            disabled={!confirmationMatches}
            aria-label={
              isDestructive ? (destructiveAriaLabel ?? confirmLabel) : undefined
            }
            aria-disabled={!confirmationMatches || undefined}
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <p className="text-sm text-[color:var(--token-text-subtle)]">{message}</p>

        {/* Action details summary */}
        {details && details.length > 0 && (
          <dl className="rounded-lg border border-[color:var(--token-border)] bg-[color:var(--token-surface)] p-3 text-sm space-y-1">
            {details.map(({ label, value }) => (
              <div key={label} className="flex items-start gap-2">
                <dt className="text-[color:var(--token-text-muted)] w-32 shrink-0">{label}:</dt>
                <dd className="font-mono text-[color:var(--token-text)] break-all">{value}</dd>
              </div>
            ))}
          </dl>
        )}

        {/* Confirmation input — only shown when confirmationId is set */}
        {requiresConfirmation && (
          <div className="space-y-1.5">
            <label
              htmlFor={inputId}
              className="block text-sm font-medium text-[color:var(--token-text)]"
            >
              Type <code className="bg-[color:var(--token-surface)] px-1 rounded text-xs font-mono">{confirmationId}</code> to confirm
            </label>
            <input
              id={inputId}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={confirmationPlaceholder ?? "Type to confirm"}
              autoComplete="off"
              aria-describedby={`${inputId}-hint`}
              className={
                [
                  "w-full rounded-lg border px-3 py-2 text-sm font-mono",
                  "bg-[color:var(--token-surface-raised)] text-[color:var(--token-text)]",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--token-accent)] focus-visible:ring-offset-1",
                  confirmationMatches && inputValue
                    ? "border-[color:var(--token-success)]"
                    : "border-[color:var(--token-border)]",
                ].join(" ")
              }
            />
            <p
              id={`${inputId}-hint`}
              className="text-xs text-[color:var(--token-text-muted)]"
            >
              {isDestructive
                ? "This action cannot be undone."
                : "Confirm by typing the ID above."}
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
}
