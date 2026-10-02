import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Footer } from "../components/Footer";
import SideMenu from "@/components/admin/SideMenu";

const AdminLayout = () => {
  return (
    <div className="flex flex-col min-h-screen ">
      <NavBar />
      <div className="flex">
        <SideMenu />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
export default AdminLayout;
