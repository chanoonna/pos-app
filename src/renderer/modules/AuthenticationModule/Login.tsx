/* ---------------------------------- types --------------------------------- */
import type { FormEvent, ChangeEvent } from 'react';

/* -------------------------------- constants ------------------------------- */
import { APP_PAGE } from '../constants';
import { labels } from './constants';

/* --------------------------------- imports -------------------------------- */

import { useState } from 'react';
import { colors } from 'style/theme';
import { useAppContext } from 'modules/AppModule';

import CircularProgress from '@mui/material/CircularProgress';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { SizeAppliedText } from 'components/typography';
import { PaperContainer } from 'components/container/PaperContainer';
import { FlexContainer } from 'components/container/FlexContainer';
import { FilledButton } from 'components/button/FilledButton';
import { StandardInput } from 'components/input/StandardInput';
import { LanguageSetting } from 'components/menus/LanguageSetting';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const {
    navigateTo,
    logOut,
    user: { language }
  } = useAppContext();

  const toggleVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const loginLabels = labels[language].Login;

  const hasNoUsername = username.length === 0;
  const hasNoPassword = password.length === 0;

  const onUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const onSubmitLoginForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigateTo(APP_PAGE.MENU);
  };

  const isLoginButtonDisabled = hasNoUsername || hasNoPassword || isLoggingIn;

  return (
    <PaperContainer>
      <FlexContainer height="fit-content" justifyContent="flex-end">
        <LanguageSetting />
      </FlexContainer>
      <SizeAppliedText textTypeVariant="heading" uiSize="large">
        {loginLabels.login}
      </SizeAppliedText>
      <form
        id="login-form"
        className="form-container"
        onSubmit={onSubmitLoginForm}
        style={{
          display: 'flex',
          width: '60%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          rowGap: '3rem'
        }}
      >
        <FlexContainer flexDirection="column" rowGap={'1rem'}>
          <FormControl fullWidth variant="standard">
            <StandardInput
              id="standard-adornment-username"
              placeholder={loginLabels.username}
              value={username}
              onChange={onUsernameChange}
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle sx={{ color: colors.white, mr: 1 }} />
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl fullWidth variant="standard">
            <StandardInput
              id="standard-adornment-password"
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder={loginLabels.password}
              value={password}
              onChange={onPasswordChange}
              startAdornment={
                <InputAdornment position="start">
                  <LockIcon sx={{ color: colors.white, mr: 1 }} />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    sx={{ color: colors.white, ml: 1 }}
                    onClick={toggleVisibility}
                  >
                    {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </FlexContainer>
        <FilledButton
          type="submit"
          disabled={isLoginButtonDisabled}
          label={
            isLoggingIn ? (
              <CircularProgress
                size={28}
                thickness={4}
                sx={{ color: colors.white }}
              />
            ) : (
              loginLabels.login
            )
          }
        />
      </form>
    </PaperContainer>
  );
};
