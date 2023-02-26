import type { ReactNode } from 'react';
import styled from 'styled-components';
import { colors } from 'style/theme';

interface FilledButtonProps {
  className?: string;
  label: ReactNode;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const FilledButton = ({
  className,
  label,
  disabled = false,
  onClick
}: FilledButtonProps) => {
  return (
    <StyledFilledButton
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </StyledFilledButton>
  );
};

const StyledFilledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.5rem;
  width: 15.5rem;
  border: none;
  border-radius: 5px;
  color: ${colors.white};
  font-size: 1rem;
  background-color: ${colors.mediumBlue1};
  outline: none;

  &:hover,
  :focus {
    background-color: ${colors.deepBlue1};
  }

  &.disabled {
    background-color: ${colors.lightBlue1};
    cursor: not-allowed;
  }
`;
