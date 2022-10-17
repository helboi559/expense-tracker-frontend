import { AttachMoney} from '@mui/icons-material'
import { Box, Divider, List, ListItem, ListItemText, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DirectionsCarRoundedIcon from '@mui/icons-material/DirectionsCarRounded';
import FormatListNumberedRoundedIcon from '@mui/icons-material/FormatListNumberedRounded';
import { useValue } from '../../context/ContextProvider';
import { fetchUserDrives } from '../../actions/drive';
import moment from 'moment';



const Dashboard = () => {
    const {state:{drives,currentUser},dispatch} = useValue()
    // console.log(drives)
   
    useEffect(()=> {
        if(drives.length === 0 ) {
          fetchUserDrives(currentUser,dispatch)
        }
        
    },[])
    
    // calculate totals 
    const mileageSum = (drives.reduce((a,v) =>  a = Math.round((a + v.mileage)*10)/10 , 0 ))
   
    const loggedSum = (drives.reduce((a,v) =>  a = Math.round((a + v.total)*10)/10 , 0 ))
    
    return (
      <Box
      sx={{
        gridTemplateColumns: 'repeat(3,1fr)',
        gridAutoRows: 'minmax(100px, auto)',
        display: { xs: 'flex', md: 'grid' },
        textAlign: 'center',
        gap: 3,
        flexDirection: 'column',
      }}
      >
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4">Number of Drives</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FormatListNumberedRoundedIcon sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
          <Typography variant="h4">{drives.length}</Typography>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4">Miles Driven</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <DirectionsCarRoundedIcon sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
          <Typography variant="h4">{mileageSum? mileageSum: 0}</Typography>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4">$ Total Logged</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AttachMoney sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
          <Typography variant="h4">{loggedSum? loggedSum: 0}</Typography>
        </Box>
      </Paper>
      <Paper
      sx={{ p: 4 ,gridColumn:"1/4"}}
      >
         <Box>
          <Typography variant='h4'>Recent drives</Typography>
          <List>
            {drives.slice(0, 4).map((drive, i) => (
              <Box key={drive._id}>
                <ListItem>
                  <ListItemText
                    // primary={user?.name}
                    primary={`Date: ${moment(drive?.date).format(
                      'YYYY-MM-DD'
                    )}`}
                    secondary={`From: ${drive?.origin} To: ${drive?.destination} for ${Math.round((drive?.mileage)*10)/10} miles.`}
                  />
                </ListItem>
                {i !== 3 && <Divider variant="inset" />}
              </Box>
            ))}
          </List>
        </Box>
      </Paper>
      </Box>
    )
   
}

export default Dashboard