import {  useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import CustomerNavBar from "./customer/CustomerNavBar";
import AdminNavBar from "./admin/AdminNavBar";

const NavBar = () => {
  const userType = useSelector((state: RootState) => state.user.role);
  return userType !== "admin" ? 
    <CustomerNavBar/>
   : <AdminNavBar/>
};
export default NavBar;
