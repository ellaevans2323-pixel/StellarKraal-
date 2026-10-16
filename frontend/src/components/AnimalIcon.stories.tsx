import type { Meta, StoryObj } from '@storybook/react';
import { AnimalIcon } from './AnimalIcon';

const meta: Meta<typeof AnimalIcon> = {
  title: 'Components/AnimalIcon',
  component: AnimalIcon,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['cattle', 'goat', 'sheep', 'camel', 'other', 'buffalo'],
      description: 'Animal type. Unknown types render the generic "other" icon.',
    },
    size: {
      control: { type: 'range', min: 24, max: 80, step: 4 },
      description: 'Size in px. Defaults to 40.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'SVG icons for livestock collateral types. Icons use CSS design tokens so they flip colours in dark mode. Decorative by default (aria-hidden). Closes #1249.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof AnimalIcon>;

export const Cattle: Story = { args: { type: 'cattle', size: 40 } };
export const Goat: Story = { args: { type: 'goat', size: 40 } };
export const Sheep: Story = { args: { type: 'sheep', size: 40 } };
export const Camel: Story = { args: { type: 'camel', size: 40 } };
export const Other: Story = { args: { type: 'other', size: 40 } };
export const UnknownType: Story = {
  args: { type: 'buffalo', size: 40 },
  name: 'Unknown type (falls back to Other)',
};

export const AllIcons: Story = {
  render: () => (
    <div className="flex gap-8 items-end flex-wrap p-4">
      {['cattle', 'goat', 'sheep', 'camel', 'other'].map((type) => (
        <div key={type} className="flex flex-col items-center gap-2">
          <AnimalIcon type={type} size={48} />
          <span className="text-xs capitalize text-brown-600">{type}</span>
        </div>
      ))}
    </div>
  ),
  name: 'All icons at a glance',
};

export const WithAccessibleLabel: Story = {
  args: { type: 'cattle', size: 40, 'aria-label': 'Cattle collateral' },
  name: 'With aria-label (screen-reader accessible)',
};
