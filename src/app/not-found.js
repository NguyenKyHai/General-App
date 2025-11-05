'use client';

import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        textAlign: 'center',
        p: 4,
        pt: '20vh',
      }}
    >
      <Typography variant="h2" color="error" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Không tìm thấy trang bạn yêu cầu
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Có thể đường dẫn đã bị thay đổi hoặc không tồn tại.
      </Typography>

      <Link href="/" passHref>
        <Button variant="contained" color="primary">
          🔙 Quay về trang chủ
        </Button>
      </Link>
    </Box>
  );
}
