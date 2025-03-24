/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable react-dom/no-missing-button-type */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'; // adjust path if needed
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';

describe('Card Component', () => {
  it('renders full card structure', () => {
    render(
      <Card data-testid="card">
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
          <CardDescription>Test description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Main content</p>
        </CardContent>
        <CardFooter>
          <button>Action</button>
        </CardFooter>
      </Card>,
    );

    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('Main content')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('applies custom class to Card', () => {
    const { container } = render(<Card className="custom-card" />);

    expect(container.firstChild).toHaveClass('custom-card');
  });

  it('applies custom class to CardContent', () => {
    const { container } = render(<CardContent className="custom-content" />);

    expect(container.firstChild).toHaveClass('custom-content');
  });
});
