import RootLayout from '@/app/layout';
import { metadata } from '@/app/utils/metadata';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// 🛠 Mock Next.js fonts to prevent undefined variables
jest.mock('next/font/google', () => ({
  Geist: () => ({ variable: '--font-geist-sans' }),
  Geist_Mono: () => ({ variable: '--font-geist-mono' }),
}));

// 🛠 Mock Providers to prevent unnecessary context loading in tests
jest.mock('@/components/general/Providers', () => ({ children }: any) => (
  <div data-testid="providers">{children}</div>
));

// 🛠 Mock Toaster to avoid external UI effects
jest.mock('@/components/ui/sonner', () => ({
  Toaster: () => <div data-testid="toaster" />,
}));

// 🛠 Mock Vercel Analytics
jest.mock('@vercel/analytics/next', () => ({
  Analytics: () => <div data-testid="vercel-analytics" />,
}));

describe('RootLayout Component', () => {
  it('renders the layout correctly with children', () => {
    render(
      <RootLayout>
        <div data-testid="test-children">Test Content</div>
      </RootLayout>,
    );

    // ✅ Ensure global providers wrap the app
    expect(screen.getByTestId('providers')).toBeInTheDocument();

    // ✅ Ensure child components are correctly rendered
    expect(screen.getByTestId('test-children')).toBeInTheDocument();

    // ✅ Ensure Toaster (notifications) is rendered
    expect(screen.getByTestId('toaster')).toBeInTheDocument();

    // ✅ Ensure Analytics component is loaded
    expect(screen.getByTestId('vercel-analytics')).toBeInTheDocument();
  });

  it('includes metadata link for canonical URL', () => {
    render(<RootLayout><div /></RootLayout>);

    const linkElement = document.querySelector('link[rel=\'canonical\']');

    expect(linkElement).toHaveAttribute('href', metadata.openGraph?.url as string);
  });

  it('renders JSON-LD script for SEO', () => {
    render(<RootLayout><div /></RootLayout>);

    const scriptElement = document.getElementById('json-ld');

    expect(scriptElement).toBeInTheDocument();

    // ✅ Validate JSON-LD schema metadata
    const jsonData = JSON.parse(scriptElement!.innerHTML);

    expect(jsonData['@context']).toBe('https://schema.org');
    expect(jsonData['@type']).toBe('SoftwareApplication');
    expect(jsonData.name).toBe('ExpenseVision');
    expect(jsonData.offers.price).toBe('0');
    expect(jsonData.aggregateRating.ratingValue).toBe('4.8');
  });

  it('applies font variables in body className', () => {
    render(<RootLayout><div /></RootLayout>);

    const bodyElement = document.querySelector('body');

    expect(bodyElement?.className).toContain('--font-geist-sans');
    expect(bodyElement?.className).toContain('--font-geist-mono');
    expect(bodyElement).toHaveClass('antialiased');
  });
});
