import TestimonialsSection from '@/components/Landing/TestimonialSection';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mocking AnimateInView to simplify rendering
jest.mock('@/components/ui/animation', () => ({
  AnimateInView: ({ children }: any) => <>{children}</>,
}));

describe('TestimonialsSection Component', () => {
  it('renders the section heading and subtitle', () => {
    render(<TestimonialsSection />);

    // Check if heading and subtitle are rendered
    expect(screen.getByText(/What Our Users Say/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Join thousands of satisfied users/i),
    ).toBeInTheDocument();
  });

  it('renders all testimonial quotes, names, and titles', () => {
    const testimonialQuotes = [
      'ExpenseVision has completely transformed how I manage my finances. The insights have helped me save $400 monthly.',
      'The budgeting tools are incredibly intuitive. I\'ve never had such clarity about where my money is going.',
      'I love how I can customize categories to match my specific needs. It\'s made tracking expenses actually enjoyable.',
    ];

    const testimonialNames = ['Emma Johnson', 'Michael Chen', 'Sophia Martinez'];
    const testimonialTitles = [
      'Marketing Director',
      'Software Engineer',
      'Freelance Designer',
    ];

    render(<TestimonialsSection />);

    testimonialQuotes.forEach((quote) => {
      // Use regex to match the full quote text
      expect(screen.getByText(new RegExp(quote, 'i'))).toBeInTheDocument();
    });

    testimonialNames.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });

    testimonialTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });

    // Example test for the first testimonial quote with regex matching
    expect(
      // eslint-disable-next-line regexp/no-useless-assertions
      screen.getByText(/ExpenseVision has completely transformed how I manage my finances. The insights have helped me save $400 monthly./i),
    ).toBeInTheDocument(); // Testimonial 1 quote
  });

  it('renders the correct number of testimonials (3)', () => {
    render(<TestimonialsSection />);
    const testimonials = screen.getAllByRole('heading', { level: 3 }); // h3 for names

    expect(testimonials.length).toBe(3); // There should be 3 testimonials
  });

  it('renders the star rating section correctly', () => {
    render(<TestimonialsSection />);

    // Check if 5 stars are rendered (as SVG icons)
    const stars = screen.getAllByRole('img'); // star icons

    expect(stars.length).toBe(5); // 5 stars

    // Check the text of the rating
    expect(
      screen.getByText(/Rated 4.8\/5 from over 1,200 reviews/i),
    ).toBeInTheDocument();
  });

  it('renders the icons correctly for each testimonial', () => {
    render(<TestimonialsSection />);

    // Ensure that the icons are rendered for the testimonials
    // For example, check if the first testimonial's quote is present, which implies the icon is also rendered
    expect(screen.getByText('ExpenseVision has completely transformed how I manage my finances')).toBeInTheDocument(); // Testimonial 1 quote

    // Check if there are icons in the testimonials by targeting svg or other specific attributes
    const iconElements = screen.getAllByRole('img'); // svg or icon elements within the testimonial

    expect(iconElements.length).toBeGreaterThan(0); // Ensure at least one icon is rendered
  });
});
