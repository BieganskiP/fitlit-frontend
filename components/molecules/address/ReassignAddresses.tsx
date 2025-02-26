"use client";

import { useState } from "react";
import { AddressList, Route } from "@/types";
import { reassignRoutes } from "@/services/address-list";

interface ReassignAddressesProps {
  selectedAddresses: AddressList[];
  availableRoutes: Route[];
  currentDate: Date;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ReassignAddresses({
  selectedAddresses,
  availableRoutes,
  currentDate,
  onSuccess,
  onCancel,
}: ReassignAddressesProps) {
  const [selectedRoute, setSelectedRoute] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleReassign = async () => {
    if (!selectedRoute) {
      setError("Please select a target route");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await reassignRoutes({
        addressListIds: selectedAddresses.map((address) => address.id),
        targetRoute: selectedRoute,
        date: currentDate.toISOString().split("T")[0],
      });
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reassign addresses");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-bg-800 rounded-lg">
      <div className="flex items-center gap-4">
        <select
          value={selectedRoute}
          onChange={(e) => setSelectedRoute(e.target.value)}
          className="bg-bg-700 border border-bg-700 rounded px-3 py-2 text-sm text-neutral-100"
        >
          <option value="">Wybierz trasę</option>
          {availableRoutes.map((route) => (
            <option key={route.id} value={route.name}>
              {route.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleReassign}
          disabled={isLoading || !selectedRoute}
          className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Przenoszenie..." : "Przenieś zaznaczone"}
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 text-neutral-400 hover:text-neutral-200"
        >
          Anuluj
        </button>
      </div>
      {error && <div className="mt-2 text-error-500 text-sm">{error}</div>}
    </div>
  );
} 