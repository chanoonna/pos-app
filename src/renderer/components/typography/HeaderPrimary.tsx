import type { ReactNode } from 'react';
import Typography from '@mui/material/Typography';
import { colors } from 'style/theme';

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
        fontWeight
      }}
    >
      {label}
    </Typography>
  );
};
