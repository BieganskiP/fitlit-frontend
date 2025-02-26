"use client";

import { getMyAddressList } from "@/services/address-list";
import { useEffect, useState } from "react";
import { AddressList, Route } from "@/types";
import PageContent from "@/components/atoms/layout/PageContent";
import PageHeader from "@/components/atoms/layout/PageHeader";
import Table from "@/components/molecules/table/Table";
import { TableColumn } from "@/types/table";
import { Pencil, Trash2 } from "lucide-react";
import TableFilters from "@/components/molecules/filters/TableFilters";
import { getRoutes } from "@/services/routes";
import ReassignAddresses from "@/components/molecules/address/ReassignAddresses";

export default function AddressesPage() {
  const [addressList, setAddressList] = useState<AddressList[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedAddresses, setSelectedAddresses] = useState<AddressList[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [availableRoutes, setAvailableRoutes] = useState<Route[]>([]);
  const [showReassign, setShowReassign] = useState(false);

  const fetchAddresses = async (date: Date) => {
    try {
      const formattedDate = date.toISOString().split("T")[0];
      const data = await getMyAddressList(formattedDate);
      setAddressList(Array.isArray(data) ? data : [data]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch address list"
      );
    }
  };

  useEffect(() => {
    fetchAddresses(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const data = await getRoutes();
        setAvailableRoutes(data);
      } catch (err) {
        console.error("Failed to fetch routes:", err);
      }
    };

    fetchRoutes();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const columns: TableColumn<AddressList>[] = [
    {
      header: "cateringName",
      headerName: "Catering",
      accessor: "cateringName",
      width: "150px",
    },
    {
      header: "address",
      headerName: "Adres",
      accessor: (item: AddressList) =>
        `${item.address}, ${item.postCode} ${item.city}`,
      width: "250px",
    },
    {
      header: "route",
      headerName: "Trasa",
      accessor: "route",
      width: "100px",
    },
    {
      header: "deliveryTime",
      headerName: "Godzina dostawy",
      accessor: (item: AddressList) => {
        const time = new Date(`2000-01-01T${item.deliveryTime}`);
        return time.toLocaleTimeString("pl-PL", {
          hour: "2-digit",
          minute: "2-digit",
        });
      },
      width: "120px",
    },
    {
      header: "date",
      headerName: "Data dostawy",
      accessor: (item: AddressList) => {
        const date = new Date(item.date);
        return date.toLocaleDateString("pl-PL");
      },
      width: "120px",
    },
    {
      header: "phoneNumber",
      headerName: "Telefon",
      accessor: (item: AddressList) => {
        const phone = item.phoneNumber.replace(/^48/, "");
        return phone.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3");
      },
      width: "120px",
    },
    {
      header: "instruction",
      headerName: "Instrukcje",
      accessor: "instruction",
    },
    {
      header: "gateCode",
      headerName: "Kod do bramy",
      accessor: "gateCode",
      width: "120px",
    },
  ];

  const actions = [
    {
      label: "Edytuj",
      icon: <Pencil className="w-4 h-4" />,
      onClick: (address: AddressList) => {
        console.log("Edit address:", address);
      },
    },
    {
      label: "Usuń",
      icon: <Trash2 className="w-4 h-4" />,
      onClick: (address: AddressList) => {
        console.log("Delete address:", address);
      },
    },
  ];

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleSelectionChange = (selected: AddressList[]) => {
    setSelectedAddresses(selected);
  };

  const handleReassignSuccess = () => {
    setShowReassign(false);
    setSelectedAddresses([]);
    fetchAddresses(selectedDate); // Refresh the list
  };

  return (
    <PageContent>
      <PageHeader title="Adresy" />
      <TableFilters
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
      />
      {selectedAddresses.length > 0 &&
        (showReassign ? (
          <ReassignAddresses
            selectedAddresses={selectedAddresses}
            availableRoutes={availableRoutes}
            currentDate={selectedDate}
            onSuccess={handleReassignSuccess}
            onCancel={() => setShowReassign(false)}
          />
        ) : (
          <div className="mb-4 p-4 bg-bg-800 rounded-lg flex items-center justify-between">
            <span className="text-neutral-400">
              Wybrano {selectedAddresses.length} adresów
            </span>
            <button
              onClick={() => setShowReassign(true)}
              className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
            >
              Zmień trasę
            </button>
          </div>
        ))}
      <Table
        tableId="addresses-table"
        data={addressList}
        columns={columns}
        actions={actions}
        emptyStateMessage="Brak adresów"
        selectable
        onSelectionChange={handleSelectionChange}
      />
    </PageContent>
  );
}
