import React from 'react';
import { useState } from 'react';
import { Dashboard, Logout, Settings } from '@mui/icons-material';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import { useValue } from '../../context/ContextProvider';
import useCheckToken from '../hooks/useCheckToken';


const UserMenu = ({ anchorUserMenu, setAnchorUserMenu }) => {
    useCheckToken()
    const{dispatch,state:{currentUser}} = useValue()
  const handleCloseUserMenu = () => {
    setAnchorUserMenu(null);
  };

  //test for auth to backend
  const testAuthorization = async()=> {
    const url = process.env.REACT_APP_SERVER_URL + '/room'
    try {
      
      const response = await fetch(url, {
      method:'POST',
      headers:{
        "Content-Type":"application/json",
        authorization:`Bearer ${currentUser.token}t`
      }
    })
    const resJSON = await response.json()
    console.log(resJSON)
    if(!resJSON.success) {
      if(response.status === 401)  
        dispatch({type:"UPDATE_USER",payload:null}) ;
      throw new Error(resJSON.message)
    }
    } catch (error) {
      dispatch({type:'UPDATE_ALERT',payload:{open:true,severity:'error',message:error.message}})
    }
  }
  return (
    
      <Menu
        anchorEl={anchorUserMenu}
        open={Boolean(anchorUserMenu)}
        onClose={handleCloseUserMenu}
        onClick={handleCloseUserMenu}
      >
          <MenuItem onClick={testAuthorization}>
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