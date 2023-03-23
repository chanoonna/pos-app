/* ---------------------------------- types --------------------------------- */
import SvgIcon from '@mui/material/SvgIcon';

/* --------------------------------- imports -------------------------------- */
import PointOfSale from '@mui/icons-material/PointOfSale';
import { FlexContainer, PaperContainer } from 'components/container';

export const MenuCard = ({
  Icon,
  label
}: {
  Icon: typeof SvgIcon;
  label: string;
}) => {
  return (
    <PaperContainer justifyContent="center" width="15rem" height="15rem">
      <Icon sx={{ fontSize: '7rem' }} />
      {label}
    </PaperContainer>
  );
};
