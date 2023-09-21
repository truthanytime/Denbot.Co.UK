import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ReplayIcon from '@mui/icons-material/Replay';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme, color }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 120,
    color: '#00ff00',
    backgroundColor: `${color} !important`,
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        marginRight: theme.spacing(1.5),
      },
      '&:hover': {
        backgroundColor: '#00000022 !important',
      },
    },
  },
}));

const CustomizedMenus = ({ handleMenuAction, color }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e, id) => {
    e.stopPropagation();
    setAnchorEl(null);
    handleMenuAction(id);
  };

  return (
    <Box>
      <IconButton size="small" onClick={handleClick} style={{ borderStyle: 'solid', borderWidth: 1, borderColor: color + '50', marginRight: 10 }}>
        <MoreVertIcon fontSize="medium" style={{ color: color }} />
      </IconButton>
      <StyledMenu
        id="demo-customized-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        color={color}
      >
        {/* <MenuItem onClick={(e) => handleClose(e, "toggle")} disableRipple>
          <EditIcon />
          Toggle Theme
        </MenuItem> */}
        <MenuItem onClick={(e) => handleClose(e, "repeat")} disableRipple>
          <ReplayIcon />
          Start Again
        </MenuItem>
      </StyledMenu>
    </Box >
  );
}

export default CustomizedMenus;