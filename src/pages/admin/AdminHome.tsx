import { useEffect, useState } from "react";
import type { Restaurant } from "@/types/restaurant";
import { getAdminRestaurents } from "@/services/adminApis";
import { useDispatch } from "react-redux";
import { setRestaurant } from "@/store/slices/userSlice";
import RestaurantHeroBanner from "@/components/restaurant/RestaurantHeroBanner";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [restaurantData, setRestaurantData] = useState<Restaurant[] | null>(
    null,
  );
  useEffect(() => {
    const fetchAdminRestaurents = async () => {
      try {
        const response = await getAdminRestaurents();
        setRestaurantData(response.data.data);
      } catch (err) {
        console.error("Error fetching admin restaurants:", err);
      }
    };
    fetchAdminRestaurents();
  }, []);
  const handleRestaurantSelection = (restaurantId: string) => {
     dispatch(setRestaurant(restaurantId));
     navigate("/admin/dashboard");
  };

  console.log("restaurantData", restaurantData);
  return restaurantData ? (
    <div className="flex flex-col gap-5">
      {restaurantData?.map((restaurant) => (
        <div
          key={restaurant._id}
          onClick={() => handleRestaurantSelection(restaurant._id)}
        >
          <RestaurantHeroBanner data={restaurant} />
        </div>
      ))}
    </div>
  ) : (
    <div>
      <h1>Admin Home</h1>
      <p>add your restaurant</p>
    </div>
  );
};
export default AdminHome;
