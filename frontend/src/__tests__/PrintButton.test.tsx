import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PrintButton from '../components/PrintButton';

describe('PrintButton', () => {
  it('renders a button with accessible label', () => {
    render(<PrintButton />);
    const btn = screen.getByRole('button', { name: /print or save/i });
    expect(btn).toBeTruthy();
  });

  it('calls window.print() when clicked', () => {
    const printSpy = jest.spyOn(window, 'print').mockImplementation(() => {});
    render(<PrintButton />);
    fireEvent.click(screen.getByRole('button', { name: /print or save/i }));
    expect(printSpy).toHaveBeenCalledTimes(1);
    printSpy.mockRestore();
  });

  it('has print:hidden class so it is invisible in print output', () => {
    render(<PrintButton />);
    const btn = screen.getByRole('button', { name: /print or save/i });
    expect(btn.className).toContain('print:hidden');
  });

  it('includes the printer SVG icon with aria-hidden', () => {
    const { container } = render(<PrintButton />);
    const svg = container.querySelector('svg[aria-hidden="true"]');
    expect(svg).toBeTruthy();
  });

  it('applies an extra className when provided', () => {
    render(<PrintButton className="my-extra-class" />);
    const btn = screen.getByRole('button', { name: /print or save/i });
    expect(btn.className).toContain('my-extra-class');
  });
});
