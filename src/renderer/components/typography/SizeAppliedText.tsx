/* ---------------------------------- types --------------------------------- */
import type { ReactNode, CSSProperties } from 'react';
import type { TextTypeVariant, UiSize } from 'style/types';

/* --------------------------------- imports -------------------------------- */
import Typography from '@mui/material/Typography';

import { fontSize } from 'style/theme';

export const SizeAppliedText = ({
  uiSize,
  textTypeVariant,
  children,
  ...styles
}: Omit<CSSProperties, 'fontSize' | 'translate'> & {
  uiSize: UiSize;
  textTypeVariant: TextTypeVariant;
  children: ReactNode;
}) => (
  <Typography {...styles} fontSize={fontSize[textTypeVariant][uiSize]}>
    {children}
  </Typography>
);
