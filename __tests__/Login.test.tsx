// __tests__/login.test.tsx

import Login from '@/app/login/page';
import { render, screen } from '@testing-library/react';

// Mock auth and signIn
jest.mock('@/app/utils/auth', () => ({
  auth: jest.fn(),
  signIn: jest.fn(),
}));

// Mock child components
jest.mock('@/components/forms/LoginForm', () => () => (
  <div data-testid="login-form">LoginForm Component</div>
));

describe('/login page', () => {
  it('renders logo, heading, and login form', async () => {
    render(<Login />);

    // Check if logo is rendered
    const logo = screen.getByAltText('Logo');

    expect(logo).toBeInTheDocument();

    // Check heading text
    expect(screen.getByText(/ExpenseVision/i)).toBeInTheDocument();
    expect(screen.getByText(/MUN/i)).toBeInTheDocument();

    // Check if LoginForm is rendered
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
  });
});
