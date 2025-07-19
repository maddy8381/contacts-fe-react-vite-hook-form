// constants.ts
import type { CountryCode } from './interfaces';

export const COUNTRY_CODES: CountryCode[] = [
  { code: '+1', country: 'US/Canada' },
  { code: '+44', country: 'UK' },
  { code: '+91', country: 'India' },
  { code: '+81', country: 'Japan' },
  { code: '+49', country: 'Germany' },
  { code: '+33', country: 'France' },
  { code: '+39', country: 'Italy' },
  { code: '+61', country: 'Australia' },
  { code: '+86', country: 'China' },
  { code: '+82', country: 'South Korea' },
];

export const VALIDATION_RULES = {
  EMAIL: {
    REQUIRED: 'Email is required',
    PATTERN: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address'
    }
  },
  PASSWORD: {
    REQUIRED: 'Password is required',
    MIN_LENGTH_LOGIN: {
      value: 6,
      message: 'Password must be at least 6 characters'
    },
    MIN_LENGTH_REGISTER: {
      value: 8,
      message: 'Password must be at least 8 characters'
    },
    PATTERN: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    }
  },
  PHONE: {
    REQUIRED: 'Phone number is required',
    PATTERN: {
      value: /^[0-9]{10}$/,
      message: 'Phone number must be 10 digits'
    }
  },
  COUNTRY_CODE: {
    REQUIRED: 'Country code is required'
  }
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard'
};

export const MESSAGES = {
  LOGIN_SUCCESS: 'Login successful! Redirecting to dashboard...',
  REGISTRATION_SUCCESS: 'Registration successful! Redirecting to dashboard...',
  LOGOUT_SUCCESS: 'Logged out successfully'
};