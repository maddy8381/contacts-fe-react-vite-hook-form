import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const newSignUpRequest = async (payload: unknown) => {
  const response = await axios.post(`${API_BASE_URL}/auth/signup`, payload);
  return response.data;
};

export const newSignInRequest = async (payload: unknown) => {
  const response = await axios.post(`${API_BASE_URL}/auth/signin`, payload);
  return response.data;
};

export const fetchUserDetails = async (accessToken: string | null) => {
  const response = await axios.get(`${API_BASE_URL}/dashboard/contacts`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
