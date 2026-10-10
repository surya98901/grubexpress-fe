import OrderCards from "@/components/orders/OrderCards";
import useGetOrders from "@/hooks/use-getOrders";

const Order = () => {
  const { orders, loading, error } = useGetOrders();

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;
  if (!orders?.length) return <p>No orders found.</p>;

  return (
    <div>
      <section>
        {orders?.map((item) => (
          <OrderCards key={item._id} data={item} />
        ))}
      </section>
    </div>
  );
};
export default Order;
