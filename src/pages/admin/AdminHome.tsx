import { useEffect, useState } from "react";
import type { Restaurant } from "@/types/restaurant";
import { getAdminRestaurents } from "@/services/adminApis";
import RestaurantHeroBanner from "@/components/restaurant/RestaurantHeroBanner";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Plus, Store, UtensilsCrossed } from "lucide-react";
import AddRestaurantAlert from "@/components/genericUIcomponents/Alerts/AddRestaurantAlert";
import GlobalShimmer from "@/components/GlobalShimmer";
import AdminRestaurantCard from "@/components/admin/AdminRestaurantCard";


const AdminHome = () => {
 
  const navigate = useNavigate();

  const [restaurantData, setRestaurantData] = useState<Restaurant[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminRestaurents = async () => {
      try {
        const response = await getAdminRestaurents();
        setRestaurantData(response.data.data ?? []);
      } catch (err) {
        console.error("Error fetching admin restaurants:", err);
        setRestaurantData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminRestaurents();
  }, []);
    
  if (loading) {
    return (
      <GlobalShimmer />
    );
  }

  return (
    <main className="min-h-[60vh] bg-stone-50 px-5 py-8 md:px-10 md:py-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-col justify-between gap-6 border-b border-stone-200 pb-8 sm:flex-row sm:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5 text-xs font-semibold tracking-wide text-orange-800">
              <Store size={14} />
              RESTAURANT MANAGEMENT
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-stone-900 md:text-5xl">
              Your restaurants<span className="text-orange-600">.</span>
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-stone-500 md:text-base">
              Everything starts with a great kitchen. Select a restaurant to
              manage its menu, orders, and operations.
            </p>
          </div>

          <div className="flex w-fit items-center gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 shadow-sm">
            <div className="flex size-11 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
              <UtensilsCrossed size={21} />
            </div>

            <div>
              <p className="text-2xl font-bold leading-none text-stone-900">
                {restaurantData?.length ?? 0}
              </p>
              <p className="mt-1 text-xs font-medium text-stone-500">
                Your restaurants
              </p>
            </div>
          </div>
        </header>

        {restaurantData && restaurantData.length > 0 ? (
          <section>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-stone-800">
                Select a restaurant
              </h2>

              <p className="text-sm text-stone-400">
                {restaurantData.length}{" "}
                {restaurantData.length === 1 ? "location" : "locations"}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {restaurantData.map((restaurant) => (
                <AdminRestaurantCard data = {restaurant} />
              ))}

              <AddRestaurantAlert />
            </div>
          </section>
        ) : (
          <section className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-dashed border-stone-300 bg-white px-6 py-12 text-center shadow-sm">
            <div className="mb-6 flex size-20 items-center justify-center rounded-3xl bg-orange-50 text-orange-600 ring-8 ring-orange-50/60">
              <Store size={34} strokeWidth={1.5} />
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-stone-900">
              Your next big thing starts here.
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-stone-500">
              You haven't added a restaurant yet. Set up your first restaurant
              to start managing your menu, orders, and daily operations.
            </p>

            <button
              type="button"
              onClick={() => navigate("/admin/add-restaurant")}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-600/20 transition-all hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
            >
              <Plus size={18} />
              Add your restaurant
            </button>
          </section>
        )}

        <footer className="mt-12 border-t border-stone-200 pt-5 text-xs text-stone-400">
          GrubExpress · Restaurant Management
        </footer>
      </div>
    </main>
  );
};

export default AdminHome;