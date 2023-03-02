import type { ReactNode } from 'react';
import Container from '@mui/material/Container';
import { colors } from 'style/theme';

export const NavContainer = ({ children }: { children: ReactNode }) => (
  <Container
    sx={{
      position: 'fixed',
      height: '4rem',
      width: '100%',
      maxWidth: 'unset',
      display: 'flex',
      justifyContent: 'space-between',
      colors: colors.backgroundBlack4
    }}
  >
    {children}
  </Container>
);
