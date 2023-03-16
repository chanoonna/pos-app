import type { ReactNode, CSSProperties } from 'react';
import Container from '@mui/material/Container';

type PageContainerProps = CSSProperties & {
  children: ReactNode;
};

export const PageContainer = ({
  children,
  display = 'flex',
  justifyContent = 'center',
  alignItems = 'center',
  height = '100%',
  width = '100%',
  flexDirection = 'row',
  ...styles
}: PageContainerProps) => (
  <Container
    sx={{
      display,
      justifyContent,
      alignItems,
      flexDirection,
      height,
      width,
      ...styles
    }}
  >
    {children}
  </Container>
);
