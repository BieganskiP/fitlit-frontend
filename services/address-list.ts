import axios from "axios";
import { AddressList } from "@/types";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("fitlit-token");
  }
  return null;
};

interface ReassignRoutesDto {
  addressListIds: string[];
  targetRoute: string;
  date: string;
}

interface ReassignRoutesRequestDto extends ReassignRoutesDto {
  companyId: string;
}

const getMyAddressList = async (date?: string): Promise<AddressList[]> => {
  const token = getToken();

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await axios.get<AddressList[]>(
    `${API_BASE_URL}/address-list/my-deliveries${date ? `?date=${date}` : ""}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const reassignRoutes = async (data: ReassignRoutesDto) => {
  const token = getToken();

  if (!token) {
    throw new Error("No authentication token found");
  }

  // Get companyId from localStorage or context
  const user = localStorage.getItem("fitlit-user");
  if (!user) {
    throw new Error("No user data found");
  }

  const { companyId } = JSON.parse(user);
  if (!companyId) {
    throw new Error("No company ID found");
  }

  const requestData: ReassignRoutesRequestDto = {
    ...data,
    companyId,
  };

  const response = await axios.post<{
    message: string;
    updatedEntries: number;
    targetRoute: string;
    newStopsCount: number;
  }>(`${API_BASE_URL}/address-list/reassign-routes`, requestData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export { getMyAddressList, reassignRoutes };
