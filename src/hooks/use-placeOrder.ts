import { placeOrder } from "@/services/userApi";
import { clearCart } from "@/store/slices/cartSlice";
import axios from "axios";
import { useDispatch } from "react-redux";

const usePlaceOrder = () => {
  const dispatch = useDispatch();
  const createOrder = async () => {
    try {
      await placeOrder();
      dispatch(clearCart());
      return null;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 400) {
          return err.response?.data?.message || "Unable to place the order ";
        }
        console.log("Unexpected error:", err);
        return "Something went wrong";
      }
    }
  };
  return createOrder;
};
export default usePlaceOrder;
