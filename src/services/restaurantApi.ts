
import api from "./api";

export const getRestaurants = () => {
  return api.get("/api/restaurants");
};

export const getRestaurant = (id: string) => {
  return api.get(`/api/restaurants/${id}`);
};

export const getRestaurantMenu = (id: string) => {
  return api.get(`/api/restaurants/${id}/menu`);
};