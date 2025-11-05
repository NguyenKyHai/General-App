'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import jsQR from 'jsqr';
import {
  Box,
  Typography,
  Button,
  Stack,
  Paper,
  Alert,
} from '@mui/material';

export default function QRScanner() {
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);
  const [imageSrc, setImageSrc] = useState('');
  const [result, setResult] = useState('');
  const [link, setLink] = useState('');
  const [label, setLabel] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const resetAll = () => {
    setImageSrc('');
    setResult('');
    setLink('');
    setLabel('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleImage = useCallback((file, labelText = '') => {
    const imgURL = URL.createObjectURL(file);
    setImageSrc(imgURL);
    setLabel(labelText);

    const img = new Image();
    img.src = imgURL;
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      if (code) {
        setResult(code.data);
        if (/^https?:\/\/[\w\-\.]+/.test(code.data)) {
          setLink(code.data);
        } else {
          setLink('');
        }
      } else {
        setResult('❌ Không thể đọc được mã QR. Thử ảnh khác.');
        setLink('');
      }
      URL.revokeObjectURL(imgURL);
    };
  }, []);

  // Dán ảnh từ clipboard
  useEffect(() => {
    const handlePaste = (event) => {
      const items = event.clipboardData.items;
      for (let item of items) {
        if (item.type.indexOf('image') !== -1) {
          const file = item.getAsFile();
												   
          handleImage(file, '📎 Ảnh vừa dán');
          break;
        }
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [handleImage]);

  // Kéo thả ảnh
  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImage(file, '📎 Ảnh vừa thả');
    } else {
      setResult('❌ Chỉ chấp nhận file ảnh!');
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  return (
    <Box sx={{ maxWidth: 720, mx: 'auto', p: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        📷 Quét mã QR từ ảnh
      </Typography>

      <Stack direction="row" spacing={2} flexWrap="wrap" justifyContent="center" mb={2}>
        <Paper
          variant="outlined"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          sx={{
            flex: '1 1 240px',
            minHeight: 90,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '2px',
            borderStyle: 'dashed',
            borderRadius: '10px',
            borderColor: dragActive ? 'primary.main' : 'grey.400',
            bgcolor: dragActive ? 'grey.100' : 'transparent',
            color: 'text.secondary',
            p: 2,
            textAlign: 'center',
            transition: 'all 0.2s ease',
          }}
        >
          📋 Kéo & thả ảnh vào đây hoặc Ctrl + V
        </Paper>

        <Button
          variant="contained"
          component="label"
          sx={{ flex: '1 1 240px', py: 2 }}
        >
          📁 Chọn ảnh QR
          <input
            type="file"
            accept="image/*"
            hidden
            ref={fileInputRef}
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;
              if (!file.type.startsWith('image/')) {
                setResult('❌ Chỉ chấp nhận file ảnh!');
                fileInputRef.current.value = '';
                return;
              }
													   
              handleImage(file, '📎 Ảnh vừa tải');
            }}
          />
        </Button>
      </Stack>

      {label && <Typography variant="body2" color="text.secondary">{label}</Typography>}

      {imageSrc && (
        <Box component="img" src={imageSrc} alt="Ảnh xem trước" sx={{ maxWidth: '100%', borderRadius: 2, mt: 2 }} />
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {result && (
        <Alert severity={result.startsWith('❌') ? 'error' : 'success'} sx={{ mt: 2 }}>
          {result.startsWith('❌') ? result : `✅ Đọc được: ${result}`}
        </Alert>
      )}

      {(link || imageSrc) && (
        <Stack direction="row" spacing={2} mt={2}>
          {link && (
            <Button
              variant="contained"
              color="success"
              href={link}
              target="_blank"
              rel="noopener"
            >
              🔗 Mở liên kết
            </Button>
          )}
          {imageSrc && (
            <Button variant="outlined" color="error" onClick={resetAll}>
              🗑 Xóa / Clear
            </Button>
          )}
        </Stack>
      )}
    </Box>
  );
}
