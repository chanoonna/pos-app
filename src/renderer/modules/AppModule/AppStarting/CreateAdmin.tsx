/* ---------------------------------- types --------------------------------- */
import type { ChangeEvent } from 'react';
import type { UiSize } from 'style/types';
import type { Labels } from './constants';

/* --------------------------------- imports -------------------------------- */

import { useState } from 'react';

import Input from '@mui/material/Input';
import LockIcon from '@mui/icons-material/Lock';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Zoom from '@mui/material/Zoom';
import { TextField } from 'components/typography';
import { PageContainer, FlexContainer } from 'components/container';
import { HeadingLabel } from 'components/typography';
import { NoMaxWidthTooltip } from 'components/tooltip';

/* ------------------------------------ - ----------------------------------- */

export const CreateAdmin = ({
  labels,
  uiSize,
  username,
  password,
  onUsernameChange,
  onPasswordChange
}: {
  labels: Labels;
  uiSize: UiSize;
  username: string;
  password: string;
  onUsernameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <PageContainer
      marginTop="-5rem"
      flexDirection="column"
      justifyContent="center"
    >
      <HeadingLabel uiSize={uiSize}>{labels.createAdmin}</HeadingLabel>
      <FlexContainer
        width="25rem"
        height="fit-content"
        flexDirection="column"
        rowGap="1rem"
      >
        <NoMaxWidthTooltip
          title={
            <TextField uiSize={uiSize}>{labels.usernameTooltip}</TextField>
          }
          placement="top"
          TransitionComponent={Zoom}
          sx={{
            size: '1rem'
          }}
        >
          <FormControl fullWidth variant="standard">
            <Input
              id="username"
              type="text"
              disabled
              value={username}
              placeholder={labels.username}
              onChange={onUsernameChange}
              startAdornment={
                <InputAdornment position="start">
                  <ManageAccountsIcon sx={{ mr: 1 }} />
                </InputAdornment>
              }
            />
          </FormControl>
        </NoMaxWidthTooltip>
        <FormControl fullWidth variant="standard">
          <Input
            id="password"
            type={isPasswordVisible ? 'text' : 'password'}
            value={password}
            placeholder={labels.password}
            onChange={onPasswordChange}
            startAdornment={
              <InputAdornment position="start">
                <LockIcon sx={{ mr: 1 }} />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  sx={{ ml: 1 }}
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </FlexContainer>
    </PageContainer>
  );
};
