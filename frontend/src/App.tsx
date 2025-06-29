import { Routes, Route, Navigate } from "react-router"
import LoginPage from "./pages/LoginPage.tsx"
import LandingPage from "./pages/LandingPage.tsx"
import SignUpPage from "./pages/SignUpPage.tsx"
import Dashboard from "./pages/Dashboard.tsx"
import useAuthUser from "./lib/useAuthUser.ts"
import Onbaording from "./pages/Onboarding.tsx"
import { Toaster } from 'react-hot-toast';


export default function App() {

  const {authData, authLoading} = useAuthUser();

  const isAuthenticated = Boolean(authData);
  const isOnboarded = authData?.user?.isOnboarded;
  console.log(authData,isOnboarded);
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={isAuthenticated ? isOnboarded ? <Navigate to="/dashboard" /> : <Navigate to="/onboarding" /> : <LandingPage />} />
        <Route path="/login" element={isAuthenticated ? isOnboarded ? <Navigate to="/dashboard" /> : <Navigate to="/onboarding" /> : <LoginPage />} />
        <Route path="/signup" element={isAuthenticated ? isOnboarded ? <Navigate to="/dashboard" /> : <Navigate to="/onboarding" /> : <SignUpPage />} />
        <Route path="/dashboard" element={isAuthenticated ? (isOnboarded ? <Dashboard /> : <Navigate to="/onboarding" /> ): <Navigate to="/login" />} />
        <Route path="/onboarding" element={ isAuthenticated ? (isOnboarded ? <Navigate to="/dashboard" /> : <Onbaording /> ): <Navigate to="/login" /> } />
      </Routes>
    
    </>

  )
}
