export interface TableColumn<T> {
  header: string;
  accessor: keyof T | ((item: T) => string | number | React.ReactNode | boolean);
  width?: string;
  headerName?: string;
  renderBoolean?: boolean;
  isVisible?: boolean;
}

export interface TableAction<T> {
  label: string;
  onClick: (item: T) => void;
  icon?: React.ReactNode;
}

export interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  actions?: TableAction<T>[];
  isLoading?: boolean;
  emptyStateMessage?: string;
  selectable?: boolean;
  onSelectionChange?: (selectedItems: T[]) => void;
  tableId: string;
} 