import { SettingsModal } from 'SettingsModule/SettingsModal';
import { UserInfoModal } from 'renderer/modules/SettingsModule/UserInfoModal/UserInfoModal';

export const ModalContainer = () => {
  return (
    <>
      <SettingsModal />
      <UserInfoModal />
    </>
  );
};
