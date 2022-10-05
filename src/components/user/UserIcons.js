import React from 'react'
import { useState } from 'react';
import { 
    Box,
    Avatar,
    IconButton,
    Tooltip,
    Badge
 } from '@mui/material';
import { Mail, Notifications } from '@mui/icons-material'; 
import { useValue } from '../../context/ContextProvider';
import UserMenu from '../UserMenu';

const UserIcons = () => {
//   useCheckToken();
  const {
    state: { currentUser },
  } = useValue();

  //   anchor user menu button 
  const [anchorUserMenu, setAnchorUserMenu] = useState(null);
  //test
  return (
    <Box>
      <IconButton size="large" color="inherit">
        <Badge color="error" badgeContent={5}>
          <Mail />
        </Badge>
      </IconButton>
      <IconButton size="large" color="inherit">
        <Badge color="error" badgeContent={20}>
          <Notifications />
        </Badge>
      </IconButton>
      <Tooltip title="Open User Settings">
        <IconButton onClick={(e) => setAnchorUserMenu(e.currentTarget)}>
            
            {/* if curr user doesnt have photo use first letter of logged in user */}
          <Avatar src={currentUser?.photoURL} alt={currentUser?.name}>
            {currentUser?.name?.charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>
      </Tooltip>
      <UserMenu {...{ anchorUserMenu, setAnchorUserMenu }} />
    </Box>
  );
}

export default UserIcons