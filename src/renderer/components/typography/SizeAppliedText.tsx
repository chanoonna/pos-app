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
  component = 'p',
  ...styles
}: Omit<CSSProperties, 'fontSize' | 'translate'> & {
  uiSize: UiSize;
  textTypeVariant: TextTypeVariant;
  component?: 'p' | 'div' | 'span';
  children: ReactNode;
}) => (
  <Typography
    component={component}
    {...styles}
    fontSize={fontSize[textTypeVariant][uiSize]}
  >
    {children}
  </Typography>
);
