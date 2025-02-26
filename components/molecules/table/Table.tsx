"use client";

import { useState, useRef } from "react";
import { MoreVertical, Check, X, ChevronDown } from "lucide-react";
import { TableColumn, TableProps } from "@/types/table";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useTableColumns } from "@/hooks/useTableColumns";

type CellValue = string | number | boolean | React.ReactNode | null;

export default function Table<T>({
  data,
  columns: initialColumns,
  actions,
  isLoading,
  emptyStateMessage = "No data available",
  selectable,
  onSelectionChange,
  tableId,
}: TableProps<T> & { tableId: string }) {
  const [selectedItems, setSelectedItems] = useState<T[]>([]);
  const { columns, toggleColumnVisibility, isInitialized } = useTableColumns(
    tableId,
    initialColumns
  );
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [actionOpenIndex, setActionOpenIndex] = useState<number | null>(null);
  const columnSelectorRef = useRef<HTMLDivElement>(null);

  useClickOutside(columnSelectorRef, () => {
    setShowColumnSelector(false);
  });

  const handleSelectAll = (checked: boolean) => {
    setSelectedItems(checked ? data : []);
    onSelectionChange?.(checked ? data : []);
  };

  const handleSelectItem = (item: T, checked: boolean) => {
    const newSelection = checked
      ? [...selectedItems, item]
      : selectedItems.filter((i) => i !== item);
    setSelectedItems(newSelection);
    onSelectionChange?.(newSelection);
  };

  const renderCell = (column: TableColumn<T>, item: T) => {
    const value =
      typeof column.accessor === "function"
        ? column.accessor(item)
        : (item[column.accessor] as CellValue);

    if (column.renderBoolean && typeof value === "boolean") {
      return value ? (
        <Check className="w-5 h-5 text-green-500" />
      ) : (
        <X className="w-5 h-5 text-error-500" />
      );
    }
    return value ?? "-";
  };

  if (isLoading) {
    return <div className="text-center py-4 text-neutral-300">Loading...</div>;
  }

  if (!data.length) {
    return (
      <div className="text-center py-4 text-neutral-400">
        {emptyStateMessage}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {isInitialized && (
        <div className="flex justify-end">
          <div className="relative" ref={columnSelectorRef}>
            <button
              onClick={() => setShowColumnSelector(!showColumnSelector)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-400 hover:text-neutral-200"
            >
              Kolumny{" "}
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  showColumnSelector ? "rotate-180" : ""
                }`}
              />
            </button>
            {showColumnSelector && (
              <div className="absolute right-0 mt-2 w-48 bg-bg-800 rounded-lg shadow-lg z-10 animate-fadeIn">
                {columns.map((column, index) => (
                  <label
                    key={index}
                    className="flex items-center px-4 py-2 hover:bg-bg-700 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={column.isVisible !== false}
                      onChange={() => toggleColumnVisibility(index)}
                      className="mr-2"
                    />
                    <span className="text-sm text-neutral-200">
                      {column.headerName}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      <div className="relative">
        <div className="overflow-x-auto rounded-lg border border-bg-700">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-bg-700 table-fixed">
              <thead className="bg-bg-800">
                <tr>
                  {selectable && (
                    <th className="px-6 py-3 w-[50px]">
                      <input
                        type="checkbox"
                        checked={selectedItems.length === data.length}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                      />
                    </th>
                  )}
                  {columns
                    .filter((column) => column.isVisible !== false)
                    .map((column, index) => (
                      <th
                        key={index}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider"
                        style={{ width: column.width }}
                      >
                        {column.headerName || column.header}
                      </th>
                    ))}
                  {actions && actions.length > 0 && (
                    <th scope="col" className="relative px-6 py-3 w-[100px]">
                      <span className="sr-only">Actions</span>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-bg-900 divide-y divide-bg-700">
                {data.map((item, index) => (
                  <tr key={index} className="hover:bg-bg-800">
                    {selectable && (
                      <td className="px-6 py-4 whitespace-nowrap w-[50px]">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item)}
                          onChange={(e) =>
                            handleSelectItem(item, e.target.checked)
                          }
                        />
                      </td>
                    )}
                    {columns
                      .filter((column) => column.isVisible !== false)
                      .map((column, colIndex) => (
                        <td
                          key={colIndex}
                          className="px-6 py-4 whitespace-nowrap text-neutral-100 overflow-hidden text-ellipsis"
                        >
                          {renderCell(column, item)}
                        </td>
                      ))}
                    {actions && actions.length > 0 && (
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative w-[100px]">
                        <button
                          onClick={() =>
                            setActionOpenIndex(
                              actionOpenIndex === index ? null : index
                            )
                          }
                          className="text-neutral-400 hover:text-neutral-200"
                        >
                          <MoreVertical className="h-5 w-5" />
                        </button>
                        {actionOpenIndex === index && (
                          <div className="absolute right-0 mt-2 w-48 bg-bg-800 rounded-lg shadow-lg z-10">
                            <div className="py-1" role="menu">
                              {actions.map((action, actionIndex) => (
                                <button
                                  key={actionIndex}
                                  onClick={() => {
                                    action.onClick(item);
                                    setActionOpenIndex(null);
                                  }}
                                  className="w-full text-left px-4 py-2 text-sm text-neutral-200 hover:bg-bg-700 flex items-center gap-2"
                                  role="menuitem"
                                >
                                  {action.icon && (
                                    <span className="w-4 h-4">
                                      {action.icon}
                                    </span>
                                  )}
                                  {action.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
