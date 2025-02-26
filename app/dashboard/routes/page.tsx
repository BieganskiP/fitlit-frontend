"use client";

import { useEffect, useState } from "react";
import { Route } from "@/types";
import { getRoutes } from "@/services/routes";
import PageContent from "@/components/atoms/layout/PageContent";
import PageHeader from "@/components/atoms/layout/PageHeader";
import Table from "@/components/molecules/table/Table";
import { Pencil, Trash2 } from "lucide-react";
import { TableColumn } from "@/types/table";

export default function RoutesPage() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const data = await getRoutes();
        setRoutes(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch routes");
      }
    };

    fetchRoutes();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const columns: TableColumn<Route>[] = [
    {
      header: "name",
      headerName: "Nazwa",
      accessor: "name" as keyof Route,
    },
    {
      header: "description",
      headerName: "Opis",
      accessor: "description" as keyof Route,
    },
    {
      header: "user",
      headerName: "Użytkownik",
      accessor: (route: Route) => {
        if (!route.user) return "-";
        return `${route.user.firstName || ""} ${route.user.lastName || ""} ${
          route.user.email
        }`.trim();
      },
    },
    {
      header: "active",
      headerName: "Aktywna",
      accessor: "active" as keyof Route,
      renderBoolean: true,
    },
  ];

  const actions = [
    {
      label: "Edit",
      icon: <Pencil className="w-4 h-4" />,
      onClick: (route: Route) => {
        console.log("Edit route:", route);
      },
    },
    {
      label: "Delete",
      icon: <Trash2 className="w-4 h-4" />,
      onClick: (route: Route) => {
        console.log("Delete route:", route);
      },
    },
  ];

  return (
    <PageContent>
      <PageHeader title="Trasy" />
      <Table
        tableId="routes-table"
        data={routes}
        columns={columns}
        actions={actions}
        emptyStateMessage="No routes found"
      />
    </PageContent>
  );
}
