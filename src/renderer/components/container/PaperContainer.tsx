import type { CSSProperties, ReactNode } from 'react';
import Paper from '@mui/material/Paper';
import { colors } from 'style/theme';

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
  backgroundColor = colors.charcoalGray1,
  children
}: PaperContainerProps & { children: ReactNode }) => {
  return (
    <Paper
      sx={{
        width,
        height,
        backgroundColor,
        display: 'flex',
        flexDirection: 'column',
        alignItems,
        justifyContent,
        rowGap: '2rem',
        borderRadius: 0
      }}
      elevation={5}
    >
      {children}
    </Paper>
  );
};
