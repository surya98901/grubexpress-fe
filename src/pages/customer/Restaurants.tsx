import ResataurantContainer from "@/components/restaurant/RestaurantContainer";
import RestaurntContainerSlide from "@/components/restaurant/RestaurantContainerSlide";
import LocationMenu from "@/components/customer/LocationMenu";
import ItemsContainer from "@/components/customer/ItemsContainer";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import SortByMenu from "@/components/sortByMenu";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X, Leaf, Star, Filter, RotateCcw } from "lucide-react";
import { cusines } from "@/assets/utils/constants";

type SortFilter = "All" | "rating" | "costLowToHigh" | "costHighToLow";

const Restaurants = () => {
  const serviceType = useSelector(
    (state: RootState) => state.service.serviceType
  );

  return serviceType === "dine-out" ? <DiningFeed /> : <FoodDeliverFeed />;
};

const FilterHeaderControls = ({
  searchQuery,
  setSearchQuery,
  selectedCuisine,
  setSelectedCuisine,
  vegOnly,
  setVegOnly,
  minRatingOnly,
  setMinRatingOnly,
  selectFilter,
  setSelectFilter,
  activeItemParam,
  onResetFilters,
}: {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedCuisine: string;
  setSelectedCuisine: (val: string) => void;
  vegOnly: boolean;
  setVegOnly: (val: boolean) => void;
  minRatingOnly: boolean;
  setMinRatingOnly: (val: boolean) => void;
  selectFilter: SortFilter;
  setSelectFilter: React.Dispatch<React.SetStateAction<SortFilter>>;
  activeItemParam: string | null;
  onResetFilters: () => void;
}) => {
  const city = useSelector((state: RootState) => state.location.city);
  const isAnyFilterActive =
    searchQuery.trim() !== "" ||
    selectedCuisine !== "" ||
    vegOnly ||
    minRatingOnly ||
    selectFilter !== "All" ||
    Boolean(activeItemParam);

  return (
    <div className="w-[80vw] flex flex-col gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mt-2">

      <div className="flex flex-col sm:flex-row gap-3 items-center">
        <LocationMenu className="w-full sm:w-[180px] justify-between bg-green-700 p-3 text-white font-semibold rounded-xl" />

        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search restaurants or dishes in ${city}...`}
            className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:bg-white transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="w-full sm:w-auto shrink-0">
          <SortByMenu
            selectFilter={selectFilter}
            setSelectFilter={setSelectFilter}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100 text-xs sm:text-sm">
        <span className="flex items-center gap-1 font-semibold text-gray-600 mr-1">
          <Filter className="w-3.5 h-3.5" /> Filters:
        </span>

        <button
          onClick={() => setSelectedCuisine("")}
          className={`px-3 py-1.5 rounded-full border transition font-medium ${selectedCuisine === ""
            ? "bg-green-700 text-white border-green-700 shadow-sm"
            : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
            }`}
        >
          All Cuisines
        </button>

        {cusines.map((c) => (
          <button
            key={c.value}
            onClick={() =>
              setSelectedCuisine(selectedCuisine === c.label ? "" : c.label)
            }
            className={`px-3 py-1.5 rounded-full border transition font-medium ${selectedCuisine.toLowerCase() === c.label.toLowerCase()
              ? "bg-green-700 text-white border-green-700 shadow-sm"
              : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
              }`}
          >
            {c.label}
          </button>
        ))}

        <button
          onClick={() => setVegOnly(!vegOnly)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition font-medium ${vegOnly
            ? "bg-green-100 text-green-800 border-green-400 shadow-sm"
            : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
            }`}
        >
          <Leaf className="w-3.5 h-3.5 text-green-600 fill-green-600" /> Pure Veg
        </button>

  
        <button
          onClick={() => setMinRatingOnly(!minRatingOnly)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition font-medium ${minRatingOnly
            ? "bg-amber-100 text-amber-900 border-amber-400 shadow-sm"
            : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
            }`}
        >
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> Rated 4.0+
        </button>

        {isAnyFilterActive && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-800 ml-auto px-2 py-1 rounded hover:bg-red-50 transition"
          >
            <RotateCcw className="w-3 h-3" /> Reset Filters
          </button>
        )}
      </div>

      {(searchQuery || activeItemParam || selectedCuisine) && (
        <div className="flex items-center justify-between bg-green-50 border border-green-200 p-2.5 px-4 rounded-xl text-sm text-green-900">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Filtered by:</span>
            {searchQuery && (
              <span className="bg-green-200 text-green-900 px-2 py-0.5 rounded-full text-xs font-bold">
                "{searchQuery}"
              </span>
            )}
            {selectedCuisine && (
              <span className="bg-green-200 text-green-900 px-2 py-0.5 rounded-full text-xs font-bold">
                Cuisine: {selectedCuisine}
              </span>
            )}
          </div>
          <button
            onClick={onResetFilters}
            className="text-xs font-bold text-green-800 hover:underline flex items-center gap-1"
          >
            Clear Filter <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};

const FoodDeliverFeed = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearch = searchParams.get("search") || "";
  const activeItemParam = searchParams.get("item");
  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [vegOnly, setVegOnly] = useState(false);
  const [minRatingOnly, setMinRatingOnly] = useState(false);
  const [selectFilter, setSelectFilter] = useState<SortFilter>("All");


  useEffect(() => {
    setSearchQuery(urlSearch);
  }, [urlSearch]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCuisine("");
    setVegOnly(false);
    setMinRatingOnly(false);
    setSelectFilter("All");
    setSearchParams({});
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 py-4">
      <ItemsContainer />
      <FilterHeaderControls
        searchQuery={searchQuery}
        setSearchQuery={(val) => {
          setSearchQuery(val);
          const nextParams = new URLSearchParams(searchParams);
          if (val) {
            nextParams.set("search", val);
          } else {
            nextParams.delete("search");
          }
          setSearchParams(nextParams);
        }}
        selectedCuisine={selectedCuisine}
        setSelectedCuisine={setSelectedCuisine}
        vegOnly={vegOnly}
        setVegOnly={setVegOnly}
        minRatingOnly={minRatingOnly}
        setMinRatingOnly={setMinRatingOnly}
        selectFilter={selectFilter}
        setSelectFilter={setSelectFilter}
        activeItemParam={activeItemParam}
        onResetFilters={handleResetFilters}
      />

      <div
        id="restaurant-list"
        className="relative my-3 flex w-[80vw] flex-col gap-5 p-2"
      >
        <ResataurantContainer
          filter={selectFilter}
          searchQuery={searchQuery}
          cuisineFilter={selectedCuisine}
          vegOnly={vegOnly}
          minRatingFilter={minRatingOnly}
          onResetFilters={handleResetFilters}
        />
      </div>
    </div>
  );
};

const DiningFeed = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearch = searchParams.get("search") || "";
  const activeItemParam = searchParams.get("item");

  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [vegOnly, setVegOnly] = useState(false);
  const [minRatingOnly, setMinRatingOnly] = useState(false);
  const [selectFilter, setSelectFilter] = useState<SortFilter>("All");
  const city = useSelector((state: RootState) => state.location.city);

  useEffect(() => {
    setSearchQuery(urlSearch);
  }, [urlSearch]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCuisine("");
    setVegOnly(false);
    setMinRatingOnly(false);
    setSelectFilter("All");
    setSearchParams({});
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 py-4">
      <div className="relative mt-4 w-[80vw] rounded-2xl overflow-hidden shadow-lg">
        <img
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/seo/DO_collectionBanner.png"
          alt="Dining out"
          className="w-full h-[220px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-8 text-3xl font-extrabold text-white">
          Explore Top Dining Out Restaurants in {city}
        </div>
      </div>
      <div className="my-2 flex w-[80vw] flex-col gap-5 p-2">
        <RestaurntContainerSlide />
      </div>
      <FilterHeaderControls
        searchQuery={searchQuery}
        setSearchQuery={(val) => {
          setSearchQuery(val);
          if (val) {
            setSearchParams({ ...Object.fromEntries(searchParams.entries()), search: val });
          } else {
            const nextParams = new URLSearchParams(searchParams);
            nextParams.delete("search");
            setSearchParams(nextParams);
          }
        }}
        selectedCuisine={selectedCuisine}
        setSelectedCuisine={setSelectedCuisine}
        vegOnly={vegOnly}
        setVegOnly={setVegOnly}
        minRatingOnly={minRatingOnly}
        setMinRatingOnly={setMinRatingOnly}
        selectFilter={selectFilter}
        setSelectFilter={setSelectFilter}
        activeItemParam={activeItemParam}
        onResetFilters={handleResetFilters}
      />
      <div
        id="restaurant-list"
        className="relative flex flex-col"
      >
        <ResataurantContainer
          filter={selectFilter}
          searchQuery={searchQuery}
          cuisineFilter={selectedCuisine}
          vegOnly={vegOnly}
          minRatingFilter={minRatingOnly}
          onResetFilters={handleResetFilters}
        />
      </div>
    </div>
  );
};

export default Restaurants;