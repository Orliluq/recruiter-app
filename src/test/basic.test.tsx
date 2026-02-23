import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

// Test básico para verificar que el setup funciona
describe('Basic Setup', () => {
  test('vitest setup works', () => {
    expect(true).toBe(true);
  });

  test('rendering works', () => {
    const TestComponent = () => <div>Test</div>;
    render(<TestComponent />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
