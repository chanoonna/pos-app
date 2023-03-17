/* ---------------------------------- types --------------------------------- */
import type { ReactNode } from 'react';
import type { UiSize } from 'style/types';

/* -------------------------------- constants ------------------------------- */
import { UI_SIZE } from 'style/constants';

/* ------------------------------------ - ----------------------------------- */

export const HeadingLabel = ({
  uiSize,
  children
}: {
  uiSize: UiSize;
  children: ReactNode;
}) => {
  if (uiSize === UI_SIZE.EXTRA_LARGE) {
    return <h1>{children}</h1>;
  } else if (uiSize === UI_SIZE.LARGE) {
    return <h2>{children}</h2>;
  } else {
    return <h3>{children}</h3>;
  }
};
