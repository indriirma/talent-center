import { fireEvent, render, screen } from '@testing-library/react';
import SignInModalForm from '../SignInModalForm';

describe('SignInModalForm', () => {
  it('renders sign-in modal with form', () => {
    const signInOpen = true;
    const signInClose = jest.fn();

    render(<SignInModalForm signInOpen={signInOpen} signInClose={signInClose} />);

    // Fill in the form fields
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const signInButton = screen.getByRole('button', { name: 'Sign In' });

    fireEvent.change(emailInput, { target: { value: 'kminchellgmail.com' } });
    fireEvent.change(passwordInput, { target: { value: '0lelplR' } });

    // Trigger form submission
    fireEvent.click(signInButton);

    expect(emailInput.value.includes('@')).toBe(true);
    expect(emailInput.value).not.toBe('');
    expect(passwordInput.value).not.toBe('');
  });

  it('displays validation error messages on invalid input', async () => {
    render(<SignInModalForm signInOpen={true} signInClose={() => {}} />);

    const signInButton = screen.getByRole('button', { name: 'Sign In' });

    // Submit the form without filling in any fields
    fireEvent.click(signInButton);

    // Assert that validation error messages are displayed for both fields
    expect(await screen.findByText('Email is required')).toBeInTheDocument();
    expect(await screen.findByText('Password is required')).toBeInTheDocument();
  });
});
