import type { ReactNode } from 'react';
import Container from '@mui/material/Container';

export const AppContainer = ({
  paddingTop,
  children
}: {
  paddingTop: string;
  children: ReactNode;
}) => (
  <Container
    sx={{
      height: '100%',
      width: '100%',
      paddingTop
    }}
  >
    {children}
  </Container>
);
