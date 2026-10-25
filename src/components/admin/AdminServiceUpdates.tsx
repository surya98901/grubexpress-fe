
import { useMemo, useState } from "react";
import { ClipboardList, Utensils, RotateCw } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { dineInStatuses, orderStatuses } from "@/assets/utils/constants";
import useGetAdminOrders from "@/hooks/use-getAdminOrders";
import useGetAdminReservations from "@/hooks/use-getAdminResevations";
import AdminOrdersListCard from "./AdminOrdersListCard";
import AdminReservationsCard from "./AdminReservationsCard";

type ServiceType = "orders" | "dineins";

const AdminServiceUpdates = () => {
  const [selectService, setSelectService] = useState<ServiceType>("orders");
  const [open, setOpen] = useState<string | null>(null);

  const restaurantId = useSelector(
    (state: RootState) => state.user.RestaurantId,
  );

  const isOrders = selectService === "orders";
  const statusList = isOrders ? orderStatuses : dineInStatuses;

  const { orderData, orderLoading } = useGetAdminOrders(
    isOrders ? restaurantId : null,
  );

  const { reservationData, reservationLoading } = useGetAdminReservations(
    isOrders ? null : restaurantId,
  );

  const loading = isOrders ? orderLoading : reservationLoading;
  const totalCount = isOrders
    ? (orderData?.length ?? 0)
    : (reservationData?.length ?? 0);

  const statusCounts = useMemo(() => {
    if (isOrders) {
      return {
        New: orderData?.filter((order) => order.orderStatus === "PLACED").length ?? 0,
        Preparation: orderData?.filter((order) => order.orderStatus === "PREPARING").length ?? 0,
        "Out for Delivery": orderData?.filter((order) => order.orderStatus === "OUT_FOR_DELIVERY").length ?? 0,
      };
    }

    return {
      New: reservationData?.filter((res) => res.status === "PLACED").length ?? 0,
      Confirmed: reservationData?.filter((res) => res.status === "CONFIRMED").length ?? 0,
      Reserved: reservationData?.filter((res) => res.status === "RESERVED").length ?? 0,
    };
  }, [isOrders, orderData, reservationData]);

  const handleServiceChange = (service: ServiceType) => {
    setSelectService(service);
    setOpen(null);
  };

  return (
    <aside className="w-full max-w-[360px] shrink-0 space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          aria-pressed={isOrders}
          onClick={() => handleServiceChange("orders")}
          className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all duration-200 ${
            isOrders
              ? "border-amber-400 bg-amber-400 shadow-md"
              : "border-gray-200 bg-white hover:border-amber-300 hover:shadow-md"
          }`}
        >
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
              isOrders ? "bg-white" : "bg-amber-100"
            }`}
          >
            <ClipboardList className="h-5 w-5 text-amber-700" />
          </div>
          <div className="min-w-0">
            <p className="text-2xl font-bold text-gray-900">{orderData?.length ?? 0}</p>
            <span className="text-sm text-gray-600">Orders</span>
          </div>
        </button>

        <button
          type="button"
          aria-pressed={!isOrders}
          onClick={() => handleServiceChange("dineins")}
          className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all duration-200 ${
            !isOrders
              ? "border-emerald-500 bg-emerald-500 shadow-md"
              : "border-gray-200 bg-white hover:border-emerald-300 hover:shadow-md"
          }`}
        >
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
              !isOrders ? "bg-white" : "bg-emerald-100"
            }`}
          >
            <Utensils className="h-5 w-5 text-emerald-700" />
          </div>
          <div className="min-w-0">
            <p className="text-2xl font-bold text-gray-900">
              {reservationData?.length ?? 0}
            </p>
            <span className="text-sm text-gray-600">Reservations</span>
          </div>
        </button>
      </div>

      <section className="grid grid-cols-3 gap-3">
        {statusList.map((status) => {
          const Icon = status.icon;

          return (
            <div
              key={status.name}
              className={`rounded-2xl border p-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm ${status.bg} ${status.border}`}
            >
              <div
                className={`mb-2 flex h-9 w-9 items-center justify-center rounded-lg ${status.iconBg}`}
              >
                <Icon className="h-4 w-4 text-white" />
              </div>
              <p className="text-xl font-bold text-gray-900">
                {statusCounts[status.name as keyof typeof statusCounts] ?? 0}
              </p>
              <span className="text-xs font-medium text-gray-500">
                {status.name}
              </span>
            </div>
          );
        })}
      </section>

      <section className="flex max-h-[100vh] min-h-[80vh] flex-col rounded-2xl border border-gray-100 bg-gray-50 p-3">
        <div className="my-2 flex shrink-0 items-center justify-between gap-2 px-3">
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900">
              {isOrders ? "Today's Orders" : "Today's Reservations"}
            </h3>
            <p className="mt-0.5 text-xs text-gray-500">
              {isOrders ? "Manage incoming orders" : "Manage table reservations"}
            </p>
          </div>

          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-600">
            {totalCount} total
          </span>
        </div>

        <div className="mt-2 flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-1">
          {loading ? (
            <div className="flex flex-col items-center justify-center gap-3 py-12">
              <RotateCw className="h-5 w-5 animate-spin text-gray-400" />
              <p className="text-sm text-gray-500">Loading {isOrders ? "orders" : "reservations"}...</p>
            </div>
          ) : isOrders ? (
            orderData?.length ? (
              orderData.map((item) => (
                <AdminOrdersListCard
                  key={item._id}
                  data={item}
                  open={open}
                  setOpen={setOpen}
                />
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-4 py-10 text-center">
                <ClipboardList className="mx-auto mb-3 h-8 w-8 text-gray-300" />
                <p className="font-medium text-gray-700">No orders found</p>
                <p className="mt-1 text-xs text-gray-400">
                  New orders will appear here.
                </p>
              </div>
            )
          ) : reservationData?.length ? (
            reservationData.map((res) => (
              <AdminReservationsCard
                key={res._id}
                data={res}
                open={open}
                setOpen={setOpen}
              />
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-4 py-10 text-center">
              <Utensils className="mx-auto mb-3 h-8 w-8 text-gray-300" />
              <p className="font-medium text-gray-700">No reservations found</p>
              <p className="mt-1 text-xs text-gray-400">
                New reservations will appear here.
              </p>
            </div>
          )}
        </div>
      </section>
    </aside>
  );
};

export default AdminServiceUpdates;
