/* -------------------------------- constants ------------------------------- */
import { labels } from '../constants';

/* --------------------------------- imports -------------------------------- */
import { useState, useEffect } from 'react';

import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';

import { useAppContext } from 'renderer/modules/RootModule';
import { CreateUserBody } from './CreateUserBody';
import { APP_PAGE } from 'renderer/modules/constants';

export const CreateUserModal = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const {
    currentPage,
    settingsState: { language, uiSize },
    modalState: { isCreateUserModalOpen: isOpen },
    setMyInfoModalOpen,
    updateMe
  } = useAppContext();

  const fixedUserName = username === 'admin';

  const closeMyInforModal = () => {
    setMyInfoModalOpen(false);
    setCurrentPassword('');
    setPassword('');
    setConfirmPassword('');
  };

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
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
      username: username
    });
  };
  const handleUpdatePassword = () => {
    updateMe({
      id,
      password: password
    });
  };

  useEffect(() => {
    if (username) {
      setUsername(username);
    }
  }, [fixedUserName, username]);

  const userInfoLabels = labels[language];
  const isPasswordValid =
    !!password.length && password === confirmPassword;
  const isPasswordEmpty = !password.length && !confirmPassword.length;

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
            newPassword={password}
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
