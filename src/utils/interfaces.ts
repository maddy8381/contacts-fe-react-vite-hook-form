export interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
  mobileNumber: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  mobileNumber: string;
}

export interface IContact extends ContactFormData {
  _id: string;
}

export interface IUser {
  fullName: string;
  email: string;
  mobileNumber: string;
}
