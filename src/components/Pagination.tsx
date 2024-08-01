import React from 'react';
import { Pagination as MuiPagination } from '@mui/material';

interface PaginationProps {
  page: number;
  count: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, count, onPageChange }) => {
  return (
    <MuiPagination
      count={count}
      page={page}
      onChange={onPageChange}
      color="primary"
      shape="rounded"
    />
  );
};

export default Pagination;
