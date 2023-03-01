import type { ReactNode } from 'react';
import Button from '@mui/material/Button';
import { colors } from 'style/theme';

interface FilledButtonProps {
  type?: 'submit' | 'reset' | 'button' | undefined;
  disabled?: boolean;
  fullWidth?: boolean;
  label: ReactNode;
}

export const FilledButton = ({
  type = 'button',
  disabled,
  fullWidth = true,
  label
}: FilledButtonProps) => (
  <Button
    type={type}
    variant="contained"
    disabled={disabled}
    fullWidth={fullWidth}
    sx={{
      ':disabled': {
        color: colors.mediumGray1,
        backgroundColor: colors.charcoalGray1,
        boxShadow: 1
      },
      color: colors.white,
      boxShadow: 1
    }}
  >
    {label}
  </Button>
);
