
import { getMenuItemStatus, setMenuItemStatus,  } from "@/services/adminApis";
import axios from "axios";
import { useEffect, useState } from "react";

export const useSetItemAvailability = (id: string, itemId : string) => {
  const setStatus = async (available: true | false) => {
    try {
      await setMenuItemStatus(id, itemId, available);
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
export const useGetItemStatus = (id: string, itemId : string) => {
  const [available, setAvailability] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false);
  const [Error, setError] = useState<string | null>(null)
  const getStatus = async () => {
    if (!id) {
      setAvailability(true);
      setLoading(false);
      return;
    }
    try {
      setLoading(true)
      setError(null)
      const res  = await getMenuItemStatus(id, itemId);
      setAvailability(res.data.data)
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
  return {available, loading, Error}
};


