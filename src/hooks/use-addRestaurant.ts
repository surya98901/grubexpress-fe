import type { initialRestarantForm } from "@/assets/utils/constants";
import { AddRestaurant } from "@/services/adminApis";
import { setRestaurant } from "@/store/slices/userSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const useAddRestaurant = (formData: typeof initialRestarantForm) => {
  const dispatch = useDispatch();

  const postData = async () => {
    try {
      const response = await AddRestaurant({
        ...formData,
        name: formData.name.trim(),
        description: formData.description.trim(),
        FSSAID: formData.FSSAID.trim(),
        addressLine: formData.addressLine.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        address: {
          label: "Restaurant",
          addressLine: formData.addressLine.trim(),
          city: formData.city.trim(),
          state: formData.state.trim(),
          pincode: formData.pincode,
        },
      });

      if (!response.data.success) {
        throw new Error(
          response.data.message || "Could not create restaurant.",
        );
      }

      dispatch(setRestaurant(response.data.restaurant));
      toast.success("Restaurant created successfully!");

      return { success: true, data: response.data };
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || "Could not create restaurant."
        : err instanceof Error
          ? err.message
          : "Something went wrong.";

      toast.error(message);

      return { success: false, message };
    }
  };

  return postData;
};

export default useAddRestaurant;