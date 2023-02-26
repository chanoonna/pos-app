import styled from 'styled-components';
import { Login } from './Login';

export const Authentication = () => {
  return (
    <AuthContainer>
      <Login />
    </AuthContainer>
  );
};

const AuthContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
