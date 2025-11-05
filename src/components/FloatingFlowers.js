'use client';

import { useEffect, useState } from 'react';
import { Box, keyframes } from '@mui/system';

export default function FloatingFlowers() {
  const [flowers, setFlowers] = useState([]);

  // Keyframes animation
  const floatUpRotate = keyframes`
    0% {
      transform: translateY(0) scale(0.5) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    100% {
      transform: translateY(-120vh) scale(1.2) rotate(360deg);
      opacity: 0;
    }
  `;

  useEffect(() => {
    const flowerCount = 50;
    //const flowerEmojis = ['🌸', '🌺', '🌹'];
    const flowerEmojis = ['💖', '💕', '🥰'];

    for (let i = 0; i < flowerCount; i++) {
      const delay = Math.random() * 3000; // delay 0-3s

      setTimeout(() => {
        const id = Math.random().toString(36).slice(2, 11);

        setFlowers(prev => [
          ...prev,
          {
            id,
            left: Math.random() * 100,
            size: 20 + Math.random() * 24,
            duration: 5 + Math.random() * 2, // 5-7s
            emoji: flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)],
          }
        ]);

        // Xóa hoa sau khi bay xong (9s)
        setTimeout(() => {
          setFlowers(prev => prev.filter(f => f.id !== id));
        }, 9000);
      }, delay);
    }
  }, []);

  return (
    <>
      {flowers.map(f => (
        <Box
          key={f.id}
          sx={{
            position: 'absolute',
            bottom: 0,
            left: `${f.left}%`,
            fontSize: f.size,
            animation: `${floatUpRotate} ${f.duration}s linear forwards`,
            pointerEvents: 'none',
          }}
        >
          {f.emoji}
        </Box>
      ))}
    </>
  );
}