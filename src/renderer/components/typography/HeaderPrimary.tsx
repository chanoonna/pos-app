import type { ReactNode } from 'react';
import Typography from '@mui/material/Typography';
import { colors, fonts } from 'style/theme';

interface HeaderPrimaryProps {
  label: ReactNode;
  color?: string;
  fontSize?: string;
  fontWeight?: number;
}

export const HeaderPrimary = ({
  label,
  color = colors.white,
  fontSize = '1.5rem',
  fontWeight = 400
}: HeaderPrimaryProps) => {
  return (
    <Typography
      sx={{
        color,
        fontSize,
        fontWeight,
        fontFamily: fonts.primary,
        userDrag: 'none',
        userSelect: 'none'
      }}
    >
      {label}
    </Typography>
  );
};
