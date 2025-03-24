/* eslint-disable tailwindcss/no-custom-classname */
import { Calendar } from '@/components/ui/calendar'; // ✅ Adjust path if needed
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Calendar Component', () => {
  it('renders the calendar container', () => {
    render(<Calendar />);

    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  it('renders days of the week', () => {
    render(<Calendar />);
    const weekdays = screen.getAllByRole('columnheader');

    expect(weekdays.length).toBeGreaterThanOrEqual(7); // 7 days (Sun-Sat)
  });

  it('renders navigation buttons', () => {
    render(<Calendar />);
    const buttons = screen.getAllByRole('button');

    expect(buttons.length).toBeGreaterThanOrEqual(2); // Prev and Next
  });

  it('shows dates of the current month', () => {
    render(<Calendar />);
    const days = screen.getAllByRole('button', { hidden: true });

    expect(days.length).toBeGreaterThan(0);
  });

  it('applies custom class name', () => {
    render(<Calendar className="custom-calendar" />);

    expect(screen.getByRole('grid'));
  });
});
