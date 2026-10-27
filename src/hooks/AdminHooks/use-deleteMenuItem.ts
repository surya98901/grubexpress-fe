import { deleteMenuItem } from "@/services/adminApis";
import axios from "axios";

const useDeleteMenuItem = (id: string, itemId: string) => {
  const deleteItem = async (): Promise<string | null>=> {
    if (!id || !itemId) return "restaurant Id| menuId are require";
    try {
      await deleteMenuItem(id, itemId);
      return null;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data?.message || " unable to edit the item ";
      }
      return "Something went wrong";
    }
  };
  return deleteItem;
};
export default useDeleteMenuItem;
