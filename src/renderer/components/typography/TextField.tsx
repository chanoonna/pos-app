/* ---------------------------------- types --------------------------------- */
import type { ReactNode } from 'react';
import type { UiSize } from 'style/types';

/* -------------------------------- constants ------------------------------- */
import { UI_SIZE } from 'style/constants';

/* --------------------------------- imports -------------------------------- */
import Typography from '@mui/material/Typography';

export const TextField = ({
  uiSize,
  children
}: {
  uiSize: UiSize;
  children: ReactNode;
}) => (
  <Typography
    sx={{
      fontSize: fontSize[uiSize]
    }}
  >
    {children}
  </Typography>
);

const fontSize = {
  [UI_SIZE.MEDIUM]: '0.8rem',
  [UI_SIZE.LARGE]: '0.9rem',
  [UI_SIZE.EXTRA_LARGE]: '1rem'
};
