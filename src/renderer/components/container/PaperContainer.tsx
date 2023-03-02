import type { ReactNode } from 'react';
import Paper from '@mui/material/Paper';
import { colors } from 'style/theme';

interface PaperContainer {
  width?: number | string;
  height?: number | string;
  backgroundColor?: string;
}

export const PaperContainer = ({
  width = 400,
  height = 400,
  backgroundColor = colors.charcoalGray1,
  children
}: PaperContainer & { children: ReactNode }) => {
  return (
    <Paper
      sx={{
        width,
        height,
        backgroundColor,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        rowGap: '2rem',
        borderRadius: 0
      }}
      elevation={5}
    >
      {children}
    </Paper>
  );
};
