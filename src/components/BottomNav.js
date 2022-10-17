import { AddRoadOutlined, ManageHistoryRounded } from '@mui/icons-material'
import { BottomNavigation, BottomNavigationAction, Box, Paper } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard';
import React, { useState,useRef,useEffect } from 'react'
import UserDrives from './drives/UserDrives'
// import Dashboard from './dashboard/Dashboard'
import AddDrive from './addDrive/AddDrive';
import Protected from './protected/Protected';
import Dashboard from './dashboard/Dashboard';
import { useValue } from '../context/ContextProvider';

const BottomNav = () => {
    
    const {state:{section},dispatch} = useValue()
    const ref = useRef();
    useEffect(() => {
        ref.current.ownerDocument.body.scrollTop = 0;
    }, [section]);
    return (
    <Box
    // sx={{height:300 }}
    ref={ref}
    >   
    
        {
            {

            0: <Protected><Dashboard/></Protected>,
            1: <Protected><UserDrives/></Protected>,
            2: <Protected><AddDrive /></Protected>,
            }[section]
        }
        {/* switch statement above */}
         <Paper
        elevation={3}
        sx={{position:"fixed", bottom:0,left:0,right:0,zIndex:1}}
        >
            <BottomNavigation
            showLabels
            value={section}
            onChange={(e,newValue)=> dispatch({type:'UPDATE_SECTION',payload:newValue}) }
            >
                <BottomNavigationAction label="Dashboard" icon={<DashboardIcon/>}/>
                <BottomNavigationAction label="Drive History" icon={<ManageHistoryRounded/>}/>
                <BottomNavigationAction label="Add Drive" icon={<AddRoadOutlined/>}/>
            </BottomNavigation>
        </Paper>
    </Box>
  )
}



export default BottomNav


