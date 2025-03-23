import HeroSection from '@/components/Landing/HeroSection';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock next/image to avoid SSR/Image optimization behavior in tests
jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element
  default: (props: any) => <img {...props} alt={props.alt || 'mocked image'} />,
}));

//  Mock AnimateInView to render children directly
jest.mock('@/components/ui/animation', () => ({
  AnimateInView: ({ children }: any) => <>{children}</>,
}));

// 🧪 Mock next/link to render anchor tags
jest.mock('next/link', () => {
  return ({ href, children }: any) => <a href={href}>{children}</a>;
});

describe('HeroSection Component', () => {
  it('renders heading, subheading, and tagline', () => {
    render(<HeroSection />);

    expect(screen.getByText(/Simplify Your Finances/i)).toBeInTheDocument();
    expect(screen.getByText(/Track Expenses/i)).toBeInTheDocument();
    expect(screen.getByText(/Effortlessly/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Gain clarity on your spending patterns/i),
    ).toBeInTheDocument();
  });

  it('renders both "Get Started" and "Learn More" buttons', () => {
    render(<HeroSection />);

    expect(screen.getByRole('link', { name: /Get Started/i })).toHaveAttribute(
      'href',
      '/login',
    );

    expect(screen.getByRole('button', { name: /Learn More/i })).toBeInTheDocument();
  });

  it('renders the dashboard image with correct alt text', () => {
    render(<HeroSection />);

    expect(
      screen.getByAltText('ExpenseVision Dashboard'),
    ).toBeInTheDocument();
  });

  it('falls back to placeholder image if original fails to load', () => {
    render(<HeroSection />);

    const image = screen.getByAltText('ExpenseVision Dashboard') as HTMLImageElement;

    fireEvent.error(image);

    expect(image.src).toBe(
      'https://placehold.co/1200x675/e4eeff/0066ff.png?text=ExpenseVision+Dashboard',
    );
  });
});
