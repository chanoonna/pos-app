import type { AppContextDataState } from '../useAppContextData/types';
import type { AppPage } from 'modules/types';

/* --------------------------------- imports -------------------------------- */
import CircularProgress from '@mui/material/CircularProgress';
import { PageContainer } from 'components/container/PageContainer';
import { colors } from 'style/theme';

export const AppStarting = ({
  state,
  navigateTo
}: {
  state: AppContextDataState;
  navigateTo: (nextPage: AppPage) => void;
}) => {
  return (
    <PageContainer alignItems="center" flexDirection="column">
      <CircularProgress
        size={38}
        thickness={5}
        sx={{ color: colors.mediumBlue1 }}
      />
    </PageContainer>
  );
};
