import type { CSSProperties, ReactNode } from 'react';
import Paper from '@mui/material/Paper';

type PaperContainerProps = Pick<
  CSSProperties,
  | 'width'
  | 'height'
  | 'backgroundColor'
  | 'alignItems'
  | 'justifyContent'
  | 'rowGap'
>;

export const PaperContainer = ({
  width = 400,
  height = 400,
  alignItems = 'center',
  justifyContent = 'flex-start',
  rowGap = '2rem',
  elevation = 5,
  children
}: PaperContainerProps & { elevation?: number; children: ReactNode }) => {
  return (
    <Paper
      sx={{
        width,
        height,
        display: 'flex',
        flexDirection: 'column',
        alignItems,
        justifyContent,
        rowGap,
        borderRadius: 0
      }}
      elevation={elevation}
    >
      {children}
    </Paper>
  );
};
