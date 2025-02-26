"use client";

import { useEffect, useState } from "react";
import { User } from "@/types";
import { getUsers } from "@/services/users";
import PageContent from "@/components/atoms/layout/PageContent";
import PageHeader from "@/components/atoms/layout/PageHeader";
import Table from "@/components/molecules/table/Table";
import { Pencil, Trash2 } from "lucide-react";
import { TableColumn } from "@/types/table";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data.users);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const columns: TableColumn<User>[] = [
    {
      header: "name",
      headerName: "Imię i nazwisko",
      accessor: (user: User) =>
        `${user.firstName || ""} ${user.lastName || ""}`.trim() || "-",
      width: "200px",
    },
    {
      header: "email",
      headerName: "Email",
      accessor: (user: User) => user.email,
    },
    {
      header: "role",
      headerName: "Rola",
      accessor: (user: User) => user.role,
    },

  ];

  const actions = [
    {
      label: "Edit",
      icon: <Pencil className="w-4 h-4" />,
      onClick: (user: User) => {
        console.log("Edit user:", user);
      },
    },
    {
      label: "Delete",
      icon: <Trash2 className="w-4 h-4" />,
      onClick: (user: User) => {
        console.log("Delete user:", user);
      },
    },
  ];

  return (
    <PageContent>
      <PageHeader title="Użytkownicy" />
      <Table
        tableId="users-table"
        data={users}
        columns={columns}
        actions={actions}
        emptyStateMessage="No users found"
      />
    </PageContent>
  );
}
