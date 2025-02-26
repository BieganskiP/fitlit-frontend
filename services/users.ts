import axios from "axios";
import { User, UserResponse } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("fitlit-token");
  }
  return null;
};

const getUser = async (): Promise<User> => {
  const token = getToken();

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await axios.get<User>(`${API_BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getUsers = async (): Promise<UserResponse> => {
  const token = getToken();

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await axios.get<UserResponse>(`${API_BASE_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export { getUser, getUsers };
