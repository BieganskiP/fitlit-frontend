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
