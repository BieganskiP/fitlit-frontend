import { Route } from "@/types";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("fitlit-token");
  }
  return null;
};

const getRoutes = async (): Promise<Route[]> => {
  const token = getToken();

  if (!token) {
    throw new Error("No authentication token found");
  }
  const response = await axios.get<Route[]>(`${API_BASE_URL}/routes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const addRoute = async (route: Route): Promise<Route> => {
  const token = getToken();

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await axios.post<Route>(`${API_BASE_URL}/routes`, route, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const assignUserToRoute = async (
  routeId: string,
  userId: string
): Promise<Route> => {
  const token = getToken();

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await axios.patch<Route>(
    `${API_BASE_URL}/routes/${routeId}/assign/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export { getRoutes, addRoute, assignUserToRoute };
