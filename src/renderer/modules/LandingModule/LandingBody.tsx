import PointOfSale from '@mui/icons-material/PointOfSale';
import ReceiptLong from '@mui/icons-material/ReceiptLong';
import SupervisorAccount from '@mui/icons-material/SupervisorAccount';
import BarChart from '@mui/icons-material/BarChart';
import Inventory from '@mui/icons-material/Inventory';
import { colors } from 'style/theme';
import styled from 'styled-components';

export const LandingBody = () => {
  return <StyledLandingBody>Body</StyledLandingBody>;
};

const PointOfSaleIcon = () => (
  <PointOfSale sx={{ color: colors.white }} fontSize="large" />
);
const ReceiptLongIcon = () => (
  <ReceiptLong sx={{ color: colors.white }} fontSize="large" />
);
const AccountIcon = () => (
  <SupervisorAccount sx={{ color: colors.white }} fontSize="large" />
);
const InventoryIcon = () => (
  <Inventory sx={{ color: colors.white }} fontSize="large" />
);
const BarChartIcon = () => (
  <BarChart sx={{ color: colors.white }} fontSize="large" />
);

const StyledLandingBody = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 2rem;
  row-gap: 1rem;
  height: fit-content;
  width: 40%;
  max-width: 500px;

  background-color: ${colors.extraLightGray1};
`;
