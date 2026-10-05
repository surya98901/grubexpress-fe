import { useDispatch } from "react-redux";
import { getUserDetails } from "@/services/userApi";
import { useCallback } from "react";
import { removeUser, setUser } from "@/store/slices/userSlice";
import axios from "axios";

const useGetUserData = () => {
  const dispatch = useDispatch();
  const fetchUserDetails = useCallback(async () => {
    try {
      const response = await getUserDetails();
      dispatch(setUser(response?.data?.userData?.userName));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          dispatch(removeUser());
          return;
        }
      } else {
        console.log("Unexpected error:", err);
      }
    }
  }, [dispatch]);
  return fetchUserDetails;
};
export default useGetUserData;
