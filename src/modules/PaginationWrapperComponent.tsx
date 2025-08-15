// PaginationWrapperComponent.tsx
import React from 'react';
import { Pagination } from '@mui/material';

interface PaginationWrapperComponentProps {
  count: number;
  page: number;
  onChange: (_: React.ChangeEvent<unknown>, _value: number) => void;
  className?: string;
}

const PaginationWrapperComponent: React.FC<PaginationWrapperComponentProps> = ({ count, page, onChange, className }) => {
  return (
    <Pagination
      count={count}
      page={page}
      onChange={onChange}
      variant="text"
      showFirstButton={false}
      showLastButton={false}
      boundaryCount={0}
      className={className}
    />
  );
};

export default PaginationWrapperComponent;
