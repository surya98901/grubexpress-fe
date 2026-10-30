import { formatDate } from "@/assets/utils/helpers";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";
import AdminlistCard from "./AdminlistCards";
import { DeclineRequestAlert } from "../genericUIcomponents/Alerts/DeclineRequestAlert";
import useEditAdminOrder from "@/hooks/AdminHooks/use-editAdminOrder";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

interface AdminOrdersListCard {
  data: any;
  open: string | null;
  setOpen: Dispatch<SetStateAction<string | null>>;
   onStatusUpdated: (id: string) => void;
}

const AdminOrdersListCard = ({ data, open, setOpen ,onStatusUpdated}: AdminOrdersListCard) => {
  const displayedItems = data?.items ?? [];
  const restaurantId = useSelector((state:RootState)=>state.user.RestaurantId)
  const [decline, setDecline] = useState<boolean>(false)
const { editOrder, loading } = useEditAdminOrder(
  restaurantId,
  data._id,
);

const handleAccept = async () => {
  const success = await editOrder("CONFIRMED");

  if (success) {
    onStatusUpdated(data._id)
    setOpen(null);
    // Refresh the orders list here.
  }
};
  return (
   <> <div className="group flex w-full flex-col gap-2 rounded-2xl bg-white p-4 text-gray-900 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
            Order ID
          </p>
          <p className="truncate text-sm text-green-700">#{data._id}</p>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
            Total Amount
          </p>
          <p className="text-xl font-bold tracking-tight text-emerald-700">
            ₹{data.subTotal}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-lg py-2 text-left hover:bg-gray-50"
          onClick={() =>
            setOpen((prev: string | null) =>
              prev === data._id ? null : data._id,
            )
          }
        >
          <span className="text-sm font-semibold text-gray-800">
            {displayedItems.length} Items
          </span>
          {open === data._id ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </button>

        {open === data._id && (
          <div className="flex flex-col gap-2 overflow-y-auto h-max-[40vh] hide-scrollbar">
            {displayedItems.map((item: any) => (
              <AdminlistCard key={item._id} list={item} />
            ))}
          </div>
        )}

        <section className="flex w-full items-center justify-between gap-3 border-t border-gray-100 pt-3 text-xs text-gray-400">
          <span>Placed {formatDate(data.createdAt)}</span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-lg bg-emerald-600 px-2 py-1 text-[10px] font-semibold text-white transition-all hover:bg-emerald-700 active:scale-95"
              onClick= {handleAccept}>
              {loading ? "Updating..." : "Accept"}
            </button>
            <button
              type="button"
              className="rounded-lg border border-red-100 px-2 py-1 text-[10px] font-semibold text-red-600 transition-all hover:bg-red-100 active:scale-95"
            onClick ={()=> setDecline(true)}>
              Decline
            </button>
          </div>
        </section>
      </div>
    </div>
    <DeclineRequestAlert open={decline} setOpen={setDecline} id = {data._id}/>
   </>
  );
};

export default AdminOrdersListCard;
