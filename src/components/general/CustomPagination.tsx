import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';

interface CustomPaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (rows: number) => void;
}

export default function CustomPagination({
  totalPages,
  currentPage,
  setCurrentPage,
  rowsPerPage,
  setRowsPerPage,
}: CustomPaginationProps) {
  return (
    <div className="flex items-center justify-end space-x-6 px-4 pt-3">
      {/* Rows per page dropdown */}
      <div className="flex items-center space-x-2">
        <span className="whitespace-nowrap text-sm">Rows per page</span>
        <Select value={String(rowsPerPage)} onValueChange={value => setRowsPerPage(Number(value))}>
          <SelectTrigger className="w-[70px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {[5, 10, 20, 50].map(size => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Page Indicator */}
      <span className="whitespace-nowrap text-sm">
        Page
        {' '}
        {currentPage}
        {' '}
        of
        {' '}
        {totalPages}
      </span>

      {/* Pagination Controls */}
      <Pagination>
        <PaginationContent className="flex items-center space-x-1">
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={() => setCurrentPage(1)}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
            >
              <ChevronsLeft className="size-4" />
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={() => setCurrentPage(totalPages)}
              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
            >
              <ChevronsRight className="size-4" />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
