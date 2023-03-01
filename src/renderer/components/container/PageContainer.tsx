import type { ReactNode } from 'react';
import Container from '@mui/material/Container';

export const PageContainer = ({ children }: { children: ReactNode }) => (
  <Container
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%'
    }}
  >
    {children}
  </Container>
);
