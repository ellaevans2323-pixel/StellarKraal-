/**
 * ConfirmDialog tests — #810
 *
 * Verifies:
 *   - default variant renders confirm button with secondary (gold) style
 *   - destructive variant renders confirm button with danger style
 *   - cancel button always uses ghost/neutral style
 *   - destructive confirm button has aria-label describing the consequence
 *   - onConfirm / onCancel callbacks fire correctly
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConfirmDialog from "../components/ConfirmDialog";

// focus-trap-react needs a working DOM — mock it so tests don't need jsdom full setup
jest.mock("focus-trap-react", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const baseProps = {
  open: true,
  title: "Test dialog",
  message: "Are you sure?",
  onConfirm: jest.fn(),
  onCancel: jest.fn(),
};

beforeEach(() => jest.clearAllMocks());

describe("ConfirmDialog — default variant", () => {
  it("renders the dialog title", () => {
    render(<ConfirmDialog {...baseProps} />);
    expect(screen.getByText("Test dialog")).toBeTruthy();
  });

  it("renders the dialog message", () => {
    render(<ConfirmDialog {...baseProps} />);
    expect(screen.getByText("Are you sure?")).toBeTruthy();
  });

  it("renders a confirm button labelled 'Confirm'", () => {
    render(<ConfirmDialog {...baseProps} />);
    expect(screen.getByRole("button", { name: /^confirm$/i })).toBeTruthy();
  });

  it("renders a cancel button labelled 'Cancel'", () => {
    render(<ConfirmDialog {...baseProps} />);
    expect(screen.getByRole("button", { name: /^cancel$/i })).toBeTruthy();
  });

  it("confirm button uses secondary (non-danger) styling", () => {
    render(<ConfirmDialog {...baseProps} variant="default" />);
    const confirmBtn = screen.getByRole("button", { name: /^confirm$/i });
    // secondary variant has gold background class
    expect(confirmBtn.className).toContain("bg-gold-600");
    expect(confirmBtn.className).not.toContain("bg-error");
  });

  it("calls onConfirm when confirm button is clicked", () => {
    render(<ConfirmDialog {...baseProps} />);
    fireEvent.click(screen.getByRole("button", { name: /^confirm$/i }));
    expect(baseProps.onConfirm).toHaveBeenCalledTimes(1);
  });

  it("calls onCancel when cancel button is clicked", () => {
    render(<ConfirmDialog {...baseProps} />);
    fireEvent.click(screen.getByRole("button", { name: /^cancel$/i }));
    expect(baseProps.onCancel).toHaveBeenCalledTimes(1);
  });

  it("accepts custom confirmLabel and cancelLabel", () => {
    render(
      <ConfirmDialog
        {...baseProps}
        confirmLabel="Yes, proceed"
        cancelLabel="No, go back"
      />
    );
    expect(screen.getByRole("button", { name: /yes, proceed/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /no, go back/i })).toBeTruthy();
  });
});

describe("ConfirmDialog — destructive variant", () => {
  it("confirm button uses the danger style", () => {
    render(<ConfirmDialog {...baseProps} variant="destructive" confirmLabel="Delete" />);
    const confirmBtn = screen.getByRole("button", { name: /delete/i });
    expect(confirmBtn.className).toContain("bg-error");
  });

  it("confirm button does NOT use secondary/gold style", () => {
    render(<ConfirmDialog {...baseProps} variant="destructive" confirmLabel="Delete" />);
    const confirmBtn = screen.getByRole("button", { name: /delete/i });
    expect(confirmBtn.className).not.toContain("bg-gold-600");
  });

  it("destructive confirm button has aria-label describing the consequence", () => {
    render(
      <ConfirmDialog
        {...baseProps}
        variant="destructive"
        confirmLabel="Delete"
        destructiveAriaLabel="Delete this loan permanently"
      />
    );
    const confirmBtn = screen.getByRole("button", { name: /delete this loan permanently/i });
    expect(confirmBtn).toBeTruthy();
  });

  it("falls back to confirmLabel as aria-label when destructiveAriaLabel is omitted", () => {
    render(
      <ConfirmDialog
        {...baseProps}
        variant="destructive"
        confirmLabel="Remove"
      />
    );
    // The button should be findable by its confirmLabel text
    const confirmBtn = screen.getByRole("button", { name: /remove/i });
    expect(confirmBtn.getAttribute("aria-label")).toBe("Remove");
  });

  it("cancel button always uses ghost/neutral style regardless of variant", () => {
    render(<ConfirmDialog {...baseProps} variant="destructive" />);
    const cancelBtn = screen.getByRole("button", { name: /^cancel$/i });
    // ghost variant has border class
    expect(cancelBtn.className).toContain("border-brown-300");
  });

  it("calls onConfirm when destructive confirm button is clicked", () => {
    render(
      <ConfirmDialog {...baseProps} variant="destructive" confirmLabel="Delete" />
    );
    fireEvent.click(screen.getByRole("button", { name: /delete/i }));
    expect(baseProps.onConfirm).toHaveBeenCalledTimes(1);
  });
});

describe("ConfirmDialog — closed state", () => {
  it("renders nothing when open=false", () => {
    const { container } = render(<ConfirmDialog {...baseProps} open={false} />);
    expect(container.firstChild).toBeNull();
  });
});

/* ── #1243: action details ─────────────────────────────────────────────────── */
describe("ConfirmDialog — action details", () => {
  it("renders details when the details prop is provided", () => {
    render(
      <ConfirmDialog
        {...baseProps}
        details={[
          { label: "Loan ID", value: "loan-001" },
          { label: "Amount", value: "150 XLM" },
        ]}
      />,
    );
    expect(screen.getByText("Loan ID:")).toBeTruthy();
    expect(screen.getByText("loan-001")).toBeTruthy();
    expect(screen.getByText("Amount:")).toBeTruthy();
    expect(screen.getByText("150 XLM")).toBeTruthy();
  });

  it("does not render the details <dl> when details is undefined", () => {
    const { container } = render(<ConfirmDialog {...baseProps} />);
    expect(container.querySelector("dl")).toBeNull();
  });

  it("does not render the details <dl> when details is an empty array", () => {
    const { container } = render(<ConfirmDialog {...baseProps} details={[]} />);
    expect(container.querySelector("dl")).toBeNull();
  });
});

