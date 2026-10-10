import { useEffect, useState } from "react";
import { getRestaurants } from "@/services/restaurantApi";
import type { Restaurant } from "@/types/restaurant";
import axios from "axios";

type UseGetRestaurantsProps = {
  limit?: number;
  skip?: number;
  city?: string;
  search?: string;
  cuisine?: string;
  vegOnly?: boolean;
  minRating?: number;
};

export const useGetRestaurants = ({
  limit = 10,
  skip = 0,
  city = "",
  search = "",
  cuisine = "",
  vegOnly = false,
  minRating,
}: UseGetRestaurantsProps) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setRestaurants([]);
    setHasMore(true);
  }, [city, search, cuisine, vegOnly, minRating]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (loading) return;

      try {
        setLoading(true);

        const response = await getRestaurants({
          limit,
          skip,
          city,
          search,
          cuisine,
          vegOnly,
          minRating,
        });

        const newRestaurants = response.data?.restaurants || response.data || [];

        if (skip === 0) {
          setRestaurants(newRestaurants);
        } else {
          setRestaurants((prev) => [...prev, ...newRestaurants]);
        }

        if (newRestaurants.length < limit) {
          setHasMore(false);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error("Fetch restaurants error:", err.response?.data?.message || err.message);
        } else {
          console.error("Unexpected error:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [skip, city, search, cuisine, vegOnly, minRating, limit]);

  return {
    restaurants,
    loading,
    hasMore,
  };
};

export const useGetRestaurantById = (id: string)=>{

}