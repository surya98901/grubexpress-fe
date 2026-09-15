import api from "./api";

export const getMenu = (id:string) => {
  return api.get(`/api/restaurants/${id}/menu`);
};
