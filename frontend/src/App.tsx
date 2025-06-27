import { Routes, Route, Navigate } from "react-router"
import LoginPage from "./pages/LoginPage.tsx"
import LandingPage from "./pages/LandingPage.tsx"
import SignUpPage from "./pages/SignUpPage.tsx"
import Dashboard from "./pages/Dashboard.tsx"
import useAuthUser from "./lib/useAuthUser.ts"
import { Toaster } from 'react-hot-toast';


export default function App() {

  const {authData, authLoading} = useAuthUser();

  const isAuthenticated = Boolean(authData);
  console.log(isAuthenticated);
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LandingPage />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignUpPage />} />
        <Route path="/dashboard" element={!isAuthenticated ? <Navigate to="/login" /> : <Dashboard />} />
      </Routes>
    
    </>

  )
}
