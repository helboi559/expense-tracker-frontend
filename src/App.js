import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import UserDashboard from "./pages/dashboard/UserDashboard"
import CustomTheme from "./CustomTheme"

const App = () => {
  return (
    <>
    <CustomTheme>
      <BrowserRouter>
        <Routes>
          <Route path="dashboard/*" element={<UserDashboard/>}/>
          <Route path="*" element={<Home/>}/>
        </Routes>
      
      </BrowserRouter>
    </CustomTheme>
    </>
  )
}

export default App

