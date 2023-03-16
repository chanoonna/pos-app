import type { ReactNode } from 'react';
import Container from '@mui/material/Container';

export const AppContainer = ({ children }: { children: ReactNode }) => (
  <Container
    sx={{
      height: '100%',
      width: '100%'
    }}
  >
    {children}
  </Container>
);
