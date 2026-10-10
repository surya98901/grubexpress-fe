
import { useEffect, useState } from "react";
import type { OrderDetails } from "@/types/order";
import { getOrders } from "@/services/userApi";
import axios from "axios";

const useGetOrders = () => {
  const [orders, setOrders] = useState<OrderDetails[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        setOrders(response.data.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(
            err.response?.data?.message || "Unable to fetch orders"
          );
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return { orders, loading, error };
};

export default useGetOrders;
