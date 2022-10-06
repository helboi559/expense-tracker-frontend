import { Close, Send } from '@mui/icons-material'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from '@mui/material'

import React, { useState ,useRef, useEffect} from 'react'
import { useValue } from '../../context/ContextProvider'
import GoogleOneTapLogin from './GoogleOneTapLogin'
import PasswordField from './PasswordField'

const UserLogin = () => {
    const {state:{openLogin},dispatch} = useValue()
    const [isRegister,setIsRegister] = useState(false)
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()

    const [title,setTitle] = useState('Login')
    
    const handleClose = () => {
        dispatch({type:"CLOSE_LOGIN"})
    }
    const handleSubmit = (e) => {
        e.preventDefault()

        //test loading
        dispatch({type:"START_LOADING"})
        setTimeout(()=> {
            dispatch({type:"END_LOADING"})
        },6000)

        //test notification
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value 
        if(password !== confirmPassword) {
            dispatch({
                type: 'UPDATE_ALERT',
                payload: {
                open: true,
                severity: 'error',
                message: 'Passwords do not match',
                },
            })
        }
    }
    useEffect(() => {
    isRegister ? setTitle('Register') : setTitle('Login');
  }, [isRegister]);
    return (
    <Dialog
    open={openLogin}
    onClose={handleClose}
    
    >
        <DialogTitle>
            {title}
            <IconButton
            sx={{
              position:"absolute",
              top:8,
              right:8,
              color:(theme)=> theme.palette.grey[500]
            }}
            onClick={handleClose}
            >
                <Close/>
            </IconButton>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
            <DialogContent dividers>
                <DialogContentText>
                    Fill information below
                </DialogContentText>
                {isRegister && (
                <TextField
                autoFocus
                margin="normal"
                variant="standard"
                id="name"
                label="Name"
                type="text"
                fullWidth
                inputRef={nameRef}
                inputProps={{ minLength: 2 }}
                required
                />
                )}
                <TextField
                    // autoFocus={!isRegister}
                    margin="normal"
                    variant="standard"
                    id="email"
                    label="Email"
                    type="email"
                    fullWidth
                    inputRef={emailRef}
                    required
                />
                <PasswordField {...{passwordRef}}/>
                {isRegister && (
                    <PasswordField passwordRef={confirmPasswordRef} id="confirmPassword" label='Confirm Password'/>
                )}
                </DialogContent>
                <DialogActions sx={{px:'20px'}}>
                    <Button type='submit' variant='contained' endIcon={<Send/>}>
                        Submit
                    </Button>
                </DialogActions>
        </form>
        <DialogActions>
            {isRegister ? 'Do you have an account? Sign in now ': "Don't you have an account? Create one now "}
            <Button onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? 'Login' : 'Register'}
            </Button>
        </DialogActions>
        <DialogActions sx={{ justifyContent: 'center', py: '24px' }}>
            <GoogleOneTapLogin />
        </DialogActions>  
    </Dialog>
  )
}

export default UserLogin