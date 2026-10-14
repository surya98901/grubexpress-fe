import { useMemo, useState } from "react";
import AdminlistCard from "@/components/admin/AdminlistCards";
import { ClipboardList, Utensils, RotateCw } from "lucide-react";
import useGetAdminOrders from "@/hooks/use-getAdminOrders";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { dineInStatuses, orderStatuses } from "@/assets/utils/constants";

type ServiceType = "orders" | "dineins";

const AdminServiceUpdates = () => {
  const [selectService, setSelectService] = useState<ServiceType>("orders");
  const restaurantId = useSelector(
    (state: RootState) => state.user.RestaurantId,
  );

  const isOrders = selectService === "orders";
  const statusList = isOrders ? orderStatuses : dineInStatuses;

  const { orderData, loading} = useGetAdminOrders(
    isOrders ? restaurantId : null,
  );

  // Flatten items while including order-level metadata
  const displayedItems = useMemo(() => {
    if (!isOrders || !orderData) return [];

    return orderData.flatMap((order) =>
      order.items.map((item) => ({
        ...item,
        orderId: order._id,
        orderStatus: order.orderStatus,
        createdAt: order.createdAt,
      })),
    );
  }, [orderData, isOrders]);

  // Single-pass count lookup
  const statusCounts = useMemo(() => {
    if (!isOrders || !orderData)
      return { New: 0, Preparation: 0, "Out for Delivery": 0 };

    return orderData.reduce(
      (acc, order) => {
        if (order.orderStatus === "PLACED") acc.New += 1;
        else if (order.orderStatus === "PREPARING") acc.Preparation += 1;
        else if (order.orderStatus === "OUT_FOR_DELIVERY")
          acc["Out for Delivery"] += 1;
        return acc;
      },
      { New: 0, Preparation: 0, "Out for Delivery": 0 },
    );
  }, [orderData, isOrders]);

  return (
    <aside className="w-full max-w-[360px] shrink-0 space-y-5">
      {/* Service Switcher Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setSelectService("orders")}
          className={`flex items-center gap-3 rounded-2xl border px-4 text-left transition-all duration-200 ${
            isOrders
              ? "border-yellow-400 bg-yellow-400 shadow-md"
              : "border-gray-200 bg-white hover:-translate-y-0.5 hover:border-yellow-300 hover:shadow-md"
          }`}
        >
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
              isOrders ? "bg-white" : "bg-yellow-100"
            }`}
          >
            <ClipboardList className="h-5 w-5 text-yellow-700" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {orderData?.length || 0}
            </p>
            <span className="text-sm text-gray-600">Orders</span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setSelectService("dineins")}
          className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all duration-200 ${
            !isOrders
              ? "border-green-500 bg-green-500 shadow-md"
              : "border-gray-200 bg-white hover:-translate-y-0.5 hover:border-green-300 hover:shadow-md"
          }`}
        >
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
              !isOrders ? "bg-white" : "bg-green-100"
            }`}
          >
            <Utensils className="h-5 w-5 text-green-700" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">0</p>
            <span className="text-sm text-gray-600">Dine-ins</span>
          </div>
        </button>
      </div>

      {/* Status Counters */}
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

  

      <section className="flex max-h-[100vh] min-h-[80vh] flex-col rounded-2xl bg-gray-200 p-3">
        <div className="my-2 flex shrink-0 items-center justify-between px-3">
          <div>
            <h3 className="font-semibold text-gray-900">
              {isOrders ? "Today's Orders" : "Today's Reservations"}
            </h3>
            <p className="mt-0.5 text-xs text-gray-500">
              {isOrders
                ? "Recent order activity"
                : "Recent reservation activity"}
            </p>
          </div>

          <button
            type="button"
            className="rounded-lg p-1 text-gray-500 transition hover:bg-white hover:text-gray-900"
          >
            <RotateCw className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-2 flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-1">
          {displayedItems.length > 0 ? (
            displayedItems.map((item) => (
              <AdminlistCard key={item.menuItemId} list={item} />
            ))
          ) : (
            <p className="py-8 text-center text-sm text-gray-500">
              {loading ? "Loading..." : "No items found"}
            </p>
          )}
        </div>
      </section>
    </aside>
  );
};

export default AdminServiceUpdates;
