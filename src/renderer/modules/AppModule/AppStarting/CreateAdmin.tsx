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
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckIcon from '@mui/icons-material/Check';
import FormHelperText from '@mui/material/FormHelperText';
import Zoom from '@mui/material/Zoom';
import { SizeAppliedText } from 'components/typography';
import { PageContainer, FlexContainer } from 'components/container';
import { NoMaxWidthTooltip } from 'components/tooltip';

/* ------------------------------------ - ----------------------------------- */

export const CreateAdmin = ({
  labels,
  uiSize,
  username,
  password,
  confirmPassword,
  isPasswordEmpty,
  isPasswordValid,
  onUsernameChange,
  onPasswordChange,
  onConfirmPasswordChange
}: {
  labels: Labels;
  uiSize: UiSize;
  username: string;
  password: string;
  confirmPassword: string;
  isPasswordEmpty: boolean;
  isPasswordValid: boolean;
  onUsernameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onConfirmPasswordChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <PageContainer
      marginTop="-5rem"
      flexDirection="column"
      justifyContent="center"
    >
      <SizeAppliedText textTypeVariant="heading" uiSize={uiSize}>
        {labels.createAdmin}
      </SizeAppliedText>
      <FlexContainer
        width="25rem"
        height="fit-content"
        flexDirection="column"
        rowGap="1rem"
      >
        <NoMaxWidthTooltip
          title={
            <SizeAppliedText textTypeVariant="tooltip" uiSize={uiSize}>
              {labels.usernameTooltip}
            </SizeAppliedText>
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
        <FormControl
          error={!isPasswordEmpty && !isPasswordValid}
          fullWidth
          variant="standard"
        >
          <Input
            id="confirm-password"
            type={isPasswordVisible ? 'text' : 'password'}
            value={confirmPassword}
            placeholder={labels.confirmPassword}
            onChange={onConfirmPasswordChange}
            startAdornment={
              <InputAdornment position="start">
                <ErrorOutlineIcon sx={{ mr: 1 }} />
              </InputAdornment>
            }
            endAdornment={
              !isPasswordEmpty && isPasswordValid ? (
                <InputAdornment position="end">
                  <CheckIcon color="success" sx={{ mr: 1 }} />
                </InputAdornment>
              ) : undefined
            }
          />
          <FormHelperText id="confirm-password-helper">
            <SizeAppliedText
              marginLeft="2.5rem"
              textTypeVariant="helper"
              uiSize={uiSize}
              minHeight="1.5rem"
            >
              {!isPasswordEmpty && !isPasswordValid
                ? labels.confirmPasswordError
                : ''}
            </SizeAppliedText>
          </FormHelperText>
        </FormControl>
      </FlexContainer>
    </PageContainer>
  );
};
