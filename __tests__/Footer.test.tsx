import Footer from '@/components/Landing/Footer';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mocking the Link component from next/link to simplify rendering
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children }: any) => <a href={href}>{children}</a>,
}));

describe('Footer Component', () => {
  it('renders the footer links under Product, Resources, and Company sections', () => {
    render(<Footer />);

    // Test for Product section links
    const productLinks = ['Features', 'Pricing', 'Testimonials', 'FAQ'];
    productLinks.forEach((link) => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });

    // Test for Resources section links
    const resourceLinks = ['Blog', 'Help Center', 'Guides', 'API Docs'];
    resourceLinks.forEach((link) => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });

    // Test for Company section links
    const companyLinks = ['About Us', 'Careers', 'Legal', 'Contact'];
    companyLinks.forEach((link) => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  it('renders the current year in the copyright section', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();

    expect(screen.getByText(new RegExp(`© ${currentYear} ExpenseVision`, 'i'))).toBeInTheDocument();
  });

  it('renders social media links correctly', () => {
    render(<Footer />);

    // Check if the Twitter link is rendered
    const twitterLink = screen.getByRole('link', { name: /Twitter/i });

    expect(twitterLink).toHaveAttribute('href', '#'); // Modify as per your real href

    // Check if the LinkedIn link is rendered
    const linkedinLink = screen.getByRole('link', { name: /LinkedIn/i });

    expect(linkedinLink).toHaveAttribute('href', '#'); // Modify as per your real href

    // Check if the Instagram link is rendered
    const instagramLink = screen.getByRole('link', { name: /Instagram/i });

    expect(instagramLink).toHaveAttribute('href', '#'); // Modify as per your real href
  });
});
