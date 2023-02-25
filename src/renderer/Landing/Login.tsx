import { useState } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { colors } from 'Style/theme';
import CircularProgress from '@mui/material/CircularProgress';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const hasNoUsername = username.length === 0;
  const hasNoPassword = password.length === 0;

  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const isLoginButtonDisabled = hasNoUsername || hasNoPassword || isLoggingIn;

  return (
    <StyledLogin>
      <section className="login-container">
        <header className="header-text">LOGIN</header>
        <div className="input-container">
          <input
            className="login-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={onUsernameChange}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={onPasswordChange}
          />
        </div>
        <button
          className={cn('login-button', {
            disabled: isLoginButtonDisabled
          })}
          disabled={isLoginButtonDisabled}
        >
          {isLoggingIn ? <CircularProgress size={28} thickness={4} /> : 'LOGIN'}
        </button>
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

  .input-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 0.5rem;
  }

  .login-input {
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
  }

  .login-button {
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
  }
`;
