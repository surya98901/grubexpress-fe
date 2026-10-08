
import api from "./api";

export const getRestaurants = ({
  limit = 10,
  skip = 0,
  minRating,
  city,
  search,
  cuisine,
  vegOnly,
}: {
  limit?: number;
  skip?: number;
  minRating?: number;
  city?: string;
  search?: string;
  cuisine?: string;
  vegOnly?: boolean;
}) => {
  return api.get("/api/restaurants", {
    params: {
      limit,
      skip,
      minRating,
      city,
      search,
      cuisine,
      vegOnly,
    },
  });
};
export const getRestaurant = (id: string) => {
  return api.get(`/api/restaurants/${id}`);
};

export const getRestaurantMenu = (id: string) => {
  return api.get(`/api/restaurants/${id}/menu`);
};