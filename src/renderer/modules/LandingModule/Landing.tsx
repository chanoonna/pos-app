import { PaperContainer } from 'components/container/PaperContainer';
import { PageContainer } from 'components/container/PageContainer';
import { LandingBody } from './LandingBody';

export const Landing = () => {
  return (
    <PageContainer alignItems="center">
      <PaperContainer alignItems="center" justifyContent="center" height={500}>
        <LandingBody />
      </PaperContainer>
    </PageContainer>
  );
};
