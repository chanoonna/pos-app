import type { CSSProperties, ReactNode } from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

type PaperContainerProps = Pick<
  CSSProperties,
  | 'width'
  | 'height'
  | 'backgroundColor'
  | 'alignItems'
  | 'justifyContent'
  | 'rowGap'
>;

export const PaperHoverContainer = ({
  width = 400,
  height = 400,
  alignItems = 'center',
  justifyContent = 'flex-start',
  rowGap = '2rem',
  elevation = 5,
  children
}: PaperContainerProps & { elevation?: number; children: ReactNode }) => {
  return (
    <HoveredPaper
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
    </HoveredPaper>
  );
};

const HoveredPaper = styled(Paper)(({ theme }) => ({
  transition: 'box-shadow 0.3s',
  '&:hover': {
    boxShadow: `2px 5px 10px ${theme.palette.grey[800]}`
  }
}));
