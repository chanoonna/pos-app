/* -------------------------------- constants ------------------------------- */
import { labels } from './constants';

/* --------------------------------- imports -------------------------------- */
import { useState, useEffect } from 'react';

import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';

import { useAppContext } from 'AppModule';
import { UserInfoPage } from './UserInfoPage';
import { APP_PAGE } from 'renderer/modules/constants';

export const UserInfoModal = () => {
  const [newUsername, setNewUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const {
    user: { id, username, lastLogin },
    currentPage,
    settingsState: { language, uiSize },
    modalState: { isMyInfoModalOpen: isOpen },
    setMyInfoModalOpen,
    updateMe
  } = useAppContext();

  const fixedUserName = username === 'admin';

  const closeMyInforModal = () => {
    setMyInfoModalOpen(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUsername(e.target.value);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };
  const onChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };
  const onChangeCurrentPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(e.target.value);
  };

  const handleUpdateUsername = () => {
    updateMe({
      id,
      username: newUsername
    });
  };
  const handleUpdatePassword = () => {
    updateMe({
      id,
      password: newPassword
    });
  };

  useEffect(() => {
    if (username) {
      setNewUsername(username);
    }
  }, [fixedUserName, username]);

  const userInfoLabels = labels[language];
  const isPasswordValid =
    !!newPassword.length && newPassword === confirmPassword;
  const isPasswordEmpty = !newPassword.length && !confirmPassword.length;

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={closeMyInforModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500
        }
      }}
    >
      <Fade in={isOpen}>
        <Box sx={style}>
          <UserInfoPage
            id={id}
            isCreateAdmin={currentPage === APP_PAGE.APP_START}
            isMyInfo
            labels={userInfoLabels}
            uiSize={uiSize}
            fixedUsername={username === 'admin'}
            username={username}
            lastLogin={lastLogin}
            newPassword={newPassword}
            currentPassword={currentPassword}
            confirmPassword={confirmPassword}
            isPasswordEmpty={isPasswordEmpty}
            isPasswordValid={isPasswordValid}
            onUsernameChange={onChangeUsername}
            onPasswordChange={onChangePassword}
            onChangeCurrentPassword={onChangeCurrentPassword}
            onConfirmPasswordChange={onChangeConfirmPassword}
            closeMyInforModal={closeMyInforModal}
          />
        </Box>
      </Fade>
    </Modal>
  );
};

export const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30rem',
  height: '35rem',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 5
};
