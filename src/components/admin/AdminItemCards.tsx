import { Leaf, Ham } from "lucide-react";
import Rating from "@/components/genericUIcomponents/rating";
import type { menuItems } from "@/types/menuItem";
import ItemEditDraw from "./ItemsEditDraw";

const AdminItemCard = ({ data }: { data: menuItems }) => {

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

        <button
          className="absolute -bottom-3 left-1/2 w-[110px] -translate-x-1/2 rounded-lg border border-gray-200 bg-white py-2 text-sm font-bold text-green-700 shadow-md transition-all hover:bg-green-700 hover:text-white"
        >
          <ItemEditDraw
            data={data}
          />
        </button>
      </div>
    </div>
  );
};
export default AdminItemCard;