import { Link } from "react-router-dom";
import {  useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { useEffect } from "react";
import useGetCartData from "@/hooks/use-getCartData";
import useGetUserData from "@/hooks/use-getUserData";
import ProfileMenu from "../genericUIcomponents/ProfileMenu";
const CustomerNavBar = () => {
  const userName = useSelector((state: RootState) => state.user.userName);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const fetchCartDetails = useGetCartData();
  const fetchUserDetails = useGetUserData();
  useEffect(() => {
    fetchUserDetails();
    fetchCartDetails();
  }, []);
  return (
    <div className="navbar flex justify-between items-center p-4 bg-green-700 text-white px-50">
      <h1 className="text-xl font-bold">
        <Link to="/">Grub Express</Link>
      </h1>
      <nav className="flex ">
        {!userName ? (
          <ul className="flex justify-between items-center gap-4 px-4">
            <li className=" font-bold border hover:border-white border-2  border-green-700 p-2 px-5 rounded-lg text-white">
              <Link to="/food">partner Sign In </Link>
            </li>
            <li>
              <Link to="/auth?mode=signin&role=customer">Sign In</Link>
            </li>
          </ul>
        ) : (
          <ul className="flex justify-between items-center gap-4 px-4">
            <li>
              <Link to="/customer/restaurants">Restaurants</Link>
            </li>
            <li className="flex gap-1">
              <Link to="/customer/cart">Cart </Link>
              <section className="bg-white flex items-center rounded-full text-black px-2">
                {cartCount}
              </section>
            </li>
            <li className="flex items-center gap-2">
              <ProfileMenu />
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};
export default CustomerNavBar;
