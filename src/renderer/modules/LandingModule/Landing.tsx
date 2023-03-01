import styled from 'styled-components';
import { LandingHeader } from './LandingHeader';
import { LandingBody } from './LandingBody';
import { colors } from 'style/theme';

export const Landing = () => {
  return (
    <StyledLanding>
      <LandingHeader />
      <LandingBody />
    </StyledLanding>
  );
};

const StyledLanding = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  row-gap: 2rem;
  padding-top: 4rem;
  background-color: ${colors.mediumGray1};
`;
