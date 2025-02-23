"use client";

import { useAuth } from "@/contexts/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();
  console.log(user);
  return <div>DashboardPage</div>;
}
