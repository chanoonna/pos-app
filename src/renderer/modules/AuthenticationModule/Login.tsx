import { useState, ChangeEvent, useContext } from 'react';
import { Module } from 'modules/types';
import { colors } from 'style/theme';
import { UnderLinedInput } from 'components/input/UnderlinedInput';
import { FilledButton } from 'components/button/FilledButton';
import { AppContext } from 'modules/App/AppContextProvider';
import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components';
import cn from 'classnames';

/* ---------------------------------- Types --------------------------------- */
import type { FormEvent } from 'react';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const { navigateTo } = useContext(AppContext);

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
    navigateTo(Module.Menu);
  };

  const isLoginButtonDisabled = hasNoUsername || hasNoPassword || isLoggingIn;

  return (
    <StyledLogin>
      <section className="login-container">
        <header className="header-text">LOGIN</header>
        <form
          id="login-form"
          className="form-container"
          onSubmit={onSubmitLoginForm}
        >
          <div className="input-container">
            <UnderLinedInput
              className="username-input"
              type="text"
              placeholder="Username"
              value={username}
              onChange={onUsernameChange}
            />
            <UnderLinedInput
              className="password-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={onPasswordChange}
            />
          </div>
          <FilledButton
            className={cn('login-button', {
              disabled: isLoginButtonDisabled
            })}
            disabled={isLoginButtonDisabled}
            label={
              isLoggingIn ? (
                <CircularProgress size={28} thickness={4} />
              ) : (
                'LOGIN'
              )
            }
          ></FilledButton>
        </form>
      </section>
    </StyledLogin>
  );
};

/* --------------------------------- Styles --------------------------------- */

const StyledLogin = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: ${colors.backgroupBlack};

  .login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 400px;
    width: 400px;
    border-radius: 10px;
    background-color: ${colors.extraLightGray1};
    row-gap: 3rem;
  }

  .header-text {
    font-size: 1.5rem;
    color: ${colors.darkGray1};
    cursor: default;
    user-select: none;
  }

  .form-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 3rem;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 0.5rem;
  }
`;
