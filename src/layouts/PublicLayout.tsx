import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Outlet } from "react-router-dom";



const PublicLayout = () => {
  return (
    <div className=" min-h-screen flex flex-col justify-center items-center ">
       <Button
            className="w-full mt-2 bg-zinc-100 font-medium text-zinc-900 hover:bg-zinc-200 transition-colors"
            onClick={()=>{
              window.location.href = "/"
            }}
          >
            back
          </Button>
        <Outlet/>
        <Footer />
    </div>
  );
};
export default PublicLayout;