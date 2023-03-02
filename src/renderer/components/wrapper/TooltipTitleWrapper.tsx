import type { ReactNode } from 'react';

export const TooltipTitleWrapper = ({ label }: { label: ReactNode }) => (
  <div style={{ fontSize: '1.2rem', fontWeight: '400' }}>{label}</div>
);
