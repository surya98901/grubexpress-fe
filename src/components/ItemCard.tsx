import { Leaf, Ham } from "lucide-react";
import Rating from "@/components/genericUIcomponents/rating";
import type { menuItems } from "@/types/menuItem";
import { addUserOrderItem,removeUserOrderItem } from "@/services/userApi";
import { useState } from "react";
const ItemCard = ({ data }: { data: menuItems }) => {
  const [itemSelect, setItemSelect] = useState<number>(0);
  const addToCart = async () => {
    try {
      await addUserOrderItem(data._id);
       setItemSelect(itemSelect + 1)
    } catch (err) {
      console.log(err);
    }
  };
  const removeFromCart = async () => {
    try {
      await removeUserOrderItem(data._id);
      setItemSelect(Math.max(0, itemSelect - 1))
    } catch (err) {
      console.log(err);
    }
  };
  const isVeg = data.type === "veg";
  

  return (
    <div className="group flex min-h-[180px] justify-between gap-6 border-b border-gray-200 py-5">
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <div className="flex items-center gap-3">
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
          </div>

          <div className="mt-2 flex items-center gap-3">
            <span className="text-lg font-medium text-gray-800">
              ₹{data.price}
            </span>

            <Rating rating={data.rating} />
          </div>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
            {data.description}
          </p>
        </div>
      </div>

      <div className="relative w-[180px] shrink-0">
        <img
          src={data.imageURL}
          alt={data.title}
          className="h-[140px] w-full rounded-xl object-cover shadow-sm transition-transform duration-300 group-hover:scale-[1.02]"
        />

        {itemSelect == 0 ? (
          <button
            className="absolute -bottom-3 left-1/2 w-[110px] -translate-x-1/2 rounded-lg border border-gray-200 bg-white py-2 text-sm font-bold text-green-700 shadow-md transition-all hover:bg-green-700 hover:text-white"
            onClick={() =>  addToCart()}
          >
            ADD
          </button>
        ) : (
          <div className="absolute -bottom-3 left-1/2 flex h-10 w-[120px] -translate-x-1/2 items-center overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
            <button
              onClick={() =>  removeFromCart()}
              className="flex h-full w-10 items-center justify-center bg-green-700 text-lg font-bold text-white transition-colors hover:bg-green-50 hover:text-green-700"
            >
              −
            </button>

            <span className="flex h-full flex-1 items-center justify-center border-x border-gray-200 bg-white text-sm font-bold text-green-700">
              {itemSelect}
            </span>

            <button
              onClick={() =>addToCart() }
              className="flex h-full w-10 items-center justify-center bg-green-700 text-lg font-bold text-white transition-colors hover:bg-green-50 hover:text-green-700"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
