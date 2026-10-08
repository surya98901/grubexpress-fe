import { useEffect, useState } from "react";
import { getdisplayItems } from "@/services/itemslist";

const useGetFoodItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchItemslist = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getdisplayItems();
      setItems(response.data.list);
    } catch (err) {
      console.error("Error fetching items list", err);

      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error("Failed to fetch food items"));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItemslist();
  }, []);

  return {
    items,
    loading,
    error,
    refetch: fetchItemslist,
  };
};

export default useGetFoodItems;