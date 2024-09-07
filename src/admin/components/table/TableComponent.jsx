import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  Checkbox,
} from "@nextui-org/react";
import { PlusIcon } from "./PlusIcon";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import { SearchIcon } from "./SearchIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { capitalize } from "./utils";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function TableComponent({
  data,
  columns = [],
  INITIAL_VISIBLE_COLUMNS,
  onView,
  onEdit,
  onDelete,
  onAdd,
  statusOptions = [],
  statusFilterDefault = "all",
}) {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState(statusFilterDefault);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: columns[0]?.uid || "",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) => visibleColumns.has(column.uid));
  }, [visibleColumns, columns]);

  const filteredItems = React.useMemo(() => {
    let filteredData = [...(data || [])];

    if (hasSearchFilter) {
      filteredData = filteredData.filter((item) =>
        Object.values(item).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(filterValue.toLowerCase())
        )
      );
    }
    if (statusFilter !== "all") {
      filteredData = filteredData.filter(
        (item) => item.status === statusFilter
      );
    }

    return filteredData;
  }, [data, filterValue, statusFilter, hasSearchFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (item, columnKey) => {
      const cellValue = item[columnKey];

      switch (columnKey) {
        case "status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[cellValue]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              {onView && (
                <Button
                  size="sm"
                  variant="shadow"
                  onClick={() => onView(item)}
                  className="bg-slate-900 text-white"
                >
                  {" "}
                  View{" "}
                </Button>
              )}

              {onEdit && (
                <Button
                  size="sm"
                  variant="shadow"
                  color="primary"
                  onClick={() => onEdit(item)}
                >
                  Edit
                </Button>
              )}

              {onDelete && (
                <Button
                  size="sm"
                  color="danger"
                  onClick={() => onDelete(item)}
                  className="ml-2"
                >
                  Delete
                </Button>
              )}
            </div>
          );
        default:
          return cellValue;
      }
    },
    [onView, onEdit, onDelete]
  );

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    setFilterValue(value);
    setPage(1);
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={onClear}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Status Filter"
                closeOnSelect={false}
                selectedKeys={new Set([statusFilter])}
                onSelectionChange={(keys) =>
                  setStatusFilter(Array.from(keys)[0] || "all")
                }
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Columns Filter"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                onSelectionChange={(keys) => setVisibleColumns(new Set(keys))}
              >
                {columns.map((column) => (
                  <DropdownItem
                    key={column.uid}
                    textValue="statusShow"
                    className="capitalize"
                  >
                    <Checkbox
                      isSelected={visibleColumns.has(column.uid)}
                      onChange={(e) => {
                        const newVisibleColumns = new Set(visibleColumns);
                        if (e.target.checked) {
                          newVisibleColumns.add(column.uid);
                        } else {
                          newVisibleColumns.delete(column.uid);
                        }
                        setVisibleColumns(newVisibleColumns);
                      }}
                    >
                      {column.name}
                    </Checkbox>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            {onAdd && (
              <Button
                onClick={onAdd}
                variant="bordered"
                color="default"
                size="md"
              >
                Add
              </Button>
            )}
          </div>
        </div>
        <Table
          aria-label="Table Component"
          containerCss={{ borderRadius: "var(--nextui-space-2)" }}
          css={{ minWidth: "100%" }}
        >
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn key={column.uid} className="last:text-end">
                {column.name}
                <Button
                  onClick={() => {
                    setSortDescriptor((prevSort) => {
                      const isSameColumn = prevSort.column === column.uid;
                      const newDirection =
                        isSameColumn && prevSort.direction === "ascending"
                          ? "descending"
                          : "ascending";

                      return {
                        column: column.uid,
                        direction: newDirection,
                      };
                    });
                  }}
                  variant="link"
                  size="sm"
                  style={{ margin: 0, minWidth: "auto" }}
                >
                  {sortDescriptor.column === column.uid
                    ? sortDescriptor.direction === "ascending"
                      ? "▲"
                      : "▼"
                    : "▲"}
                </Button>
              </TableColumn>
            )}
          </TableHeader>
          <TableBody>
            {sortedItems.map((item, index) => (
              <TableRow key={index}>
                {headerColumns.map((column) => (
                  <TableCell key={column.uid}>
                    {renderCell(item, column.uid)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-between items-center">
          <Pagination
            total={pages}
            page={page}
            onChange={(newPage) => setPage(newPage)}
            color="primary"
            showControls
            // Removed showPageNumbers
          />
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              value={rowsPerPage}
              onChange={onRowsPerPageChange}
              className="ml-2 border rounded p-1"
            >
              {[5, 10, 20, 50].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    data,
    columns,
    filterValue,
    statusFilter,
    visibleColumns,
    onView,
    onEdit,
    onDelete,
    onAdd,
    sortDescriptor,
    rowsPerPage,
    page,
    pages,
    onClear,
    statusOptions,
  ]);

  return topContent;
}

TableComponent.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  INITIAL_VISIBLE_COLUMNS: PropTypes.array.isRequired,
  onView: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onAdd: PropTypes.func,
  statusOptions: PropTypes.array,
  statusFilterDefault: PropTypes.string,
};
