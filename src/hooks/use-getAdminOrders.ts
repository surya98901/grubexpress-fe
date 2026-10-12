import { getAdminOrders } from "@/services/adminApis";
import type { OrderDetails } from "@/types/order";
import axios from "axios";
import { useEffect, useState } from "react";

const useGetAdminOrders = (id: string | null) => {
  const [orderData, setOrderData] = useState<OrderDetails[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchData = async () => {
     if (!id) {
      setOrderData([]);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const response = await getAdminOrders(id);
      setOrderData(response.data.data);
      console.log(response)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Unable to fetch user details");
      } else {
        setError("Something went wrong");
      }
    }finally{
        setLoading(false);
    }
  };
  useEffect(()=>{
    fetchData();
  }, [id]);
  return {
    orderData,
    loading,
    error,
    refetch : fetchData,
  };
};

export default useGetAdminOrders;