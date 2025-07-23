// interfaces.ts
export interface RegisterFormData {
  email: string;
  password: string;
  phoneNumber: string;
  countryCode: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface User {
  email: string;
  phoneNumber?: string;
  countryCode?: string;
}

export interface CountryCode {
  code: string;
  country: string;
}

export interface StyledInputProps {
  $hasError?: boolean;
}
