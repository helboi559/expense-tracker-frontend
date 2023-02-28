import React from 'react'
import NavBar from '../components/NavBar'
import Notification from '../components/Notification'
import UserLogin from '../components/user/UserLogin'
import Loading from "../components/Loading"
import BottomNav from '../components/BottomNav'
import { useMediaQuery } from '@mui/material'
const Home = () => {
  const isMobile = useMediaQuery('(max-width:600px)')
  return (
    <>
    {isMobile ? (
      <>
        <Loading/>
        <UserLogin/>
        <NavBar/>
        <Notification/>
        <BottomNav/>
      </>
    ):(
      <>
        <Loading/>
        <UserLogin/>
        <NavBar/>
        <Notification/>
      </>
    )}
  
    </>
  )
}

export default Home