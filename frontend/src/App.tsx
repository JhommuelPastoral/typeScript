import { Routes, Route } from "react-router"
import LoginPage from "./pages/LoginPage.tsx"
import LandingPage from "./pages/LandingPage.tsx"
import SignUpPage from "./pages/SignUpPage.tsx"


import { Toaster } from 'react-hot-toast';


export default function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    
    </>

  )
}
