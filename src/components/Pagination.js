// src/app/components/Pagination.js
import { Pagination } from '@mui/material';

const Paginate = ({ page, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center mt-10">
      <Pagination
        count={totalPages}
        page={page}
        onChange={(event, value) => onPageChange(value)}
        color="primary"
        className="text-center"
      />
    </div>
  );
};

export default Paginate;
