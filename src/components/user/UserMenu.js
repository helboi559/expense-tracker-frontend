import React from 'react';
// import { useState } from 'react';
import { Logout, Settings } from '@mui/icons-material';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import { useValue } from '../../context/ContextProvider';
import useCheckToken from '../hooks/useCheckToken';
import Profile from './Profile';
import { logout } from '../../actions/user';


const UserMenu = ({ anchorUserMenu, setAnchorUserMenu }) => {
    useCheckToken()
    const{dispatch,state:{currentUser}} = useValue()
  const handleCloseUserMenu = () => {
    setAnchorUserMenu(null);
  };
  const handleLogout = () => {
    logout(dispatch);
  };
  
  
  return (
      <>
      <Menu
        anchorEl={anchorUserMenu}
        open={Boolean(anchorUserMenu)}
        onClose={handleCloseUserMenu}
        onClick={handleCloseUserMenu}
      >
          <MenuItem onClick={()=> dispatch({type:'UPDATE_PROFILE',payload:{open:true,file:null, photoURL:currentUser?.photoURL}})}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Profile/>
      </>
      
    
  );
};

export default UserMenu