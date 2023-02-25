import { useState } from 'react';
import styled from 'styled-components';
import cn from 'classnames';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const hasNoUsername = username.length === 0;
  const hasNoPassword = password.length === 0;

  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

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
            disabled: hasNoUsername || hasNoPassword
          })}
          disabled={hasNoUsername || hasNoPassword}
        >
          LOGIN
        </button>
      </section>
    </StyledLogin>
  );
};

const StyledLogin = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #d0d0d0;

  .login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 400px;
    width: 400px;
    border-radius: 10px;
    background-color: #f4f4f4;
    border: solid 2px #c4c4c4;
    row-gap: 3rem;
  }

  .header-text {
    font-size: 1.5rem;
    color: #808080;
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
    color: #808080;
    border: none;
    border-bottom: 2px solid #4b99f9;
    font-size: 1rem;
    padding-left: 0.5rem;

    &:focus {
      outline: none;
      border-bottom-color: #1d67c0;
    }

    &::placeholder {
      user-select: none;
    }
  }

  .login-button {
    height: 2.5rem;
    width: 15.5rem;
    border: none;
    border-radius: 5px;
    color: #ffffff;
    font-size: 1rem;
    background-color: #4b99f9;

    &:hover {
      background-color: #1d67c0;
    }

    &.disabled {
      background-color: #88ccff;
      cursor: not-allowed;
    }
  }
`;
