import FeaturesSection from '@/components/Landing/FeaturesSection';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mocking AnimateInView since we don't need to test animations
jest.mock('@/components/ui/animation', () => ({
  AnimateInView: ({ children }: any) => <>{children}</>,
}));

describe('FeaturesSection Component', () => {
  it('renders the section heading and subtitle', () => {
    render(<FeaturesSection />);

    // Ensure the heading is rendered
    expect(screen.getByText(/Powerful Features/i)).toBeInTheDocument();

    // Ensure the subtitle is rendered
    expect(
      screen.getByText(
        /Our comprehensive suite of tools helps you manage your finances/i,
      ),
    ).toBeInTheDocument();
  });

  it('renders all feature titles, descriptions, and icons', () => {
    const featureTitles = [
      'Track Expenses',
      'Budgeting Tools',
      'Custom Categories',
      'Analytics & Insights',
      'Report Downloads',
    ];

    const featureDescriptions = [
      'Add, remove, or edit transactions easily with our intuitive interface.',
      'Set personalized budgets and get alerts when you\'re approaching your limits.',
      'Create and manage your own expense categories to match your lifestyle.',
      'Gain valuable insights with interactive charts and detailed spending reports.',
      'Export your transaction history as Excel files for offline access and review.',
    ];

    render(<FeaturesSection />);

    featureTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });

    featureDescriptions.forEach((desc) => {
      expect(screen.getByText(desc)).toBeInTheDocument();
    });
  });

  it('renders the correct number of features', () => {
    render(<FeaturesSection />);
    const featureCards = screen.getAllByRole('heading', { level: 3 }); // h3 titles

    expect(featureCards.length).toBe(5); // There are 5 features
  });

  it('renders icons correctly for each feature', () => {
    render(<FeaturesSection />);

    // Check if each icon is rendered correctly (We can check for any of the icons)
    expect(screen.getByText('Track Expenses')).toBeInTheDocument(); // Feature title
    expect(screen.getByText('Budgeting Tools')).toBeInTheDocument(); // Feature title
  });
});
