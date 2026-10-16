import type { Meta, StoryObj } from '@storybook/react';
import ErrorBoundary from './ErrorBoundary';

/**
 * Component that intentionally throws to simulate a runtime error.
 * Used only in Storybook stories.
 */
function ErrorThrower({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) throw new Error('Simulated component error for Storybook');
  return (
    <div className="p-4 rounded-lg bg-green-50 text-green-700 border border-green-200">
      Component rendered successfully ✓
    </div>
  );
}

const meta: Meta<typeof ErrorBoundary> = {
  title: 'Components/ErrorBoundary',
  component: ErrorBoundary,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Catches unhandled React render errors and shows a user-friendly fallback UI with an illustration, reload button, and optional error tracker hook. Closes #1245.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof ErrorBoundary>;

/** Simulates an unhandled error — the boundary catches it and shows the fallback. */
export const WithError: Story = {
  render: () => (
    <ErrorBoundary section="Dashboard">
      <ErrorThrower shouldThrow />
    </ErrorBoundary>
  ),
  name: 'Error state (simulated throw)',
};

/** Normal render — children pass through unchanged. */
export const NoError: Story = {
  render: () => (
    <ErrorBoundary section="Dashboard">
      <ErrorThrower shouldThrow={false} />
    </ErrorBoundary>
  ),
  name: 'Normal render (no error)',
};

/** Uses onRetry to loop back to a previous step instead of reloading. */
export const WithRetry: Story = {
  render: () => (
    <ErrorBoundary
      section="Loan Wizard"
      onRetry={() => alert('onRetry called — navigate back!')}
      retryLabel="← Back to wizard"
    >
      <ErrorThrower shouldThrow />
    </ErrorBoundary>
  ),
  name: 'With custom retry action',
};

/** Demonstrates forwarding errors to an external tracker (Sentry, Datadog, etc.). */
export const WithErrorTracker: Story = {
  render: () => (
    <ErrorBoundary
      section="Payment"
      onError={(err) => console.log('[Tracker] Captured:', err.message)}
    >
      <ErrorThrower shouldThrow />
    </ErrorBoundary>
  ),
  name: 'With error tracker callback (onError)',
  parameters: {
    docs: {
      description: {
        story:
          'The `onError` prop receives `(error, info)` — forward to Sentry with `Sentry.captureException(err, { extra: info })`.',
      },
    },
  },
};

/** No section label provided — generic heading. */
export const NoSectionLabel: Story = {
  render: () => (
    <ErrorBoundary>
      <ErrorThrower shouldThrow />
    </ErrorBoundary>
  ),
  name: 'Without section label',
};
