import React from 'react'
import { 
    AppBar,
    Container,
    Typography,
    Toolbar,
    Button,
    Box,
    IconButton
    
 } from '@mui/material'
 import { Lock, Menu } from '@mui/icons-material'
import { useValue } from '../context/ContextProvider'
import UserIcons from './user/UserIcons'
import photoURL from "../rattle.jpg"
 
//TEST CODE!
 const user = {
   name:'test',
   photoURL
 }
const NavBar = () => {
  //extract user from reducer
  const {state:{currentUser},dispatch} = useValue()
  return (
    <AppBar>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Box sx={{ mr: 1 }}>
              <IconButton
                size="large"
                color="inherit"
              >
                <Menu />
              </IconButton>
            </Box>
            <Typography
              variant="h6"
              component="h1"
              noWrap
              sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
            >
              You Are Welcome
            </Typography>
            <Typography
              variant="h6"
              component="h1"
              noWrap
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              YRW
            </Typography>
            
            {!currentUser ? (
              <Button
                color="inherit"
                startIcon={<Lock />}
                onClick={() => dispatch({ type: 'UPDATE_USER',payload:user })}
              >
                Login
              </Button>
            ) : (
              <UserIcons />
            )}
          </Toolbar>
        </Container>
      </AppBar>
  )
}

export default NavBar