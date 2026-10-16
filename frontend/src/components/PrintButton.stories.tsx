import type { Meta, StoryObj } from '@storybook/react';
import PrintButton from './PrintButton';

const meta: Meta<typeof PrintButton> = {
  title: 'Components/PrintButton',
  component: PrintButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Triggers the browser print dialog (or Save as PDF). Hidden automatically in print output via `print:hidden`. Closes #1247.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof PrintButton>;

export const Default: Story = {};

export const WithCustomClass: Story = {
  args: { className: 'text-base' },
  name: 'With custom className',
};
