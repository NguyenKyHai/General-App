'use client';

import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Divider } from '@mui/material';
import PrintWrapper from '@/components/PrintWrapper';

export default function InvoicePage() {
  const items = [
    { id: 1, name: 'Sản phẩm A', qty: 2, price: 100000 },
    { id: 2, name: 'Sản phẩm B', qty: 1, price: 150000 },
  ];

  return (
    <PrintWrapper>
      <Typography variant="h5" align="center" gutterBottom>
        HÓA ĐƠN BÁN HÀNG
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Typography variant="body2" sx={{ mb: 1 }}>
        <strong>Khách hàng:</strong> Nguyễn Văn A
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        <strong>Ngày:</strong> 27/10/2025
      </Typography>

      <Divider sx={{ my: 2 }} />

      {/* Bảng hàng hóa */}
      <Table size="small" sx={{ border: '1px solid black', mt: 2 }}>
        <TableHead>
          <TableRow>
            {['STT', 'Tên hàng', 'Số lượng', 'Đơn giá', 'Thành tiền'].map((header) => (
              <TableCell
                key={header}
                sx={{ border: '1px solid black', fontWeight: 600, backgroundColor: '#f0f0f0' }}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell sx={tdStyle}>{item.id}</TableCell>
              <TableCell sx={tdStyle}>{item.name}</TableCell>
              <TableCell sx={tdStyle}>{item.qty}</TableCell>
              <TableCell sx={tdStyle}>{item.price.toLocaleString()}₫</TableCell>
              <TableCell sx={tdStyle}>{(item.price * item.qty).toLocaleString()}₫</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Ký tên */}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Box textAlign="center">
          <Typography variant="body2">Người lập hóa đơn</Typography>
          <Box sx={{ height: '60px' }}></Box>
          <Typography variant="body2">(Ký, ghi rõ họ tên)</Typography>
        </Box>
        <Box textAlign="center">
          <Typography variant="body2">Khách hàng</Typography>
          <Box sx={{ height: '60px' }}></Box>
          <Typography variant="body2">(Ký, ghi rõ họ tên)</Typography>
        </Box>
      </Box>
    </PrintWrapper>
  );
}

const tdStyle = { border: '1px solid black', p: '4px' };
