/**
 * ConfirmDialog stories — #1243
 *
 * Covers: Submit Loan, Repay Loan, Force Liquidate (loan ID typing), and
 * the classic default/destructive variants.
 */
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";

const meta: Meta<typeof ConfirmDialog> = {
  title: "Components/ConfirmDialog",
  component: ConfirmDialog,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["default", "destructive"],
      description:
        "`default` uses the secondary (gold) confirm button. `destructive` uses danger (red) and sets `role=alertdialog`.",
    },
    open: { control: "boolean" },
    title: { control: "text" },
    message: { control: "text" },
    confirmLabel: { control: "text" },
    cancelLabel: { control: "text" },
    destructiveAriaLabel: { control: "text" },
    confirmationId: { control: "text" },
    confirmationPlaceholder: { control: "text" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Accessible confirmation dialog. Supports action details display and loan-ID confirmation typing for destructive actions. Closes #1243.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof ConfirmDialog>;

/* ── Default variant ── */
export const Default: Story = {
  args: {
    open: true,
    title: "Confirm action",
    message: "Are you sure you want to proceed with this action?",
    confirmLabel: "Confirm",
    cancelLabel: "Cancel",
    variant: "default",
    onConfirm: () => alert("Confirmed!"),
    onCancel: () => alert("Cancelled"),
  },
};

/* ── Submit Loan ── */
export const SubmitLoan: Story = {
  args: {
    open: true,
    title: "Submit Loan Request",
    message:
      "Review the details below. Once submitted, the request will be sent on-chain and cannot be cancelled.",
    confirmLabel: "Submit Loan",
    cancelLabel: "Go back",
    variant: "default",
    details: [
      { label: "Collateral ID", value: "col-042" },
      { label: "Loan Amount", value: "1,000 XLM" },
    ],
    onConfirm: () => alert("Loan submitted!"),
    onCancel: () => alert("Cancelled"),
  },
  name: "Submit Loan (with action details)",
  parameters: {
    docs: {
      description: {
        story:
          "Uses the `details` prop to show collateral ID and amount before the user confirms.",
      },
    },
  },
};

/* ── Repay Loan ── */
export const RepayLoan: Story = {
  args: {
    open: true,
    title: "Repay Loan",
    message:
      "You are about to make a repayment. This will reduce your outstanding balance and improve your health factor.",
    confirmLabel: "Repay",
    cancelLabel: "Cancel",
    variant: "default",
    details: [
      { label: "Loan ID", value: "loan-001" },
      { label: "Amount", value: "150.00 XLM" },
      { label: "Remaining after", value: "850.00 XLM" },
    ],
    onConfirm: () => alert("Repayment initiated"),
    onCancel: () => alert("Cancelled"),
  },
  name: "Repay Loan (with details)",
};

/* ── Force Liquidate — requires typing loan ID ── */
export const ForceLiquidate: Story = {
  args: {
    open: true,
    title: "Force Liquidate Loan",
    message:
      "This will permanently liquidate the loan and release the collateral. This action cannot be undone.",
    confirmLabel: "Liquidate",
    cancelLabel: "Cancel",
    variant: "destructive",
    destructiveAriaLabel: "Force liquidate this loan permanently",
    details: [
      { label: "Loan ID", value: "loan-001" },
      { label: "Borrower", value: "GAAZI4…WJH5" },
      { label: "Amount", value: "5,000 XLM" },
    ],
    confirmationId: "loan-001",
    confirmationPlaceholder: "Type loan ID to confirm",
    onConfirm: () => alert("Liquidated!"),
    onCancel: () => alert("Cancelled"),
  },
  name: "Force Liquidate (type loan ID to confirm)",
  parameters: {
    docs: {
      description: {
        story:
          "User must type the loan ID before the Liquidate button activates. Uses `role=alertdialog`.",
      },
    },
  },
};

/* ── Destructive (no typing required) ── */
export const Destructive: Story = {
  args: {
    open: true,
    title: "Delete loan",
    message:
      "This will permanently delete the loan. All associated collateral records will be released.",
    confirmLabel: "Delete loan",
    cancelLabel: "Cancel",
    variant: "destructive",
    destructiveAriaLabel: "Delete this loan permanently",
    onConfirm: () => alert("Deleted!"),
    onCancel: () => alert("Cancelled"),
  },
};

/* ── Interactive (controlled) ── */
export const Interactive: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="rounded-xl bg-brown-600 px-4 py-2 text-sm text-white font-semibold"
        >
          Open dialog
        </button>
        <ConfirmDialog
          {...args}
          open={open}
          onConfirm={() => {
            alert("Confirmed!");
            setOpen(false);
          }}
          onCancel={() => setOpen(false)}
        />
      </>
    );
  },
  args: {
    title: "Confirm action",
    message: "Are you sure you want to proceed?",
    confirmLabel: "Confirm",
    cancelLabel: "Cancel",
    variant: "default",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Click the trigger to open. Use the `variant` and `confirmationId` controls to test different states.",
      },
    },
  },
};
