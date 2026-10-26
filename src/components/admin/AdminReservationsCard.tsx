
import {

  ChevronDown,
  ChevronUp,

} from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";
import { DeclineRequestAlert} from "../genericUIcomponents/Alerts/DeclineRequestAlert";
import AdminDineInDetailsCard from "./AdminDineInDetailsCard";

interface AdminReservationsCard {
  data: any;
  open: string | null;
  setOpen: Dispatch<SetStateAction<string | null>>;
  onStatusUpdated: (id: string) => void;
}

const AdminReservationsCard = ({
  data,
  open,
  setOpen,
   onStatusUpdated
}: AdminReservationsCard) => {
  const [decline, setDecline] = useState<boolean>(false);
  console.log("reservation data on card : ",data)
  return (
    <>
      <div className="group flex w-full flex-col gap-2 rounded-2xl bg-white p-4 text-gray-900 shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
              Reservation ID
            </p>
            <p className="truncate text-sm text-green-700">#{data._id}</p>
          </div>

          <div className="shrink-0 text-right">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
              people
            </p>
            <p className="text-xl font-bold tracking-tight text-emerald-700">
              {data.headCount}
            </p>
          </div>
        </div>

        <section>
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
              Reservation Details
            </span>
            {open === data._id ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </button>
          {open === data._id && (
            <AdminDineInDetailsCard data = {data}/>
          )}
        </section>

        <div className="grid grid-cols-2 items-center gap-2">
          <button
            type="button"
            className="rounded-lg bg-emerald-600 px-2 py-1  font-semibold text-white transition-all hover:bg-emerald-700 active:scale-95"
          >
            Accept
          </button>
          <button
            type="button"
            className="rounded-lg border border-red-100 px-2 py-1 font-semibold text-red-600 transition-all hover:bg-red-100 active:scale-95"
            onClick={() => setDecline(true)}
          >
            Decline
          </button>
        </div>
      </div>
      <DeclineRequestAlert open={decline} setOpen={setDecline} id = {data._id}/>
    </>
  );
};

export default AdminReservationsCard;
