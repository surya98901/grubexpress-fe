import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userAuthSignout } from "@/services/authApi";
import { getUserDetails,getUserCart } from "@/services/userApi";
import type { RootState } from "@/store/store";
import { setUser, removeUser } from "@/store/slices/userSlice";
import { setCart, clearCart } from "@/store/slices/cartSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state: RootState) => state.user.userName);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const fetchCartDetails = async () => {
    try {
      const response = await getUserCart();
      dispatch(setCart(response.data.data))
    } catch (err) {
      console.log(err);
    }
  };
  const signOutHandler = async () => {
  
      try {
        const response = await userAuthSignout();
        console.log(response);
        dispatch(removeUser());
        dispatch(clearCart());
      } catch (err) {
        console.log(err);
      }
    
  };
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserDetails();
        dispatch(setUser(response?.data?.userData?.userName));
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserDetails();
    fetchCartDetails();
  }, []);

  return (
    <div className="navbar flex justify-between items-center p-4 bg-green-700 text-white px-50">
      <h1 className="text-xl font-bold">
        <Link to="/">My app</Link>
      </h1>
      <nav className="flex ">
        {!userName ? (
          <ul className="flex justify-between items-center gap-4 px-4">
            <li className=" font-bold border hover:border-white border-2  border-green-700 p-2 px-5 rounded-lg text-white">
              <Link to="/food">partner with us</Link>
            </li>
            <li>
              <Link to="/auth?mode=signin">Sign In</Link>
            </li>
          </ul>
        ) : (
          <ul className="flex justify-between items-center gap-4 px-4">
            <li>
              <Link to="/customer/restaurants">Restaurants</Link>
            </li>
            <li className="flex gap-1">
              <Link to="/customer/cart">Cart </Link>
              <section className="bg-white flex items-center rounded-full text-black px-2">{cartCount} </section>
            </li>
            <li>
              <Link to="/customer/orders">Orders</Link>
            </li>
            <li>{userName}</li>
            <button onClick={signOutHandler}>logout</button>
          </ul>
        )}
      </nav>
    </div>
  );
};
export default NavBar;
