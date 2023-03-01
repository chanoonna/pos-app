import type { ReactNode } from 'react';
import FormGroup from '@mui/material/FormGroup';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';

import { colors } from 'style/theme';

interface StandardInputWithLabelProps {
  id: string;
  type?: 'text' | 'password';
  label: ReactNode;
  value: string;
  endAdornment?: JSX.Element;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const StandardInputWithLabel = ({
  id,
  type = 'text',
  label,
  value,
  onChange,
  endAdornment
}: StandardInputWithLabelProps) => (
  <FormGroup>
    <InputLabel
      sx={{
        color: colors.white
      }}
      htmlFor={id}
    >
      {label}
    </InputLabel>
    <Input
      sx={{
        color: colors.white,
        ':before': {
          borderBottomColor: colors.white
        },
        ':hover:not(.Mui-disabled):before': {
          borderBottomColor: colors.lightBlue1
        }
      }}
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      endAdornment={endAdornment}
    />
  </FormGroup>
);
