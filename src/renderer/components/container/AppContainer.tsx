import type { ReactNode } from 'react';
import Container from '@mui/material/Container';

export const AppContainer = ({ children }: { children: ReactNode }) => (
  <Container
    sx={{
      height: '100%',
      width: '100%',
      paddingLeft: '0 !important',
      paddingRight: '0 !important'
    }}
  >
    {children}
  </Container>
);
