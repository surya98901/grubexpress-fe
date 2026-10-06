import { editItemDetails } from "@/services/adminApis";
import type { itemData } from "@/types/items";
import axios from "axios";
const useEditItemDetails = (
  resId: string,
  itemId: string,
  formData: itemData,
) => {
    
  const editItems = async () => {
    try {
      await editItemDetails(resId, itemId, formData);
      return null;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data?.message || " unable to edit the item ";
      }
      return "Something went wrong";
    }
  };
  return editItems;
};
export default useEditItemDetails;
