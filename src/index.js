import { lazy, Suspense } from "react"
import {createRoot} from "react-dom/client"

import App from "./App"
// import ContextProvider from "./context/ContextProvider"
const ContextProvider = lazy (() => import("./context/ContextProvider"))

createRoot(document.getElementById('root')).render(
<Suspense fallback={<div>Loading...</div>}>
    <ContextProvider>
        <App></App>
    </ContextProvider>
</Suspense>)