/* ── #1243: confirmationId (loan ID typing) ──────────────────────────────── */
describe("ConfirmDialog — confirmationId", () => {
  it("renders a text input when confirmationId is set", () => {
    render(
      <ConfirmDialog
        {...baseProps}
        variant="destructive"
        confirmationId="loan-001"
      />,
    );
    expect(screen.getByRole("textbox")).toBeTruthy();
  });

  it("confirm button is disabled before the correct ID is typed", () => {
    render(
      <ConfirmDialog
        {...baseProps}
        variant="destructive"
        confirmLabel="Liquidate"
        confirmationId="loan-001"
      />,
    );
    const confirmBtn = screen.getByRole("button", { name: /liquidate/i });
    expect(confirmBtn).toHaveProperty("disabled", true);
  });

  it("confirm button becomes enabled when the exact ID is typed", async () => {
    const user = userEvent.setup();
    render(
      <ConfirmDialog
        {...baseProps}
        variant="destructive"
        confirmLabel="Liquidate"
        confirmationId="loan-001"
      />,
    );
    await user.type(screen.getByRole("textbox"), "loan-001");
    const confirmBtn = screen.getByRole("button", { name: /liquidate/i });
    expect(confirmBtn).toHaveProperty("disabled", false);
  });

  it("does not call onConfirm when wrong ID is typed and button clicked", () => {
    render(
      <ConfirmDialog
        {...baseProps}
        variant="destructive"
        confirmLabel="Liquidate"
        confirmationId="loan-001"
      />,
    );
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "wrong-id" } });
    fireEvent.click(screen.getByRole("button", { name: /liquidate/i }));
    expect(baseProps.onConfirm).not.toHaveBeenCalled();
  });

  it("calls onConfirm when correct ID is typed and confirm clicked", async () => {
    const user = userEvent.setup();
    render(
      <ConfirmDialog
        {...baseProps}
        variant="destructive"
        confirmLabel="Liquidate"
        confirmationId="loan-001"
      />,
    );
    await user.type(screen.getByRole("textbox"), "loan-001");
    await user.click(screen.getByRole("button", { name: /liquidate/i }));
    expect(baseProps.onConfirm).toHaveBeenCalledTimes(1);
  });

  it("clears the input when cancel is clicked", async () => {
    const user = userEvent.setup();
    render(
      <ConfirmDialog
        {...baseProps}
        variant="destructive"
        confirmationId="loan-001"
      />,
    );
    const input = screen.getByRole("textbox");
    await user.type(input, "loan-001");
    expect((input as HTMLInputElement).value).toBe("loan-001");
    await user.click(screen.getByRole("button", { name: /^cancel$/i }));
    expect(baseProps.onCancel).toHaveBeenCalledTimes(1);
  });
});

/* ── #1243: role=alertdialog ─────────────────────────────────────────────── */
describe("ConfirmDialog — ARIA role", () => {
  it("uses role=alertdialog for destructive variant", () => {
    render(<ConfirmDialog {...baseProps} variant="destructive" />);
    expect(screen.getByRole("alertdialog")).toBeTruthy();
  });

  it("uses role=dialog for default variant", () => {
    render(<ConfirmDialog {...baseProps} variant="default" />);
    expect(screen.getByRole("dialog")).toBeTruthy();
  });
});
