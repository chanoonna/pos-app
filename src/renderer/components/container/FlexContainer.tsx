import type { ReactNode, CSSProperties } from 'react';
import Container from '@mui/material/Container';

type PageContainerProps = CSSProperties & {
  children: ReactNode;
};

export const FlexContainer = ({
  children,
  display = 'flex',
  justifyContent = 'center',
  alignItems = 'center',
  height = '100%',
  width = '100%',
  flexDirection = 'row',
  padding = '0 !important',
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
      padding,
      ...styles
    }}
  >
    {children}
  </Container>
);
