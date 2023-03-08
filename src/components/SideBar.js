import React, { useEffect, useRef } from 'react';
import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, styled, Toolbar, Typography } from '@mui/material';
import { ChevronLeftOutlined } from '@mui/icons-material';
import { useValue } from '../context/ContextProvider';
import GridViewIcon from '@mui/icons-material/GridView';
import HistoryIcon from '@mui/icons-material/History';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
// import Dashboard from './dashboard/Dashboard';
// import UserDrives from './drives/UserDrives';
// import AddDrive from './addDrive/AddDrive';
// import Protected from './protected/Protected';
const DrawerHeader = styled('div')(({ theme }) => ({
  width:130,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));


const SideBar = ({isOpen,setIsOpen}) => {
    const {state:{section},dispatch} = useValue()
    
    return (
    <Box 
    sx={{ display: 'flex' }}
    // ref={ref}
    onClick={()=> setIsOpen(false)}
    >
      
      <Drawer
        sx={{
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            // width: drawerWidth,
          },
        }}
        variant="temporary"
        anchor="left"
        open={isOpen}
        // onClose={setIsOpen(false)}
      >
        <DrawerHeader>
          <IconButton onClick={()=>setIsOpen(false)}>
            <ChevronLeftOutlined/>
          </IconButton>
        </DrawerHeader>
        <Divider />
        
        <Divider />
        <List>
            <ListItem  >
              <ListItemButton onClick={()=> {
                dispatch({ type: 'UPDATE_SECTION', payload: 0 });
              }}>
                <ListItemIcon>
                  <GridViewIcon/>
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
             <ListItem  >
              <ListItemButton onClick={()=> {
                dispatch({ type: 'UPDATE_SECTION', payload: 1 });
              }}>
                <ListItemIcon>
                  <HistoryIcon/>
                </ListItemIcon>
                <ListItemText primary="Drive History" />
              </ListItemButton>
            </ListItem>
             <ListItem  >
              <ListItemButton onClick={()=> {
                dispatch({ type: 'UPDATE_SECTION', payload: 2 });
              }}>
                <ListItemIcon>
                  <AddLocationAltIcon/>
                </ListItemIcon>
                <ListItemText primary="Add Drive" />
              </ListItemButton>
            </ListItem>
        </List>
      </Drawer>
    </Box>
  )
}

export default SideBar
