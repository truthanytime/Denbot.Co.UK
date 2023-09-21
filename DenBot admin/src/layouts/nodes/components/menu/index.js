import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import BackupIcon from '@mui/icons-material/Backup';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import SubtitlesOffIcon from '@mui/icons-material/SubtitlesOff';
import FileCopyIcon from '@mui/icons-material/FileCopy';
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
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 16,
    marginTop: theme.spacing(1),
    maxWidth: 120,
    backgroundColor: '#012234 !important',
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 2px 2px 0px 0px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      minWidth: `80px !important`,
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

const CustomizedMenus = ({ handleMenuAction, isDisable = false }) => {
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
    <Box mr={-2}>
      <IconButton
        aria-label="more"
        id="long-button"
        color="white"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={(e) => handleClose(e, "edit")} disableRipple>
          <EditIcon />
          Edit
        </MenuItem>
        <MenuItem onClick={(e) => handleClose(e, "test")} disableRipple>
          <DoubleArrowIcon />
          Preview
        </MenuItem>
        <MenuItem onClick={(e) => handleClose(e, "filecopy")} disableRipple>
          <FileCopyIcon />
          Duplicate
        </MenuItem>
        <MenuItem onClick={(e) => handleClose(e, "backup")} disableRipple>
          <BackupIcon />
          Backup
        </MenuItem>
        <MenuItem onClick={(e) => handleClose(e, "disable")} disableRipple>
          {isDisable ? <SubtitlesIcon /> : <SubtitlesOffIcon />}
          {isDisable ? 'Enable' : 'Disable'}
        </MenuItem>
        <MenuItem onClick={(e) => handleClose(e, "delete")} disableRipple>
          <DeleteIcon />
          Delete
        </MenuItem>
      </StyledMenu>
    </Box >
  );
}

export default CustomizedMenus;