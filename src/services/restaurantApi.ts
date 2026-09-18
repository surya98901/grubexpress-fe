
import api from "./api";

export const getRestaurants = ({
  limit = 10,
  skip = 0,
  minRating,
  city,
}: {
  limit?: number;
  skip?: number;
  minRating?: number;
  city?: string;
}) => {
  return api.get("/api/restaurants", {
    params: {
      limit,
      skip,
      minRating,
      city,
    },
  });
};
export const getRestaurant = (id: string) => {
  return api.get(`/api/restaurants/${id}`);
};

export const getRestaurantMenu = (id: string) => {
  return api.get(`/api/restaurants/${id}/menu`);
};