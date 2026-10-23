import { addItem } from "@/services/adminApis";
import type { itemData } from "@/types/items";
import axios from "axios";
import { toast } from "sonner";

const useAddItemsToMenu = (formData: itemData, resId: string) => {
  const postData = async (): Promise<boolean> => {
    try {
      await addItem(resId, formData);
      toast.success("Menu item added successfully!");
      return true;
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || "Failed to add menu item."
        : "Something went wrong.";

      toast.error(message);
      return false;
    }
  };

  return postData;
};

export default useAddItemsToMenu;