import RootLayout from '@/app/layout';
import { render, screen } from '@testing-library/react';
import React from 'react';

jest.mock('@vercel/analytics/next', () => ({
  Analytics: () => <div data-testid="analytics" />,
}));

jest.mock('@vercel/speed-insights/next', () => ({
  SpeedInsights: () => <div data-testid="speed-insights" />,
}));

jest.mock('@/components/general/Providers', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="providers">{children}</div>
  ),
}));

jest.mock('@/components/ui/sonner', () => ({
  Toaster: ({ richColors, closeButton }: any) => (
    <div data-testid="toaster">
      Toaster - richColors:
      {' '}
      {richColors ? 'true' : 'false'}
      , closeButton:
      {' '}
      {closeButton ? 'true' : 'false'}
    </div>
  ),
}));

describe('RootLayout', () => {
  it('renders layout with children and providers', () => {
    render(
      <RootLayout>
        <div data-testid="child-content">Test content</div>
      </RootLayout>,
    );

    // Assert children rendered
    expect(screen.getByTestId('child-content')).toBeInTheDocument();

    // Providers
    expect(screen.getByTestId('providers')).toBeInTheDocument();

    // Toaster
    expect(screen.getByTestId('toaster')).toHaveTextContent('Toaster');

    // Analytics
    expect(screen.getByTestId('analytics')).toBeInTheDocument();

    // SpeedInsights
    expect(screen.getByTestId('speed-insights')).toBeInTheDocument();
  });
});
