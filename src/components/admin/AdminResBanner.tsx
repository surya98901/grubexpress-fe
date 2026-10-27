import { useEffect, useState } from "react";
import {
  useGetRestaurantStatus,
  useSetRestaurantStatus,
} from "@/hooks/AdminHooks/use-restaurantStatus";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Switch } from "../ui/switch";
import { Store} from "lucide-react";

const AdminResBanner = () => {
  const restaurantId = useSelector(
    (state: RootState) => state.user.RestaurantId,
  );

  const [saving, setSaving] = useState(false);
  const [displayStatus, setDisplayStatus] = useState<string>("");

  const {
    status,
    loading,
    Error: statusError,
  } = useGetRestaurantStatus(restaurantId ?? "");

  const setStatus = useSetRestaurantStatus(restaurantId ?? "");

  useEffect(() => {
    setDisplayStatus(status);
  }, [status]);

  const handleStatusChange = async (checked: boolean) => {
    if (!restaurantId || saving) return;
    const newStatus = checked ? "open" : "close";
    setSaving(true);
    try {
      const error = await setStatus(newStatus);
      if (error) {
        console.error(error);
        window.alert(error);
        return;
      }
      setDisplayStatus(newStatus);
    } finally {
      setSaving(false);
    }
  };

  if (!restaurantId) {
    return (
      <section className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-white p-6 text-center">
        <Store size={32} className="mb-3 text-stone-400" />
        <h2 className="text-xl font-bold text-stone-800">
          No restaurant selected
        </h2>
        <p className="mt-2 text-sm text-stone-500">
          Select a restaurant to view its dashboard.
        </p>
      </section>
    );
  }

  return (
    <section className="relative min-h-[300px] overflow-hidden rounded-2xl bg-green-700 p-6 shadow-md">
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10" />
      <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-white/5" />

      <div className="relative z-10">
        <p className="mb-1 text-sm font-medium text-green-100">
          Restaurant overview
        </p>

        <section className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-white">Today's Dashboard</h2>

          <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-black/15 px-4 py-3 backdrop-blur-md">
            <span
              className={`size-2.5 rounded-full ${
                displayStatus === "open"
                  ? "bg-green-300 shadow-[0_0_10px_rgba(110,231,183,0.8)]"
                  : "bg-red-400 shadow-[0_0_14px_4px_rgba(255,0,0,0.9)]"
              }`}
            />

            <span className="min-w-12 text-sm font-semibold text-white">
              {displayStatus === "open" ? "Open" : "Closed"}
            </span>

            <Switch
              checked={displayStatus === "open"}
              onCheckedChange={handleStatusChange}
              disabled={saving || loading || !!statusError || !displayStatus}
              aria-label="Toggle restaurant open status"
            />
          </div>
        </section>

        {statusError && (
          <p role="alert" className="mt-2 text-sm text-red-200">
            Unable to load restaurant status: {statusError}
          </p>
        )}

        <p className="mt-2 max-w-sm text-sm leading-6 text-green-100">
          Keep track of orders, reservations and delivery activity from one
          place.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
            <p className="text-xs text-green-100">Total Orders</p>
            <p className="mt-1 text-2xl font-bold text-white">0</p>
          </div>

          <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
            <p className="text-xs text-green-100">Reservations</p>
            <p className="mt-1 text-2xl font-bold text-white">0</p>
          </div>

          <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
            <p className="text-xs text-green-100">Revenue</p>
            <p className="mt-1 text-2xl font-bold text-white">₹0</p>
          </div>

          <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
            <p className="text-xs text-green-100">Customers</p>
            <p className="mt-1 text-2xl font-bold text-white">0</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminResBanner;
