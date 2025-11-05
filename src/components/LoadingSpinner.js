// src/app/components/LoadingSpinner.js
import { CircularProgress } from '@mui/material';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <CircularProgress />
    </div>
  );
};

export default LoadingSpinner;
