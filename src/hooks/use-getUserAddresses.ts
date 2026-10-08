import { useEffect, useState } from "react";
import axios from "axios";
import { getUserAddress } from "@/services/userApi";
import type { Address } from "@/types/address";

const useGetUserAddresses = () => {
  const [addressData, setAddressData] = useState<Address[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUserAddress();
      setAddressData(response?.data?.addressData);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Unable to fetch user details");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    
  }, []);

  return {
    addressData,
    loading,
    error,
    refetch: fetchUserDetails,
  };
};

export default useGetUserAddresses;