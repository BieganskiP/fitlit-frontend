import { useState, useEffect } from "react";
import { TableColumn } from "@/types/table";

interface TableVisibilityState {
  [tableId: string]: {
    [columnHeader: string]: boolean;
  };
}

export function useTableColumns<T>(
  tableId: string,
  initialColumns: TableColumn<T>[]
) {
  const [columns, setColumns] = useState(initialColumns);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load saved preferences when component mounts
  useEffect(() => {
    try {
      const savedPreferences = localStorage.getItem("tablePreferences");
      if (savedPreferences) {
        const preferences: TableVisibilityState = JSON.parse(savedPreferences);
        const tablePreferences = preferences[tableId];

        const updatedColumns = initialColumns.map((column) => ({
          ...column,
          isVisible:
            tablePreferences?.[column.header] === undefined
              ? column.isVisible !== false // if no preference, use column's default or true
              : tablePreferences[column.header], // if preference exists, use it
        }));

        setColumns(updatedColumns);
      } else {
        // If no preferences exist, initialize with all columns visible
        const updatedColumns = initialColumns.map((column) => ({
          ...column,
          isVisible: column.isVisible !== false,
        }));
        setColumns(updatedColumns);

        // Initialize preferences in localStorage
        const newPreferences: TableVisibilityState = {
          [tableId]: {},
        };
        updatedColumns.forEach((column) => {
          newPreferences[tableId][column.header] = column.isVisible !== false;
        });
        localStorage.setItem("tablePreferences", JSON.stringify(newPreferences));
      }
      setIsInitialized(true);
    } catch (error) {
      console.error("Error loading table preferences:", error);
      // Fallback to all columns visible
      setColumns(
        initialColumns.map((column) => ({
          ...column,
          isVisible: true,
        }))
      );
      setIsInitialized(true);
    }
  }, [tableId, initialColumns]);

  const toggleColumnVisibility = (index: number) => {
    if (!isInitialized) return;

    const newColumns = [...columns];
    const newVisibility = !newColumns[index].isVisible;
    newColumns[index] = {
      ...newColumns[index],
      isVisible: newVisibility,
    };
    setColumns(newColumns);

    try {
      // Update localStorage
      const savedPreferences = localStorage.getItem("tablePreferences");
      const preferences: TableVisibilityState = savedPreferences
        ? JSON.parse(savedPreferences)
        : { [tableId]: {} };

      preferences[tableId] = {
        ...preferences[tableId],
        [newColumns[index].header]: newVisibility,
      };

      localStorage.setItem("tablePreferences", JSON.stringify(preferences));
    } catch (error) {
      console.error("Error saving table preferences:", error);
    }
  };

  return { columns, toggleColumnVisibility, isInitialized };
} 