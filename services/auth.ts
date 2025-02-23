import axios from "axios";
import Cookies from "js-cookie";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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

interface SignupData {
  token: string;
  password: string;
  firstName: string;
  lastName: string;
}

const signup = async (data: SignupData) => {
  const response = await axios.post(
    `${API_BASE_URL}/auth/complete-registration`,
    data
  );

  return response.data;
};

const logout = async () => {
  const response = await axios.post(`${API_BASE_URL}/auth/logout`);

  Cookies.remove("fitlit-token");
  localStorage.removeItem("fitlit-token");
  localStorage.removeItem("fitlit-user");

  return response.data;
};

export { login, signup, logout };
