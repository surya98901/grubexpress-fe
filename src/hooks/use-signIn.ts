import { userAuthSignIn } from "@/services/authApi";
import { useDispatch } from "react-redux";
import type { signInData } from "@/types/AuthFormData";
import { setRole, setUser } from "@/store/slices/userSlice";
import {useNavigate} from "react-router-dom";
import axios from "axios";
const useSignIn = (formData: signInData, userType: string) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signIn = async () => {
    try {
      const response = await userAuthSignIn(formData, userType);
      console.log("signiN successful, hey ", response);
      dispatch(setUser(response?.data?.userData?.userName));
      dispatch(setRole(userType));
      userType === "customer" ? navigate("/") : navigate("/admin/home")

    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 400) {
          return err.response?.data?.message || "Bad Request";
        } else {
          console.log("Error signing in:", err.response?.data);
        }
      }
    }
  };
  return signIn;
};
export default useSignIn;
