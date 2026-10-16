import React from 'react';
import { render, screen } from '@testing-library/react';
import { AnimalIcon } from '../components/AnimalIcon';

describe('AnimalIcon', () => {
  const allTypes = ['cattle', 'goat', 'sheep', 'camel', 'other', 'buffalo', 'CATTLE'];

  test.each(allTypes)('renders an SVG without crashing for type=%s', (type) => {
    const { container } = render(<AnimalIcon type={type} />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('is aria-hidden when no aria-label is provided (decorative)', () => {
    const { container } = render(<AnimalIcon type="cattle" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.getAttribute('aria-hidden')).toBe('true');
    expect(wrapper.getAttribute('role')).toBeNull();
  });

  it('has role=img and aria-label when aria-label is provided', () => {
    render(<AnimalIcon type="cattle" aria-label="Cattle collateral" />);
    expect(screen.getByRole('img', { name: 'Cattle collateral' })).toBeTruthy();
  });

  it('falls back to the Other icon for an unknown type', () => {
    const { container } = render(<AnimalIcon type="unknown_animal" />);
    // Other icon has a "?" text element
    expect(container.querySelector('text')).toBeTruthy();
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('type matching is case-insensitive', () => {
    const { container: c1 } = render(<AnimalIcon type="CATTLE" />);
    const { container: c2 } = render(<AnimalIcon type="cattle" />);
    // Both should render the same SVG structure (no "?" text = not the "other" icon)
    expect(c1.querySelector('text')).toBeNull();
    expect(c2.querySelector('text')).toBeNull();
  });

  it('accepts a custom size and reflects it on the SVG', () => {
    const { container } = render(<AnimalIcon type="cattle" size={64} />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('64');
    expect(svg?.getAttribute('height')).toBe('64');
  });

  it('applies a custom className to the wrapper span', () => {
    const { container } = render(<AnimalIcon type="cattle" className="my-class" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('my-class');
  });
});
