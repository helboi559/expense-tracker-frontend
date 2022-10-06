import React from 'react';
import { useState } from 'react';
import { Dashboard, Logout, Settings } from '@mui/icons-material';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import { useValue } from '../../context/ContextProvider';


const UserMenu = ({ anchorUserMenu, setAnchorUserMenu }) => {

    const{dispatch} = useValue()
  const handleCloseUserMenu = () => {
    setAnchorUserMenu(null);
  };

  return (
    
      <Menu
        anchorEl={anchorUserMenu}
        open={Boolean(anchorUserMenu)}
        onClose={handleCloseUserMenu}
        onClick={handleCloseUserMenu}
      >
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
    
        <MenuItem onClick={() => dispatch({type:'UPDATE_USER',payload:null})}>
          <ListItemIcon>
            <Dashboard fontSize="small" />
          </ListItemIcon>
          Dashboard
        </MenuItem>
        <MenuItem >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      
    
  );
};

export default UserMenu