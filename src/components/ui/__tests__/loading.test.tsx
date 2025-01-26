import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Loading, PageLoading } from '../loading';

describe('Loading Components', () => {
  it('renders Loading component with default props', () => {
    render(<Loading />);
    const loader = screen.getByRole('img', { hidden: true }); // Lucide icons have role="img"
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveClass('animate-spin');
  });

  it('renders Loading component with custom size', () => {
    render(<Loading size={48} />);
    const loader = screen.getByRole('img', { hidden: true });
    expect(loader).toBeInTheDocument();
  });

  it('renders PageLoading component', () => {
    render(<PageLoading />);
    const loader = screen.getByRole('img', { hidden: true });
    expect(loader).toBeInTheDocument();
    expect(loader.parentElement?.parentElement).toHaveClass('min-h-screen');
  });
});
