/* ---------------------------------- types --------------------------------- */
import type { UiSize } from 'style/types';
import type { Labels } from './constants';

export const BeforeStarting = ({
  labels,
  uiSize
}: {
  labels: Labels;
  uiSize: UiSize;
}) => {
  return <div>Before Starting</div>;
};
