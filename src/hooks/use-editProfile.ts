
import { useDispatch } from "react-redux";
import type { profileEdit } from "@/types/AuthFormData";
import { setRole, setUser } from "@/store/slices/userSlice";
import axios from "axios";
import { editUserDetails } from "@/services/userApi";

const useEditProfile = (formData: profileEdit, userType: string) => {
  const dispatch = useDispatch();
  const editProfile = async () => {
    try {
      const response = await editUserDetails(formData);
      const userData = response?.data?.userData;

      if (userData?.userName) {
        dispatch(setUser(userData.userName));
      }
      dispatch(setRole(userType));

      return { success: true, data: userData, error: null };
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return {
          success: false,
          data: null,
          error: err.response?.data?.message || "Unable to update profile",
        };
      }
      return {
        success: false,
        data: null,
        error: "Something went wrong",
      };
    }
  };

  return editProfile;
};

export default useEditProfile;
