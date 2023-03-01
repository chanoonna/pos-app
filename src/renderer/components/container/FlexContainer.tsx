import type { ReactNode } from 'react';
import Box from '@mui/material/Box';

interface FlexContainerProps {
  width?: number | string;
  height?: number | string;
  flexDirection?: 'row' | 'column';
  rowGap?: number | string;
  columnGap?: number | string;
  justifyContent?:
    | 'flex-end'
    | 'flex-start'
    | 'space-evenly'
    | 'center'
    | 'space-between';
  alignItems?:
    | 'flex-end'
    | 'flex-start'
    | 'space-evenly'
    | 'center'
    | 'space-between';
}

export const FlexContainer = ({
  width = '100%',
  height = '100%',
  flexDirection = 'row',
  justifyContent = 'center',
  alignItems = 'center',
  rowGap = 0,
  columnGap = 0,
  children
}: FlexContainerProps & { children: ReactNode }) => {
  return (
    <Box
      sx={{
        width,
        height,
        display: 'flex',
        flexDirection,
        justifyContent,
        alignItems,
        rowGap,
        columnGap
      }}
    >
      {children}
    </Box>
  );
};
