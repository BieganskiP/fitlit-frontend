import axios from "axios";
import { User } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getUser = async (): Promise<User> => {
  const token = localStorage.getItem("fitlit-token");

  const response = await axios.get<User>(`${API_BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export { getUser };
