import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Bell, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import useGetUserData from "@/hooks/use-getUserData";
import type { Restaurant } from "@/types/restaurant";
import { getAdminRestaurents } from "@/services/adminApis";
import { setRestaurant } from "@/store/slices/userSlice";

const AdminNavBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userName = useSelector((state: RootState) => state.user.userName);
  const [restaurantData, setRestaurantData] = useState<Restaurant[] | null>(
    null,
  );
   const selectedRestaurant = useSelector(
    (state: RootState) => state.user.RestaurantId,
  );
  const [loading, setLoading] = useState(true);
   const handleRestaurantSelection = (restaurantId: string) => {
    dispatch(setRestaurant(restaurantId));
    navigate("/admin/dashboard");
  };

  useEffect(() => {
    const fetchAdminRestaurents = async () => {
      try {
        const response = await getAdminRestaurents();
        setRestaurantData(response.data.data);
      } catch (err) {
        console.error("Error fetching admin restaurants:", err);
        setRestaurantData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminRestaurents();
  }, []);

  const fetchUserDetails = useGetUserData();
  useEffect(() => {
    fetchUserDetails();
  }, []);
  return (
    <div className="navbar flex justify-between items-center p-4 bg-green-700 text-white px-4">
      <section className="flex items-center justify-between w-[20vw] mx-10 ">
        <Link to="/admin/home" className="text-xl font-bold">
          <img src="/Grub Express Cartoon Train.png" alt="" className="w-[200px]"/>
        </Link>
        <span> Welcome, {userName}</span>
      </section>
      <nav className="flex ">
        <section className="flex justify-between items-center gap-4 px-4">
          {!loading && <NativeSelect
          value={selectedRestaurant || ""}
          onChange={(e)=>handleRestaurantSelection(e.target.value)}>
            {restaurantData?.map((item) => (
              <NativeSelectOption key ={item._id}  value={item._id}>{item.Name}</NativeSelectOption>
            ))}
          </NativeSelect>}
          <Bell />
          <UserRound />
        </section>
      </nav>
    </div>
  );
};
export default AdminNavBar;
