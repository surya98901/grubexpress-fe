import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Footer } from "../components/Footer";
import SideMenu from "@/components/admin/SideMenu";
import BreadCrumbs from "@/components/genericUIcomponents/BreadCrumbs";

const AdminLayout = () => {
  return (
    <div className="flex flex-col min-h-screen ">
      <NavBar />
      <div className="flex">
        <SideMenu />
        <section className="flex-1 p-5">
          <BreadCrumbs  />
          <Outlet />
        </section>
        
      </div>
      <Footer />
    </div>
  );
};
export default AdminLayout;
