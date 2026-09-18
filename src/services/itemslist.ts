
import api from "./api";

export const getdisplayItems = () => {
  return api.get("/api/itemsList");
};