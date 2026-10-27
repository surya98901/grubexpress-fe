
import { getRestaurantStatus, setRestaurantStatus } from "@/services/adminApis";
import axios from "axios";
import { useEffect, useState } from "react";

export const useSetRestaurantStatus = (id: string) => {
  const setStatus = async (status: "open" | "close") => {
    try {
      await setRestaurantStatus(id, status);
      return null;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data?.message || "Unable to edit the status";
      }
      return "Something went wrong";
    }
  };

  return setStatus;
};
export const useGetRestaurantStatus = (id: string) => {
  const [status, setStatus] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false);
  const [Error, setError] = useState<string | null>(null)
  const getStatus = async () => {
    if (!id) {
      setStatus("");
      setLoading(false);
      return;
    }
    try {
      setLoading(true)
      setError(null)
      const res  = await getRestaurantStatus(id);
      setStatus(res.data.data)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data?.message || "Unable to edit the status";
      }
      return "Something went wrong";
    }finally{
      setLoading(false)
    }
  };
  useEffect(()=>{ getStatus()}, [id]);
  return {status, loading, Error}
};


