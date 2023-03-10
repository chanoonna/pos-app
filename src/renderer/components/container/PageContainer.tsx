import type { ReactNode, CSSProperties } from 'react';
import Container from '@mui/material/Container';

type PageContainerProps = Pick<
  CSSProperties,
  | 'justifyContent'
  | 'alignItems'
  | 'height'
  | 'width'
  | 'marginTop'
  | 'flexDirection'
> & {
  children: ReactNode;
};

export const PageContainer = ({
  children,
  justifyContent = 'center',
  alignItems = 'center',
  height = '100%',
  width = '100%',
  flexDirection = 'row',
  marginTop
}: PageContainerProps) => (
  <Container
    sx={{
      display: 'flex',
      justifyContent,
      alignItems,
      flexDirection,
      height,
      width,
      marginTop
    }}
  >
    {children}
  </Container>
);
