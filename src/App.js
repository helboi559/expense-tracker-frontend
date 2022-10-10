import React from 'react'
import NavBar from './components/NavBar'
import Notification from './components/Notification'
import UserLogin from './components/user/UserLogin'
import Loading from "./components/Loading"
import BottomNav from './components/BottomNav'
const App = () => {
  return (
    <>
    <Loading/>
    <UserLogin/>
    <NavBar/>
    <Notification/>
    <BottomNav/>
    </>
  )
}

export default App