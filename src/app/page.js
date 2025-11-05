'use client';
import { Box, Typography, Button, Stack } from '@mui/material';
import { useSession } from 'next-auth/react'
import Link from 'next/link';
import FloatingFlowers from '@/components/FloatingFlowers';

export default function HomePage() {
  const { data: session } = useSession();
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #fff0f6 0%, #ffffff 100%)',
        display: 'flex',
        flexDirection: 'column',
        py: 6,
      }}
    >
      {/* Hiệu ứng hoa */}
      <FloatingFlowers />

      {/* Nội dung chính */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          textAlign: 'center',
          mt: 4,
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 600 }}>
          🚀 Chào mừng đến với hệ thống
        </Typography>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 600 }}>
          General System
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={4}>
          Quản lý và lưu trữ mọi thứ nhỏ nhặt nhất
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center">
          {session?.user?.role === "Admin" &&
            <Link href="/dashboard" passHref>
              <Button variant="contained" color="primary" size="large" sx={{ minWidth: 180 }}>
                Dashboard
              </Button>
            </Link>
          }
          <Link href="/system" passHref>
            <Button variant="outlined" color="secondary" size="large" sx={{ minWidth: 180 }}>
              System
            </Button>
          </Link>
        </Stack>
      </Box>
    </Box>
  );
}
