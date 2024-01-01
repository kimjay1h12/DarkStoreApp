import React, { useContext, useEffect } from "react";
import Index from "./auth/login";
import HomePage from "../components/Home/HomePage";
import Dashboard from "../components/Home/Dashboard";
import { GlobalContext } from "../context";
import { useRouter } from "next/router";
function Landing() {
  const { authState } = useContext(GlobalContext);
  console.log("authstate", authState.data);
  // return <Dashboard />;
  const router = useRouter()
 useEffect(() => {
if(authState?.data?.user?.isVerified ===false)
{
router.push("/auth/verifyotp")
} }, [authState?.data])
 
  return authState?.data?.user?.isAdmin ? <Dashboard /> : <HomePage />;
}

export default Landing;
