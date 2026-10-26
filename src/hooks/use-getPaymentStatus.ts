
import { useCallback, useEffect, useState } from "react";
import { getPayment } from "@/services/userApi";
import type { PaymentDetails } from "@/types/payment";

const useGetPayment = (orderId: string) => {
  const [payment, setPayment] = useState<PaymentDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPayment = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getPayment(orderId);
      setPayment(response.data.data);
    } catch (err) {
      setError("Failed to fetch payment");
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    if (orderId) {
      fetchPayment();
    }
  }, [orderId, fetchPayment]);

  return { payment, loading, error, refetch: fetchPayment };
};

export default useGetPayment;
