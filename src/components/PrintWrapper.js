'use client';

import { Box } from '@mui/material';

export default function PrintWrapper({ children }) {
  return (
    <Box
      sx={{
        width: '210mm',
        minHeight: '297mm',
        margin: 'auto',
        backgroundColor: '#fff',
        color: '#000',
        p: '5mm',
        boxShadow: '0 0 5mm rgba(0,0,0,0.1)',
        fontFamily: 'Arial, sans-serif',
        '@media print': {
          boxShadow: 'none',
          margin: 0,
        },
      }}
    >
      {children}
    </Box>
  );
}
