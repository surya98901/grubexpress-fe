import { getRestaurants } from "../services/restaurantApi";
import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { Link } from "react-router-dom";
import type { Restaurant } from "../types/restaurant";
const ResataurantContainer = () => {
const [restaurants, setRestaurants] = useState<Restaurant[]>([]);  
useEffect( ()=>{
    const fetchRestaurants = async () => {
      try {
        const response = await getRestaurants();
        setRestaurants(response.data.restaurants);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };
    fetchRestaurants();
  }, []);

  return (
    <div className="flex flex-wrap gap-4 justify-center items-center">
      {restaurants.map((restaurant) => (
       <Link key={restaurant._id}   to={`/customer/restaurant/${restaurant._id}`} > <RestaurantCard data={restaurant} /></Link>
      ))}
    </div>
  );
};
export default ResataurantContainer;
