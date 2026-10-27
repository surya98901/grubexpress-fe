import { ArrowRight } from "lucide-react";
import RestaurantHeroBanner from "../restaurant/RestaurantHeroBanner";
import { setRestaurant } from "@/store/slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminRestaurantCard = ({ data }: { data: any }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleRestaurantSelection = (restaurantId: string) => {
    dispatch(setRestaurant(restaurantId));
    navigate("/admin/dashboard");
  };
  return (
    <div>
      <button
        type="button"
        key={data._id}
        onClick={() => handleRestaurantSelection(data._id)}
        className="group relative min-w-0 overflow-hidden rounded-2xl border border-stone-200 bg-white p-2 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-950/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
      >
        <div className="h-[60vh] overflow-hidden rounded-xl">
          <section className="flex justify-between items-center">
            <h2 className="my-2 px-2 text-xl font-bold">
              {data.Name} - {data.address.city}
            </h2>
            <span className= {`${data.status === "close" ? "bg-red-500 " : "bg-green-500"} px-2 p-1 text-sm text-white rounded-xl`}>{data.status === "close" ? data.status + "d" : data.status}</span>
          </section>
          <RestaurantHeroBanner data={data} />
        </div>

        <div className="flex items-center justify-between gap-3 px-3 py-4">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-stone-800">
              Manage restaurant
            </p>
            <p className="mt-1 text-xs text-stone-500">Open your dashboard</p>
          </div>

          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-600 transition-all duration-300 group-hover:bg-orange-600 group-hover:text-white">
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </button>
    </div>
  );
};
export default AdminRestaurantCard;
