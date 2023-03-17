/* ---------------------------------- types --------------------------------- */
import type { ReactNode } from 'react';
import type { TextVariant, UiSize } from 'style/types';

/* --------------------------------- imports -------------------------------- */
import Typography from '@mui/material/Typography';

export const SizeAppliedText = ({
  uiSize,
  variant,
  children
}: {
  uiSize: UiSize;
  variant: TextVariant;
  children: ReactNode;
}) => (
  <Typography
    sx={{
      fontSize: fontSize[variant][uiSize]
    }}
  >
    {children}
  </Typography>
);

const headingTextFontSize = {
  medium: '1.5rem',
  large: '1.75rem',
  extraLarge: '2rem'
};

const menuTextFontSize = {
  medium: '1rem',
  large: '1.15rem',
  extraLarge: '1.3rem'
};

const bodyTextFontSize = {
  medium: '1rem',
  large: '1.15rem',
  extraLarge: '1.3rem'
};

const tooltipTextFontSize = {
  medium: '0.9rem',
  large: '1rem',
  extraLarge: '1.1rem'
};

const fontSize: Record<TextVariant, Record<UiSize, string>> = {
  heading: headingTextFontSize,
  menu: menuTextFontSize,
  body: bodyTextFontSize,
  tooltip: tooltipTextFontSize
};
