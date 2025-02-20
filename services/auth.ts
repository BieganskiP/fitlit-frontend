import Cookies from "js-cookie";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const token = Cookies.get("fitlit_token");

// Configure axios defaults
axios.defaults.withCredentials = true;

const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Błąd logowania", { cause: error });
  }
};

const getUser = async () => {
  const response = await axios.get(`${API_BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export { login, getUser };
