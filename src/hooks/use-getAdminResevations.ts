
import { getAdminReservations } from "@/services/adminApis";
import type { Reservation } from "@/types/reservations";
import axios from "axios";
import { useEffect, useState } from "react";

const useGetAdminReservations = (id: string | null) => {
  const [reservationData, setreservationData] = useState<Reservation[] | null>(null);
  const [reservationLoading, setLoading] = useState(false);
  const [reservationError, setError] = useState<string | null>(null);
  const fetchData = async () => {
     if (!id) {
      setreservationData([]);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const response = await getAdminReservations(id);
      setreservationData(response.data.data);
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
    reservationData,
    reservationLoading,
    reservationError,
    refetch : fetchData,
  };
};

export default useGetAdminReservations;