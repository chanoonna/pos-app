import styled from 'styled-components';
import { colors } from 'style/theme';

interface UnderLinedInputProps {
  placeholder: string;
  className?: string;
  type?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const UnderLinedInput = ({
  placeholder,
  className,
  type = 'text',
  value,
  onChange
}: UnderLinedInputProps) => {
  return (
    <StyledInput
      className={className}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

const StyledInput = styled.input`
  height: 2.5rem;
  width: 15rem;
  color: ${colors.mediumGray1};
  border: none;
  border-bottom: 2px solid ${colors.lightBlue1};
  font-size: 1rem;
  padding-left: 0.5rem;

  &:focus {
    outline: none;
    border-bottom-color: ${colors.deepBlue1};
  }

  &::placeholder {
    user-select: none;
    color: ${colors.lightGray1};
  }
`;
