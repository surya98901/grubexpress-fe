import type { FoodItems } from "@/types/items";
import { carouselScroll } from "@/assets/utils/helpers";
import { motion } from "framer-motion";
import useGetFoodItems from "@/hooks/use-getFooditems";
import { useNavigate, useSearchParams } from "react-router-dom";

const ItemsContainer = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentItemId = searchParams.get("item");
  const currentSearch = searchParams.get("search");

  const { items, loading, error } = useGetFoodItems();

  const handleItemClick = (item: FoodItems) => {
    if (currentItemId === item._id || currentSearch === item.title) {
      // Clear selection if already selected
      navigate(`/customer/restaurants`);
    } else {
      navigate(`/customer/restaurants?search=${encodeURIComponent(item.title)}&item=${item._id}`);
    }
  };

  return (
    <div className="w-[80vw] mt-5">
      <div className="flex items-center justify-between mb-4 px-2">
        <div>
          <h2 className="text-xl font-bold">What are you craving?</h2>
          <p className="text-sm text-muted-foreground">
            Explore popular food & dishes
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => carouselScroll("left", "food-carousel")}
            className="h-9 w-9 rounded-full border flex items-center justify-center hover:bg-muted transition bg-green-700 text-white hover:text-green-700 font-bold"
          >
            ←
          </button>

          <button
            onClick={() => carouselScroll("right", "food-carousel")}
            className="h-9 w-9 rounded-full border flex items-center justify-center hover:bg-muted transition bg-green-700 text-white hover:text-green-700 font-bold"
          >
            →
          </button>
        </div>
      </div>

      <div
        id="food-carousel"
        className="flex hide-scrollbar gap-6 overflow-x-auto px-2 pt-2 pb-4 cursor-grab active:cursor-grabbing"
      >
        {loading && <p className="text-gray-500 py-4">Loading dishes...</p>}

        {error && <p className="text-red-500 py-4">Failed to load food items.</p>}

        {!loading &&
          !error &&
          items.map((item: FoodItems) => {
            const isSelected = currentItemId === item._id || (currentSearch && currentSearch.toLowerCase() === item.title.toLowerCase());
            return (
              <motion.div
                key={item._id}
                onClick={() => handleItemClick(item)}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer group"
              >
                <div
                  className={`relative w-[100px] h-[100px] rounded-full overflow-hidden shadow-md transition-all duration-300 ${
                    isSelected
                      ? "ring-4 ring-green-600 ring-offset-2 scale-105"
                      : "border-2 border-background group-hover:shadow-lg"
                  }`}
                >
                  <img
                    src={item.ImageURL}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-green-900/20 flex items-center justify-center">
                      <span className="bg-green-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                        Selected
                      </span>
                    </div>
                  )}
                </div>

                <span
                  className={`text-sm font-medium text-center transition-colors ${
                    isSelected ? "text-green-700 font-bold" : "text-gray-700"
                  }`}
                >
                  {item.title}
                </span>
              </motion.div>
            );
          })}
      </div>
    </div>
  );
};

export default ItemsContainer;