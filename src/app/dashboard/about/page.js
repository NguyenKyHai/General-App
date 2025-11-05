'use client'

import { Box, Typography, Paper, Stack, Button } from '@mui/material'
import Link from 'next/link'
import FloatingFlowers from '@/components/FloatingFlowers'

export default function AboutPage() {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #fef6ff 0%, #ffffff 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Hiệu ứng hoa bay giống trang chủ */}
      <FloatingFlowers />

      <Paper
        elevation={6}
        sx={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 700,
          p: 5,
          borderRadius: 3,
          textAlign: 'center',
          backgroundColor: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(6px)',
        }}
      >
        <Typography variant="h4" gutterBottom color="primary">
          🌸 Giới thiệu hệ thống QR Dashboard
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Hệ thống QR Dashboard được phát triển nhằm giúp bạn dễ dàng quản lý dữ liệu được quét từ mã QR,
          theo dõi thống kê và hiển thị thông tin trực quan.  
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Với thiết kế nhẹ nhàng, đơn giản nhưng mạnh mẽ, hệ thống phù hợp cho nội bộ công ty,
          quản lý kho, sự kiện, hoặc bất kỳ tình huống nào cần tra cứu nhanh bằng mã QR.
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Phiên bản hiện tại: <strong>v1.0.0</strong>  
          <br /> Được phát triển bởi đội ngũ kỹ thuật nội bộ 💻
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center" mt={3}>
          <Link href="/" passHref>
            <Button variant="contained" color="primary">
              ← Quay lại Trang chủ
            </Button>
          </Link>
          <Link href="/dashboard" passHref>
            <Button variant="outlined" color="secondary">
              Đi đến Dashboard
            </Button>
          </Link>
        </Stack>
      </Paper>
    </Box>
  )
}
