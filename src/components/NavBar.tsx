
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {userAuthSignout} from "@/services/authApi"
import { getUserDetails } from "@/services/userApi";
import { setUser, removeUser } from "@/store/slices/userSlice";
import type { RootState } from "@/store/store";
const NavBar = () => {
  const dispatch = useDispatch()
  const userName = useSelector((state:RootState)=> state.user.userName)

  const signOutHandler = ()=>{
    const signOut = async ()=>{
      try{
        const response = await userAuthSignout()
      console.log(response)
      }catch(err){
        console.log(err)
      }
    }
    signOut()
    dispatch(removeUser())
  }
  useEffect ( ()=>{
    const fetchUserDetails = async ()=>{
      try{
        const response = await getUserDetails();

      dispatch(setUser(response?.data?.userData?.userName))
      }catch(err){
        console.log(err)
      }
    };
    fetchUserDetails();
  }, []);


  return (
    <div className="navbar flex justify-between items-center p-4 bg-green-700 text-white px-50">
      <h1 className="text-xl font-bold"><Link to="/">My app</Link></h1>
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
            <li>
              <Link to="/customer/cart">Cart</Link>
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
