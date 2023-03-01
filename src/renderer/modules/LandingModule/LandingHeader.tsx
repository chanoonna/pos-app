import styled from 'styled-components';
import { colors } from 'style/theme';

export const LandingHeader = () => {
  return (
    <StyledLandingHeader>
      <h2>Store Name</h2>
    </StyledLandingHeader>
  );
};

const StyledLandingHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  max-width: 500px;
  height: 5rem;
  background-color: ${colors.extraLightGray1};
  border-radius: 10px;

  h2 {
    font-weight: 400;
  }
`;
