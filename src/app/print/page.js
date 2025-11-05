'use client';

import { Container, Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

export default function Page() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        py: 6,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      {/* Nút Quay lại */}
      <Box sx={{ mb: 4 }}>
        <Button href="/dashboard" variant="outlined">
          ← Quay lại
        </Button>
      </Box>

      {/* Nội dung chính */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start', // thay từ center sang flex-start
          alignItems: 'center',
          textAlign: 'center',
          mt: 4, // đẩy nội dung lên cao hơn
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 600 }}>
          Chọn loại tài liệu cần in
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: 400 }}
        >
          Hãy chọn loại tài liệu bạn muốn in để tiếp tục.
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <Button
            component={Link}
            href="/print/invoice"
            variant="contained"
            size="large"
            sx={{ flex: 1 }}
          >
            In Hóa đơn
          </Button>

          <Button
            component={Link}
            href="/print/report"
            variant="contained"
            size="large"
            color="secondary"
            sx={{ flex: 1 }}
          >
            In Báo Cáo
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
