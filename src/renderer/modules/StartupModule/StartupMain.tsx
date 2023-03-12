/* ---------------------------------- types --------------------------------- */

/* -------------------------------- constants ------------------------------- */
import { CONNECT_DB } from 'utils/requests/initialization/constants';

/* --------------------------------- imports -------------------------------- */
import { useEffect } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import { PageContainer } from 'components/container/PageContainer';
import { colors } from 'style/theme';
import { useInitializationRequest } from 'utils/requests/initialization/useInitializationRequest';

export const StartupMain = () => {
  const { state, callApi } = useInitializationRequest();

  console.log(state);

  useEffect(() => {
    if (!state.isDatabaseConnected) {
      callApi(CONNECT_DB);
    }
  }, [callApi, state.isDatabaseConnected]);

  return (
    <PageContainer alignItems="center" flexDirection="column">
      <CircularProgress
        size={38}
        thickness={5}
        sx={{ color: colors.mediumBlue1 }}
      />
      <br />
      Connecting to Database...
    </PageContainer>
  );
};
