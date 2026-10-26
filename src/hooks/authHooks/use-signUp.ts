import {  userAuthSignUp } from "@/services/authApi";
import { useDispatch } from "react-redux";
import type {  signUpData } from "@/types/AuthFormData";
import { setRole, setUser } from "@/store/slices/userSlice";
import {useNavigate} from "react-router-dom";
import axios from "axios";
const useSignUp = (formData: signUpData, userType: string) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signUp = async () => {
    try {
      const response = await userAuthSignUp(formData, userType);
      dispatch(setUser(response?.data?.userData?.userName));
      dispatch(setRole(userType));
      userType === "customer" ? navigate("/") : navigate("/admin/home")

    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 400) {
          return err.response?.data?.message || "Bad Request";
        } else {
          console.log("Error signing up:", err.response?.data);
        }
      }
    }
  };
  return signUp;
};
export default useSignUp;
