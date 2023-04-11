/* ---------------------------------- types --------------------------------- */
import type { FormEvent, ChangeEvent } from 'react';
import type { LanguageCode } from 'SettingsModule/types';

/* -------------------------------- constants ------------------------------- */
import { labels } from './constants';

/* --------------------------------- imports -------------------------------- */

import { useState, useEffect } from 'react';
import { useAppContext } from 'renderer/modules/RootModule';

import CircularProgress from '@mui/material/CircularProgress';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';

import { SizeAppliedText } from 'components/typography';
import { PaperContainer, FlexContainer } from 'components/container';
import { LoginLanguageSelector } from './LoginLanguageSelector';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    user,
    settingsState: { language, uiSize, colorTheme },
    isLoggingIn,
    isLoggingInError,
    navigateTo,
    logIn,
    updateSettings
  } = useAppContext();

  const toggleVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const loginLabels = labels[language];

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
    logIn({
      username,
      password
    });
  };
  const onSelectLanguage = (newLanguage: LanguageCode) => {
    updateSettings({
      language: newLanguage
    });
  };

  useEffect(() => {
    setUsername(user.username);
  }, [user.username]);

  const isLoginButtonDisabled = hasNoUsername || hasNoPassword || isLoggingIn;

  return (
    <FlexContainer>
      <PaperContainer>
        <FlexContainer height="fit-content" justifyContent="flex-end">
          <LoginLanguageSelector onSelectLanguage={onSelectLanguage} />
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
            width: '80%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            rowGap: '3rem'
          }}
        >
          <FlexContainer flexDirection="column" rowGap={'1rem'}>
            <FormControl fullWidth variant="standard">
              <Input
                id="standard-adornment-username"
                type="text"
                value={username}
                placeholder={loginLabels.username}
                onChange={onUsernameChange}
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle sx={{ mr: 1 }} />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl fullWidth variant="standard">
              <Input
                id="standard-adornment-password"
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder={loginLabels.password}
                value={password}
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
                      onClick={toggleVisibility}
                    >
                      {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              ></Input>
            </FormControl>
          </FlexContainer>
          <FlexContainer>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoginButtonDisabled}
              fullWidth
            >
              {isLoggingIn ? (
                <CircularProgress size={28} thickness={4} />
              ) : (
                loginLabels.login
              )}
            </Button>
          </FlexContainer>
        </form>
      </PaperContainer>
    </FlexContainer>
  );
};
