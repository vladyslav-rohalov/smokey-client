'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { Container } from '@mui/material';

export default function Loading({ error }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Container
      maxWidth="xl"
      sx={{
        position: 'relative',
        minHeight: 500,
        px: 2,
        pointerEvents: 'none',
      }}
    >
      <h1>SOMETHING WENT WORNG...</h1>
      <Image
        src="/error.png"
        alt="error image"
        fill={true}
        sizes="100%"
        style={{ height: '100%', objectFit: 'contain', zIndex: -1 }}
      />
    </Container>
  );
}
