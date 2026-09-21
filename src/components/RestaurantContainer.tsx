import { getRestaurants } from "../services/restaurantApi";
import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { Link } from "react-router-dom";
import type { Restaurant } from "../types/restaurant";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";

const ResataurantContainer = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [limit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const city = useSelector((state: RootState) => state.location.city);
  useEffect(() => {
    setRestaurants([]);
    setSkip(0);
    setHasMore(true);
  }, [city]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (loading || !hasMore) return;

      try {
        setLoading(true);
        const response = await getRestaurants({ limit, skip, city });
        const newRestaurants = response.data.restaurants;
        setRestaurants((prev) => [...prev, ...newRestaurants]);
        if (newRestaurants.length < limit) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [skip, city]);

  useEffect(() => {
    const handleScroll = () => {
      if (loading || !hasMore) return;

      const scrollPosition = window.innerHeight + window.scrollY;

      const pageHeight = document.documentElement.scrollHeight;

      if (scrollPosition >= pageHeight - 200) {
        setSkip((prev) => prev + limit);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasMore, limit]);

  return (
    <> <h2 className="text-xl font-bold">The restaurents in {city}</h2>
      <div className="flex flex-wrap gap-4 justify-center items-center">
        {restaurants.map((restaurant) => (
          <Link
            key={restaurant._id}
            to={`/customer/restaurant/${restaurant._id}`}
          >
            <RestaurantCard data={restaurant} />
          </Link>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center p-5">
          <p>Loading...</p>
        </div>
      )}

      {!hasMore && (
        <div className="flex justify-end">
        <Button
          className=" w-[60px] h-[60px] rounded-full bg-green-700 text-white text-3xl"
          onClick={() =>
            window
              .scrollTo({ top: 0, behavior: "smooth" })
          }
        >
          ↑
        </Button>
        </div>
      )}
    </>
  );
};

export default ResataurantContainer;
