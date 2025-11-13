// components/ImageUpload.js
import React from 'react';
import { Box, Button } from '@mui/material';
import { useDropzone } from 'react-dropzone';

const ImageUpload = ({ onDrop }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: true
  });

  return (
    <Box 
      {...getRootProps()} 
      sx={{
        border: '2px dashed #1976d2',
        borderRadius: 2,
        padding: 3,
        textAlign: 'center',
        cursor: 'pointer',
        marginBottom: 2
      }}
    >
      <input {...getInputProps()} />
      <Button variant="outlined">Drag & Drop Images or Click to Select</Button>
    </Box>
  );
};

export default ImageUpload;