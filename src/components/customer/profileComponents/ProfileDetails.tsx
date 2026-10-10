import { profileOptions } from "@/assets/utils/constants";
import OrderCards from "@/components/orders/OrderCards";
import useGetOrders from "@/hooks/use-getOrders";
import useGetUserAddresses from "@/hooks/use-getUserAddresses";
import { ArrowUpRight, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {  AddressCard } from "../AddressCard";
import AddressAlert from "@/components/genericUIcomponents/Alerts/AddressAlert";

const ProfileDetails = ({ active }: { active: string }) => {
  const activeOption = profileOptions.find((item) => item.label === active);
  const { orders, loading, error } = useGetOrders();
  const {
    addressData,
    loading: addressLoading,
    error: addressError,
  } = useGetUserAddresses();
  const navigate = useNavigate();
  const ActiveIcon = activeOption?.icon ?? Package;
  const isOrders = active === "Orders";
  const isAddress = active === "Addresses";
  const currentLoading = isOrders
    ? loading
    : isAddress
      ? addressLoading
      : false;
  const currentError = isOrders ? error : isAddress ? addressError : null;
  const activeList = isOrders ? orders : isAddress ? addressData : null;
  if (currentLoading) {
    return <p>Loading {isOrders ? "orders" : "addresses"}...</p>;
  }
  if (currentError) {
    return <p>{currentError}</p>;
  }
  const hasItems = Boolean(activeList?.length);

  return (
    <section className="h-[65vh] w-[60vw] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="flex items-center gap-4 border-b border-gray-100 px-6 py-6 md:px-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-700">
          <ActiveIcon size={23} strokeWidth={1.8} />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold tracking-tight">{active}</h3>
          <p className="mt-1 text-sm text-gray-500">
            {activeOption?.description}
          </p>
        </div>
        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
          My account
        </span>
      </div>

      <div className="p-2">
        {hasItems && isOrders ? (
          <div className="flex h-[50vh] flex-col  overflow-y-auto ">
            {orders!.map((order) => (
              <OrderCards key={order._id} data={order} />
            ))}
          </div>
        ) : hasItems && isAddress ? (
          <div className="px-5 flex flex-col">
            <div className="flex min-h-[280px] flex gap-4 overflow-x-auto">
              {addressData?.map((item) => (
                <AddressCard key={item._id} data={item} />
              ))}
            </div>
            <AddressAlert />
          </div>
        ) : (
          <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-green-50 text-green-700">
              <ActiveIcon size={36} strokeWidth={1.5} />
            </div>

            <h4 className="text-lg font-bold">
              {isOrders
                ? "No orders found"
                : isAddress
                  ? "No addresses found"
                  : activeOption?.tagline}
            </h4>

            <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
              {isOrders || isAddress
                ? isOrders
                  ? "You haven't placed any orders yet."
                  : "Add a delivery address to make checkout easier."
                : activeOption?.DetailDescription}
            </p>

            {isOrders && (
              <button
                className="mt-6 flex items-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/15 transition hover:-translate-y-0.5 hover:bg-green-800"
                onClick={() => navigate("/customer/restaurants")}
              >
                {activeOption?.linkTag}
                <ArrowUpRight size={17} />
              </button>
            )}

            {isAddress && (
              <AddressAlert />
            )}

            {!isOrders && !isAddress && activeOption?.linkTag && (
              <button className="mt-6 flex items-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/15 transition hover:-translate-y-0.5 hover:bg-green-800">
                {activeOption.linkTag}
                <ArrowUpRight size={17} />
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfileDetails;
