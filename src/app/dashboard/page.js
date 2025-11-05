import FloatingFlowers from '@/components/FloatingFlowers';
import { Box } from '@mui/material';

export default function DashboardPage() {
  return (
    <>
      <Box
        maxWidth="sm"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',  // Canh nội dung về bên trái
          justifyContent: 'flex-start', // Canh nội dung từ trên xuống
        }}
      >
        <FloatingFlowers />
        <h2 className="text-3xl text-green-500 py-5 font-bold">📈 Đây là trang tổng quan dashboard</h2>
      </Box>

    </>
  );
}

