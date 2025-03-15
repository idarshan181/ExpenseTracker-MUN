'use client';

import { applyDateFilter } from '@/app/utils/dateFilter';
import CustomPagination from '@/components/general/CustomPagination';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { format } from 'date-fns';
import { CalendarIcon, Search } from 'lucide-react';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function CategoriesTable<TData extends Record<string, any>, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState(''); // Global search filter except date range
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const [pageSize, setPageSize] = useState(5);
  const [pageIndex, setPageIndex] = useState(0);
  const filteredData = applyDateFilter<TData>(data, dateRange, 'createdAt');

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: false,
    rowCount: data.length,
    state: {
      sorting: [
        ...sorting,
        { id: 'createdAt', desc: true },
      ],
      columnFilters,
      globalFilter, // Set global filter state
      pagination: { pageIndex, pageSize },
    },
    onPaginationChange: (updater) => {
      const newState
        = typeof updater === 'function'
          ? updater({ pageIndex, pageSize })
          : updater;
      setPageIndex(newState.pageIndex);
      setPageSize(newState.pageSize);
    },
    globalFilterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId);
      return (
        String(value)
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      );
    },
  });

  return (
    <div className=" rounded-lg border border-gray-200 p-2 shadow">

      {/* Filters Section */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4 rounded-lg p-4">
        {/* Global Search Filter */}
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-2.5 size-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search categories..."
            value={globalFilter}
            onChange={e => setGlobalFilter(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Date Range Filter */}
        <div className="flex items-center space-x-2">
          <CalendarIcon className="size-5 text-gray-400" />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[260px] text-left">
                {dateRange?.from && dateRange?.to
                  ? `${format(dateRange.from, 'dd MMM yyyy')} - ${format(
                    dateRange.to,
                    'dd MMM yyyy',
                  )}`
                  : 'Select date range'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                disabled={date =>
                  date > new Date() || date < new Date('1900-01-01')}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows && table.getRowModel().rows?.length
            ? (
                table.getRowModel().rows.map(row => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )
            : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
        </TableBody>
      </Table>

      {data.length > pageSize && (
        <div className="flex items-center justify-end">
          <CustomPagination
            totalPages={table.getPageCount()}
            currentPage={pageIndex + 1} // Adjust for 1-based indexing
            setCurrentPage={page => table.setPageIndex(page - 1)}
            rowsPerPage={pageSize}
            setRowsPerPage={(size) => {
              table.setPageSize(size);
              setPageSize(size);
            }}
          />
        </div>
      )}
    </div>
  );
}
