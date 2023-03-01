import styled from 'styled-components';
import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import { colors } from 'style/theme';

export const AppNavBar = () => {
  return (
    <StyledAppNavBar>
      <SettingsIcon />
      <LogoutIcon />
    </StyledAppNavBar>
  );
};

const LogoutIcon = () => (
  <Tooltip
    TransitionComponent={Zoom}
    title={<div style={{ fontSize: '1rem', fontWeight: '400' }}>Logout</div>}
    placement="bottom-end"
  >
    <div className="logout-icon-container">
      <Logout fontSize="large" />
    </div>
  </Tooltip>
);

const SettingsIcon = () => (
  <Tooltip
    TransitionComponent={Zoom}
    title={<div style={{ fontSize: '1rem', fontWeight: '400' }}>Settings</div>}
    placement="bottom-end"
  >
    <div className="settings-icon-container">
      <Settings fontSize="large" />
    </div>
  </Tooltip>
);

const StyledAppNavBar = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0.5rem;
  width: 100%;
  height: 4rem;
  background-color: ${colors.mediumGray1};
  position: fixed;

  .settings-icon-container,
  .logout-icon-container {
    padding: 0.5rem;
    border-radius: 5px;
    &:hover {
      background-color: ${colors.lightGray1};
    }
  }
`;
