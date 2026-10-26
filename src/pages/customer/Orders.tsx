import { activeOrderStatuses } from "@/assets/utils/constants";
import { DatePicker } from "@/components/genericUIcomponents/DatePicker";
import OrderCards from "@/components/orders/OrderCards";
import useGetOrders from "@/hooks/use-getOrders";
import type { OrderDetails } from "@/types/order";
import { useEffect, useState } from "react";

const Order = () => {
  const { orders, loading, error } = useGetOrders();
  const [filter, setFilter] = useState<string>( "All Orders");
  const [orderData, setOrder] = useState<OrderDetails[]>([]);
  const filters = [
    {
      title: "All Orders",
    },
    {
      title: "Pending",
    },
    {
      title: "Completed",
    },
  ];
  useEffect(() => {
  if (filter === "All Orders") {
    setOrder(orders ?? []);

  } else if (filter === "Pending") {
    const newOrders = (orders ?? []).filter((item) =>
      activeOrderStatuses.includes(item.orderStatus)
    );
    setOrder(newOrders);

  } else if (filter === "Completed") {
    const newOrders = (orders ?? []).filter(
      (item) => ["DELIVERED","CANCELLED"].includes(item.orderStatus)
    );

    setOrder(newOrders);
  }
}, [filter, orders]);
  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;
  if (!orders?.length) return <p>No orders found.</p>;

  return (
    <div >
      <div className="my-2 px-5 rounded-xl h-[10vh] w-[70vw] mx-auto shadow-xl flex border-1 border-t-gray-300 items-center justify-between">
        <section className=" flex items-center gap-4 px-5 ">
          {filters.map((item, index) => (
            <button
              key={index}
              className={`${filter === item.title && "font-bold"} px-2 py-1 rounded-xl  underline `}
              onClick={() => setFilter(item.title)}
            >
              {item.title}
            </button>
          ))}
        </section>
        <DatePicker />
      </div>
      <section>
        {orderData?.map((item) => (
          <OrderCards key={item._id} data={item}  />
        ))}
      </section>
    </div>
  );
};
export default Order;
