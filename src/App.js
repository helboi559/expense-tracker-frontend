import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import UserDashboard from "./pages/dashboard/UserDashboard"

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="dashboard/*" element={<UserDashboard/>}/>
        <Route path="*" element={<Home/>}/>
      </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default App

