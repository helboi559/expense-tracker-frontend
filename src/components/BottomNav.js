import { AddRoadOutlined, ManageHistoryRounded } from '@mui/icons-material'
import { BottomNavigation, BottomNavigationAction, Box, Paper } from '@mui/material'

import React, { useState } from 'react'
import UserDrives from './drives/UserDrives'
import Dashboard from './map/Dashboard'

const BottomNav = () => {
    const [value,setValue] = useState(0)
    return (
    <Box
    // sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
    >   
    
        {
            {
            0: <Dashboard/>,
            1: <UserDrives />,
            
            }[value]
        }
        {/* switch statement above */}
        <Paper
        elevation={3}
        sx={{position:"fixed", bottom:0,left:0,right:0,zIndex:2}}
        >
            <BottomNavigation
            showLabels
            value={value}
            onChange={(e,newValue)=> setValue(newValue) }
            >
                <BottomNavigationAction label="Add" icon={<AddRoadOutlined/>}/>
                <BottomNavigationAction label="Drive History" icon={<ManageHistoryRounded/>}/>
            </BottomNavigation>
        </Paper>
    </Box>
  )
}

export default BottomNav