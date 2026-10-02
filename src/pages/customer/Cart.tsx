import CartItemCard from "@/components/customer/CartItemCard";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { Link } from "react-router-dom";
import { placeOrder } from "@/services/userApi";

const Cart = () => {
  const { items, total, restaurantId } = useSelector(
    (state: RootState) => state.cart,
  );
  const createOrder = async () => {
    try {
      const response = await placeOrder();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  return items.length != 0 ? (
    <div className=" flex p-2 gap-2 bg-gray-300 mx-auto gap-5">
      <div className="flex flex-col w-[30vw] h-[80vh] gap-2 bg-white p-3 rounded-xl  ">
        <section className="mx-auto flex flex-col">
          {items.map((item) => (
            <CartItemCard key={item.menuItemId} data={item} />
          ))}
          <Link
            to={`/customer/restaurant/${restaurantId}`}
            className="text-green-700 underline"
          >
            add other items ?
          </Link>
        </section>
        <textarea
          name="suggestions"
          id="suggestions box"
          placeholder="suggestions"
        ></textarea>
        <section>
          <h4>Bill details</h4>
          <ul>
            <li className="flex justify-between ">
              item Total <span>₹{total}</span>
            </li>
            <li className="flex justify-between">
              Delivery fee <span>₹{total > 1000 ? 10 : 35 }</span>
            </li>
          </ul>
          <section className="flex justify-between">
            <p>
              GST & Other Charges <span>i</span>
            </p>
            <p>₹{Math.ceil(total * 0.05)}</p>
          </section>
        </section>
        <section className="flex justify-between">
          <p>TO PAY</p>
          <p>₹{total + (total > 1000 ? 10 : 35) + Math.ceil(total * 0.05)}</p>
        </section>
      </div>
      <div className="flex flex-col h-[80vh] w-[50vw] gap-2 ">
        <section className="bg-white p-3 rounded-xl h-[50vh] px-5">
          <h2 className="text-xl font-bold tracking-tighter ">
            Select delivery address
          </h2>
          <section>addressCards with city filter</section>
        </section>
        <section className="bg-white px-5 rounded-xl flex flex-col py-5 gap-5">
          <h3 className="text-xl font-bold tracking-tighter ">
            Choose payment method
          </h3>
          <div onClick={createOrder}>PROCEED TO PAY</div>
        </section>
      </div>
    </div>
  ) : (
    <div className="flex justify-between items-center text-black text-xl m-auto ">
      EmptyCart
     </div>
  );
};
export default Cart;
