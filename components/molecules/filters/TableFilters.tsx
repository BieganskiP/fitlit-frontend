"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { pl } from "date-fns/locale";

interface TableFiltersProps {
  onDateChange: (date: Date | null) => void;
  selectedDate: Date | null;
}

export default function TableFilters({
  onDateChange,
  selectedDate,
}: TableFiltersProps) {
  return (
    <div className="mb-4 p-4 bg-bg-800 rounded-lg">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-neutral-400">Data dostawy:</label>
          <DatePicker
            selected={selectedDate}
            onChange={onDateChange}
            locale={pl}
            dateFormat="dd/MM/yyyy"
            className="bg-bg-700 border border-bg-700 rounded px-3 py-2 text-sm text-neutral-100"
            placeholderText="Wybierz datę"
          />
        </div>
      </div>
    </div>
  );
}
