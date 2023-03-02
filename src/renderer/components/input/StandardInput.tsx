import type { ReactNode } from 'react';
import FormGroup from '@mui/material/FormGroup';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';

import { colors } from 'style/theme';

interface StandardInputProps {
  id: string;
  type?: 'text' | 'password';
  value: string;
  placeholder: string;
  startAdornment?: JSX.Element;
  endAdornment?: JSX.Element;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const StandardInput = ({
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  startAdornment,
  endAdornment
}: StandardInputProps) => (
  <Input
    sx={{
      color: colors.white,
      height: '2rem',
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
    placeholder={placeholder}
    onChange={onChange}
    startAdornment={startAdornment}
    endAdornment={endAdornment}
  />
);
