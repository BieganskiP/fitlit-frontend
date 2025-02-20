import Cookies from "js-cookie";
import axios from "axios";
import { User } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const token = Cookies.get("fitlit_token");

const getUser = async (): Promise<User> => {
  const response = await axios.get<User>(`${API_BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export { getUser };
