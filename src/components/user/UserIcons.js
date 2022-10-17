import React from 'react'
import { useState } from 'react';
import { 
    Box,
    Avatar,
    IconButton,
    Tooltip,
 } from '@mui/material';

import { useValue } from '../../context/ContextProvider';
import UserMenu from './UserMenu';
import useCheckToken from '../hooks/useCheckToken';

const UserIcons = () => {
  useCheckToken()
  const {
    state: { currentUser },
  } = useValue();

  //   anchor user menu button 
  const [anchorUserMenu, setAnchorUserMenu] = useState(null);
  //test
  return (
    <Box>
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