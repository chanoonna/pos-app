import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import PointOfSale from '@mui/icons-material/PointOfSale';
import ReceiptLong from '@mui/icons-material/ReceiptLong';
import SupervisorAccount from '@mui/icons-material/SupervisorAccount';
import BarChart from '@mui/icons-material/BarChart';
import Inventory from '@mui/icons-material/Inventory';

import { colors } from 'style/theme';

export const LandingBody = () => {
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper'
      }}
    >
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <PointOfSale />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Retail" />
      </ListItem>
      <Divider variant="middle" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ReceiptLong />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Whole Sale" />
      </ListItem>
      <Divider variant="middle" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <Inventory />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Inventory Management" />
      </ListItem>
      <Divider variant="middle" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <BarChart />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Reports" />
      </ListItem>
      <Divider variant="middle" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <SupervisorAccount />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Account Management" />
      </ListItem>
    </List>
  );
};
