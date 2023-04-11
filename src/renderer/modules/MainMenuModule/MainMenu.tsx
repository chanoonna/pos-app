import { FlexContainer } from 'renderer/components/container/FlexContainer';
import { Menues } from './Menus';

import { useAppContext } from 'renderer/modules/RootModule';

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
