import { addUserOrderItem, removeUserOrderItem } from "@/services/userApi";
import { Leaf, Ham } from "lucide-react";

const CartItemCard = ({data,onCartUpdate,}: {data: any; onCartUpdate: () => void;}) => {
  const addToCart = async () => {
    try {
      await addUserOrderItem(data.menuItemId);
      onCartUpdate();
    } catch (err) {
      console.log(err);
    }
  };

  const removeFromCart = async () => {
    try {
      await removeUserOrderItem(data.menuItemId);
      onCartUpdate();
    } catch (err) {
      console.log(err);
    }
  };

  const isVeg = data.type === "veg";

  return (
    <div className="group flex h-[15vh] w-[30vw] items-center justify-between border-b border-gray-200 py-5 text-black">
      <div className="flex gap-2">
        <div className="h-[100px] w-[100px] overflow-hidden rounded-full border-2 border-background shadow-md">
          <img
            src={data.imageURL}
            alt={data.title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>

        <div className="flex flex-col justify-center gap-2">
          <section className="flex items-center gap-2">
            <h2 className="truncate text-xl font-semibold text-gray-900">
              {data.title}
            </h2>

            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border-2 ${
                isVeg ? "border-green-700" : "border-red-700"
              }`}
            >
              {isVeg ? (
                <Leaf size={12} className="fill-green-500 text-green-700" />
              ) : (
                <Ham size={12} className="fill-red-500 text-red-700" />
              )}
            </span>
          </section>

          <div className="flex h-[5vh] w-[10vw] items-center overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
            <button
              onClick={removeFromCart}
              className="flex h-full w-10 items-center justify-center bg-green-700 text-lg font-bold text-white transition-colors hover:bg-green-50 hover:text-green-700"
            >
              −
            </button>

            <span className="flex h-full flex-1 items-center justify-center border-x border-gray-200 bg-white text-sm font-bold text-green-700">
              {data.quantity}
            </span>

            <button
              onClick={addToCart}
              className="flex h-full w-10 items-center justify-center bg-green-700 text-lg font-bold text-white transition-colors hover:bg-green-50 hover:text-green-700"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <h4>₹{data.subTotal}/-</h4>
    </div>
  );
};

export default CartItemCard;
