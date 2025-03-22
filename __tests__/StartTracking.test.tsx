import CTASection from '@/components/Landing/CTASection';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mocking AnimateInView to simplify rendering
jest.mock('@/components/ui/animation', () => ({
  AnimateInView: ({ children }: any) => <>{children}</>,
}));

describe('CTASection Component', () => {
  it('renders the section heading and subtitle', () => {
    render(<CTASection />);

    // Check if the section heading "Start Tracking Your Expenses Today" is rendered
    expect(screen.getByText(/Start Tracking/i)).toBeInTheDocument();
    expect(screen.getByText(/Your Expenses Today/i)).toBeInTheDocument();

    // Check if the subtitle is rendered
    expect(
      screen.getByText(/Join thousands of users who have transformed their financial habits/i),
    ).toBeInTheDocument();
  });

  it('renders the email input and Get Started button', () => {
    render(<CTASection />);

    // Check if the email input field is rendered
    expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();

    // Check if the "Get Started" button is rendered
    const getStartedButton = screen.getByRole('button', { name: /Get Started/i });

    expect(getStartedButton).toBeInTheDocument();

    // Simulate form submission
    fireEvent.click(getStartedButton);
    // Verify the button click (you can test form submission if needed)
  });

  it('renders the list of benefits', () => {
    render(<CTASection />);

    // Check if all benefits are rendered
    const benefits = [
      'Free 14-day trial, no credit card required',
      'Cancel anytime, no questions asked',
      'Unlimited expense tracking and categorization',
      'Secure cloud storage for your financial data',
    ];

    benefits.forEach((benefit) => {
      expect(screen.getByText(benefit)).toBeInTheDocument();
    });
  });

  it('renders the background image with statistics', () => {
    render(<CTASection />);

    // Check if the background image is rendered (you can targe
  });
});
