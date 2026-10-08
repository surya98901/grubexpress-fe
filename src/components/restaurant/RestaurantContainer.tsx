import { useEffect, useMemo, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { Link } from "react-router-dom";

import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import useGetRestaurants from "@/hooks/use-getRestaurants";

interface RestaurantContainerProps {
  filter: string;
  searchQuery?: string;
  cuisineFilter?: string;
  vegOnly?: boolean;
  minRatingFilter?: boolean;
  onResetFilters?: () => void;
}

const ResataurantContainer = ({
  filter,
  searchQuery = "",
  cuisineFilter = "",
  vegOnly = false,
  minRatingFilter = false,
  onResetFilters,
}: RestaurantContainerProps) => {
  const [limit] = useState(20);
  const [skip, setSkip] = useState(0);
  const city = useSelector((state: RootState) => state.location.city);

  const { restaurants, loading, hasMore } = useGetRestaurants({
    limit,
    skip,
    city,
    search: searchQuery,
    cuisine: cuisineFilter,
    vegOnly,
    minRating: minRatingFilter ? 4.0 : undefined,
  });

  const filteredRestaurants = useMemo(() => {
    let data = [...restaurants];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      data = data.filter(
        (r) =>
          r.Name?.toLowerCase().includes(q) ||
          r.Description?.toLowerCase().includes(q) ||
          r.Cusine?.some((c) => c.toLowerCase().includes(q))
      );
    }

    if (cuisineFilter && cuisineFilter !== "All") {
      const cQuery = cuisineFilter.toLowerCase();
      data = data.filter((r) =>
        r.Cusine?.some((c) => c.toLowerCase().includes(cQuery))
      );
    }

    if (vegOnly) {
      data = data.filter((r) => r.vegOnly === true);
    }

    if (minRatingFilter) {
      data = data.filter((r) => r.rating >= 4.0);
    }

    if (filter === "rating") {
      data.sort((a, b) => b.rating - a.rating);
    } else if (filter === "costLowToHigh") {
      data.sort((a, b) => a.avgPriceforTwo - b.avgPriceforTwo);
    } else if (filter === "costHighToLow") {
      data.sort((a, b) => b.avgPriceforTwo - a.avgPriceforTwo);
    }

    return data;
  }, [restaurants, searchQuery, cuisineFilter, vegOnly, minRatingFilter, filter]);

  useEffect(() => {
    setSkip(0);
  }, [city, filter, searchQuery, cuisineFilter, vegOnly, minRatingFilter]);

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
    <>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-gray-800">
          Restaurants in <span className="text-green-700">{city}</span>
          {filteredRestaurants.length > 0 && (
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({filteredRestaurants.length} found)
            </span>
          )}
        </h2>
      </div>

      {filteredRestaurants.length > 0 ? (
        <div className="flex flex-wrap w-[80vw] gap-6 justify-center md:justify-start items-stretch mx-4 ">
          {filteredRestaurants.map((restaurant) => (
            <Link
              key={restaurant._id}
              to={`/customer/restaurant/${restaurant._id}`}
              className="transition-transform duration-200">
              <RestaurantCard data={restaurant} />
            </Link>
          ))}
        </div>
      ) : (
        !loading && (
          <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-gray-100 shadow-sm my-6 text-center">
            <div className="w-16 h-16 bg-green-50 text-green-700 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
              🍽️
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">
              No restaurants found
            </h3>
            <p className="text-gray-500 max-w-md text-sm mb-6">
              We couldn't find any restaurants matching your search criteria in{" "}
              <span className="font-semibold text-gray-700">{city}</span>.
            </p>
            {onResetFilters && (
              <Button
                onClick={onResetFilters}
                className="bg-green-700 hover:bg-green-800 text-white rounded-xl px-6"
              >
                Clear All Filters
              </Button>
            )}
          </div>
        )
      )}

      {loading && (
        <div className="flex justify-center p-8">
          <div className="flex items-center gap-2 text-green-700 font-medium">
            <div className="w-4 h-4 border-2 border-green-700 border-t-transparent rounded-full animate-spin" />
            Loading restaurants...
          </div>
        </div>
      )}

      {!hasMore && filteredRestaurants.length > 0 && (
        <div className="flex justify-end mt-4">
          <Button
            className="w-12 h-12 rounded-full bg-green-700 hover:bg-green-800 text-white text-2xl shadow-lg flex items-center justify-center"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            title="Scroll to top"
          >
            ↑
          </Button>
        </div>
      )}
    </>
  );
};

export default ResataurantContainer;
