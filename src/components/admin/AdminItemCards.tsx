import { Leaf, Ham } from "lucide-react";
import Rating from "@/components/genericUIcomponents/rating";
import { Switch } from "@/components/ui/switch";
import ItemEditDraw from "./ItemsEditDraw";
import { useEffect, useState } from "react";
import {
  useGetItemStatus,
  useSetItemAvailability,
} from "@/hooks/AdminHooks/use-menuItemStatus";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import useDeleteMenuItem from "@/hooks/AdminHooks/use-deleteMenuItem";
//menuCard
const AdminItemCard = ({
  data,
  onItemUpdated,
}: {
  data: any;
  onItemUpdated: () => void;
}) => {
  const [saving, setSaving] = useState(false);

  const restaurantId = useSelector(
    (state: RootState) => state.user.RestaurantId,
  );

  const {
    available,
    loading,
    Error: statusError,
  } = useGetItemStatus(restaurantId ?? "", data._id);

  const [displayStatus, setDisplayStatus] = useState<boolean | null>(null);

  useEffect(() => {
    setDisplayStatus(available);
  }, [available]);

  const setAvailability = useSetItemAvailability(restaurantId ?? "", data._id);
  const deleteItem = useDeleteMenuItem(restaurantId ?? "", data._id);

  const handleDelete = async () => {
    if (saving) return;
    const confirmed = window.confirm(
      `Are you sure you want to delete "${data.title}"?`,
    );
    if (!confirmed) return;
    setSaving(true);
    try {
      const error = await deleteItem();
      if (error) {
        window.alert(error);
        return;
      }
      onItemUpdated();
    } finally {
      setSaving(false);
    }
  };
  const handleStatusChange = async (checked: boolean) => {
    if (!restaurantId || saving) return;
    setSaving(true);
    try {
      const error = await setAvailability(checked);
      if (error) {
        console.error(error);
        window.alert(error);
        return;
      }
      setDisplayStatus(checked);
    } finally {
      setSaving(false);
    }
  };
  if (!restaurantId) return null;
  const isVeg = data.type === "veg";

  return (
    <div className="group min-h-[180px] justify-between gap-6 border-b border-gray-200 py-5 px-5">
      <div
        className={`flex justify-between ${
          displayStatus === false ? "opacity-40 grayscale" : ""
        }`}
      >
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
        <div className="relative w-[180px] shrink-0 transition-all duration-300 ">
          <img
            src={data.imageURL}
            alt={data.title}
            className="h-[140px] w-full rounded-xl object-cover shadow-sm transition-transform duration-300 group-hover:scale-[1.02]"
          />
          <button className="absolute -bottom-3 left-1/2 w-[110px] -translate-x-1/2 rounded-lg border border-gray-200 bg-white py-2 text-sm font-bold text-green-700 shadow-md transition-all hover:bg-green-700 hover:text-white">
            <ItemEditDraw data={data} onItemUpdated={onItemUpdated} />
          </button>
        </div>
      </div>
      <section className="relative z-20 mt-3 flex items-center gap-2 bg-white">
        <div className=" m-0 flex items-center gap-2 ">
          Available
          <Switch
            checked={displayStatus === true}
            onCheckedChange={handleStatusChange}
            disabled={
              saving || loading || !!statusError || displayStatus === null
            }
            aria-label="Toggle item availability"
          />
        </div>
        <button
          className="bg-red-400 rounded-xl p-1 px-2 text-sm text-white flex "
          onClick={handleDelete}
        >
          Remove
        </button>
      </section>
    </div>
  );
};
export default AdminItemCard;
