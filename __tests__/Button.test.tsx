/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button } from '@/components/ui/button';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Button component', () => {
  it('renders with default variant and size', () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole('button', { name: 'Click Me' });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary'); // from default variant
    expect(button).toHaveClass('h-9'); // from default size
  });

  it('renders with outline variant and large size', () => {
    render(
      <Button variant="outline" size="lg">
        Outline Button
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Outline Button' });

    expect(button).toHaveClass('border');
    expect(button).toHaveClass('h-10');
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    const button = screen.getByRole('button', { name: 'Click' });

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when `disabled` prop is passed', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button', { name: 'Disabled' });

    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:pointer-events-none');
  });

  it('renders as a child when `asChild` is true', () => {
    render(
      <Button asChild>
        <a href="#">Link Button</a>
      </Button>,
    );
    const link = screen.getByRole('link', { name: 'Link Button' });

    expect(link).toBeInTheDocument();
    expect(link.tagName.toLowerCase()).toBe('a');
  });
});
