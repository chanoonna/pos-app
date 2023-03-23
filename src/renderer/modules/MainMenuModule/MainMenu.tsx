import { PaperContainer } from 'components/container/PaperContainer';
import { FlexContainer } from 'renderer/components/container/FlexContainer';
import { Menues } from './Menus';

import { useAppContext } from 'AppModule';

export const MainMenu = () => {
  const {
    settingsState: { language, uiSize }
  } = useAppContext();
  return (
    <FlexContainer alignItems="center">
      <Menues language={language} uiSize={uiSize} />
    </FlexContainer>
  );
};
