import styled from 'styled-components';
import { Login } from './Login';

export const Entry = () => {
  return (
    <MainContainer>
      <Login />
    </MainContainer>
  );
};

const MainContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
