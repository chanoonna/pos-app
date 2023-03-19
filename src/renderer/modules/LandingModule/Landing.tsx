import { PaperContainer } from 'components/container/PaperContainer';
import { FlexContainer } from 'renderer/components/container/FlexContainer';
import { LandingBody } from './LandingBody';

export const Landing = () => {
  return (
    <FlexContainer alignItems="center">
      <PaperContainer alignItems="center" justifyContent="center" height={500}>
        {/* <LandingBody /> */}
      </PaperContainer>
    </FlexContainer>
  );
};
