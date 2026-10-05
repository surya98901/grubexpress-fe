import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Bell, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { useEffect } from "react";
import useGetUserData from "@/hooks/use-getUserData";

const AdminNavBar = () => {
  const userName = useSelector((state: RootState) => state.user.userName);
  const fetchUserDetails = useGetUserData();
  useEffect(() => {
    fetchUserDetails();
  }, []);
  return (
    <div className="navbar flex justify-between items-center p-4 bg-green-700 text-white px-4">
      <h1 className="flex gap-5 items-center">
        <Link to="/admin/home" className="text-xl font-bold">
          Grub Express
        </Link>
        <span> Welcome, {userName}</span>
      </h1>
      <nav className="flex ">
        <section className="flex justify-between items-center gap-4 px-4">
          <NativeSelect>
            <NativeSelectOption value="">Select status</NativeSelectOption>
            <NativeSelectOption value="todo">Todo</NativeSelectOption>
            <NativeSelectOption value="in-progress">
              In Progress
            </NativeSelectOption>
            <NativeSelectOption value="done">Done</NativeSelectOption>
            <NativeSelectOption value="cancelled">Cancelled</NativeSelectOption>
          </NativeSelect>
          <Bell />
          <UserRound />
        </section>
      </nav>
    </div>
  );
};
export default AdminNavBar;
