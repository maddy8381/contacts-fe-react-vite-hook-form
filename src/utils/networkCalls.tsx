import axios from 'axios';
import type {
  ContactFormData,
  LoginFormData,
  SignupFormData
} from './interfaces';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const newSignUpRequest = async (payload: SignupFormData) => {
  const response = await axios.post(`${API_BASE_URL}/auth/signup`, payload);
  return response.data;
};

export const newSignInRequest = async (payload: LoginFormData) => {
  const response = await axios.post(`${API_BASE_URL}/auth/signin`, payload);
  return response.data;
};

export const fetchUserDetails = async (accessToken: string | null) => {
  const response = await axios.get(`${API_BASE_URL}/dashboard`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return response.data;
};

export const fetchContactList = async (accessToken: string | null) => {
  const response = await axios.get(`${API_BASE_URL}/contacts`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return response.data;
};

export const addContact = async (
  accessToken: string | null,
  payload: ContactFormData
) => {
  const response = await axios.post(`${API_BASE_URL}/contacts`, payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};

export const deleteContact = async (
  accessToken: string | null,
  contactId: string
) => {
  const response = await axios.delete(`${API_BASE_URL}/contacts/${contactId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};

export const updateContact = async (
  accessToken: string | null,
  contactId: string,
  payload: ContactFormData
) => {
  const response = await axios.put(
    `${API_BASE_URL}/contacts/${contactId}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    }
  );
  return response.data;
};
