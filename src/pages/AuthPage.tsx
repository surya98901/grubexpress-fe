
import { useSearchParams } from "react-router-dom";
import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";
const Auth = ()=>{
  const [params ] =useSearchParams()
  const mode = params.get("mode");
  const userType = params.get("role") || ""
  console.log(userType)

  return mode === "signin"  ? <SignIn userType = {userType} /> :  <SignUp userType = {userType}/>
}





export default Auth;