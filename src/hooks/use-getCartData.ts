import { useDispatch } from "react-redux";
import { getUserCart } from "@/services/userApi";
import { setCart } from "@/store/slices/cartSlice";
import {useCallback} from "react"
const useGetCartData = () => {
  const dispatch = useDispatch();
  const fetchCartDetails = useCallback(async () => {
    try {
      const cartResponse = await getUserCart();
      dispatch(setCart(cartResponse.data.data));
    } catch (err) {
      console.log(err);
    }
  }, [dispatch])
  return fetchCartDetails;
};
export default useGetCartData;