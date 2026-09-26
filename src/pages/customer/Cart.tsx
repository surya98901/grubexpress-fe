import { getUserCart } from "@/services/userApi";
import { useEffect, useState } from "react";
import CartItemCard from "@/components/CartItemCard";

const Cart = () => {
  const [cartData, setCartData] = useState<any[]>([]);

  const fetchCartDetails = async () => {
    try {
      const response = await getUserCart();
      const cartDetails = response.data.data.items;

      setCartData(cartDetails);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCartDetails();
  }, []);

  return (
    <div className="mx-auto flex flex-col p-2">
      <h1>Cart Page</h1>

      <p>cartLength: {cartData.length}</p>

      <section className="mx-auto flex flex-col">
        {cartData.map((item: any) => (
          <CartItemCard
            key={item.menuItemId}
            data={item}
            onCartUpdate={fetchCartDetails}
          />
        ))}
      </section>
    </div>
  );
};

export default Cart;