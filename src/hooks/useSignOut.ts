
import { removeServiceType } from "@/store/slices/serviceSlice";
import { removeCity } from "@/store/slices/locationslice";
import {  removeUser } from "@/store/slices/userSlice";
import {  clearCart } from "@/store/slices/cartSlice";
import { useDispatch, } from "react-redux";
import { userAuthSignout } from "@/services/authApi";
import {useNavigate} from "react-router-dom"
  const useSignOut = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const signOutHandler = async () => {
      try {
        const response = await userAuthSignout();
        console.log(response);
        dispatch(removeUser());
        dispatch(clearCart());
        dispatch(removeServiceType());
        dispatch(removeCity());
      } catch (err) {
        console.log(err);
      }
      navigate("/");
  };
  return signOutHandler
};
  export default useSignOut;