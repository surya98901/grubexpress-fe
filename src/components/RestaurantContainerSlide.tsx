import { motion } from "framer-motion";
import type { Restaurant } from "../types/restaurant";
import { useEffect, useState } from "react";
import { getRestaurants } from "../services/restaurantApi";
import RestaurantCard from "./RestaurantCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";


const RestaurntContainerSlide = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const city = useSelector((state: RootState) => state.location.city);
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await getRestaurants({
          minRating: 4.5,
          city,
        });
        setRestaurants(response.data.restaurants);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };
    fetchRestaurants();
  }, [city]);
  return (
    <div className="w-[80vw] mt-5  ">
      <div className="flex items-center justify-between mb-4 px-2">
        <div>
          <h2 className="text-xl font-bold">Explore popular Restaurants</h2>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() =>
              document
                .getElementById("restaurant-carousel")
                ?.scrollBy({ left: -300, behavior: "smooth" })
            }
            className="h-9 w-9 rounded-full border flex items-center justify-center hover:bg-muted transition bg-green-700 text-white hover:text-green-700 "
          >
            ←
          </button>

          <button
            onClick={() =>
              document
                .getElementById("restaurant-carousel")
                ?.scrollBy({ left: 300, behavior: "smooth" })
            }
            className="h-9 w-9 rounded-full border flex items-center justify-center hover:bg-muted transition bg-green-700 text-white hover:text-green-700"
          >
            →
          </button>
        </div>
      </div>
      <div
        id="restaurant-carousel"
        className="flex gap-6 overflow-x-auto scrollbar-hide px-2 pt-2 pb-4 cursor-grab active:cursor-grabbing"
      >
        {restaurants.map((restaurant) => (
          <motion.div
            key={restaurant._id}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex-shrink-0 flex flex-col items-center gap-2"
          >
            <Link to={`/customer/restaurant/${restaurant._id}`}>
              {" "}
              <RestaurantCard data={restaurant} />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
export default RestaurntContainerSlide;
