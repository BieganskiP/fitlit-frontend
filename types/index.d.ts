export enum UserRole {
  SUPERADMIN = "superadmin",
  OWNER = "owner",
  ADMIN = "admin",
  LEADER = "leader",
  USER = "user",
}

export enum UserStatus {
  ACTIVE = "active",
  BLOCKED = "blocked",
}
export enum CompanyPlan {
  BASIC = "BASIC",
  BUSINESS = "BUSINESS",
  ENTERPRISE = "ENTERPRISE",
}

export interface Company {
  id: string;
  name: string;
  plan: CompanyPlan;
}

export interface Route {
  id: string;
  name: string;
  description: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface LoginResponse {
  user: User;
}

export interface User {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: UserRole;
  status: UserStatus;
  wage: number | null;
  isProfileComplete: boolean;
  company: Company;
  routes: Route[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  superadminCompanies: any[];
}

export interface UserResponse {
  users: User[];
  pagination: Pagination;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface RouteResponse {
  routes: Route[];
  pagination: Pagination;
}

export interface AddressList {
  id: string;
  cateringName: string;
  city: string;
  companyId: string;
  address: string;
  createdAt: string;
  date: string;
  deliveryTime: string;
  gateCode: string;
  instruction: string;
  phoneNumber: string;
  postCode: string;
  route: string;
  routeId: string;
  addressListInfoId: string;
  addressListInfo: {
    id: string;
    numberOfStops: number;
    numberOfPackages: number;
    route: string;
  };
  updatedAt: string;
}
