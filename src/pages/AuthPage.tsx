
import { useSearchParams } from "react-router-dom";
import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";
const Auth = ()=>{
  const [params ] =useSearchParams()
  const mode = params.get("mode");

  return mode === "signin"  ? <SignIn /> :  <SignUp/>
}





export default Auth;