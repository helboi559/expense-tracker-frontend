import React, { Suspense} from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
// import Home from "./pages/Home"
// import UserDashboard from "./pages/dashboard/UserDashboard"
import CustomTheme from "./CustomTheme"
const Home = React.lazy(() => import("./pages/Home"))
const UserDashboard = React.lazy(() => import("./pages/dashboard/UserDashboard"))

const App = () => {
  return (
    <>
    <Suspense fallback={<div>Loading...</div>}>
      <CustomTheme>
        
        <BrowserRouter>
          <Routes>
            <Route path="dashboard/*" element={<UserDashboard/>}/>
            <Route path="*" element={<Home/>}/>
          </Routes>
        
        </BrowserRouter>
      </CustomTheme>
    </Suspense>
    </>
  )
}

export default App

