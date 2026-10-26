
import { useState } from "react";
import axios from "axios";
import { editAdminOrders } from "@/services/adminApis";

type OrderStatus =
  | "PLACED"
  | "PREPARING"
  |"CONFIRMED"
  |"READY"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED";

const useEditAdminOrder = (resid: string | null, oid: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatedStatus, setUpdatedStatus] = useState<OrderStatus | null>(null);

  const editOrder = async (status: OrderStatus): Promise<boolean> => {
    if (!resid || !oid) {
      setError("Restaurant ID and order ID are required.");
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await editAdminOrders(resid, oid, status);
      setUpdatedStatus(response.data.data);
      return true;
    } 
    catch (err: unknown) {
      setError(
        axios.isAxiosError(err)
          ? err.response?.data?.message ?? err.message
          : "Failed to update order status.",
      );

      return false;
    } finally {
      setLoading(false);
    }
  };

  return { editOrder, loading, error, updatedStatus };
};

export default useEditAdminOrder;
