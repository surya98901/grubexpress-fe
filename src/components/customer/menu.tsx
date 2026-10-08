import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import type { menuItems } from "@/types/menuItem";
import { getMenu } from "@/services/menuApi";
import ItemCard from "./ItemCard";
import { Search, X, Leaf } from "lucide-react";
import { categories } from "@/assets/utils/constants";

const Menu = () => {
  const [menuData, setMenuData] = useState<menuItems[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [vegOnly, setVegOnly] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    const fetchRestaurantData = async () => {
      try {
        const menuResponse = await getMenu(id);
        setMenuData(menuResponse.data.data || []);
      } catch (error) {
        console.error("Error fetching restaurant menu:", error);
      }
    };
    fetchRestaurantData();
  }, [id]);

  const filteredMenuItems = useMemo(() => {
    return menuData.filter((item) => {
      // Search text filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = item.title?.toLowerCase().includes(q);
        const matchesDesc = item.description?.toLowerCase().includes(q);
        const matchesCategory = item.category?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesCategory) return false;
      }

      // Veg only filter
      if (vegOnly && item.type !== "veg") {
        return false;
      }

      // Category filter
      if (selectedCategory !== "All") {
        const catLabel = selectedCategory.toLowerCase();
        const itemCat = (item.category || "").toLowerCase();
        if (!itemCat.includes(catLabel) && !item.title.toLowerCase().includes(catLabel)) {
          return false;
        }
      }

      return true;
    });
  }, [menuData, searchQuery, vegOnly, selectedCategory]);

  const topRated = useMemo(() => {
    return filteredMenuItems.filter((item) => item.rating >= 4.5);
  }, [filteredMenuItems]);

  return (
    <section className="w-[60vw] mx-auto">
      {/* Menu Header & Search Bar */}
      <div className="mb-6 flex flex-col gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Menu</h2>
          <span className="text-sm font-semibold text-gray-500">
            ({filteredMenuItems.length} / {menuData.length} items)
          </span>
        </div>

        {/* Menu Search Input */}
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dishes in menu..."
            className="w-full pl-9 pr-9 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:bg-white transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Menu Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <button
            onClick={() => setVegOnly(!vegOnly)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full border font-semibold transition ${
              vegOnly
                ? "bg-green-100 text-green-800 border-green-400"
                : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
            }`}
          >
            <Leaf className="w-3.5 h-3.5 text-green-600 fill-green-600" /> Pure Veg
          </button>

          <span className="text-gray-300 mx-1">|</span>

          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-3 py-1.5 rounded-full border font-semibold transition ${
              selectedCategory === "All"
                ? "bg-green-700 text-white border-green-700"
                : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
            }`}
          >
            All Items
          </button>

          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() =>
                setSelectedCategory(selectedCategory === cat.label ? "All" : cat.label)
              }
              className={`px-3 py-1.5 rounded-full border font-semibold transition ${
                selectedCategory === cat.label
                  ? "bg-green-700 text-white border-green-700"
                  : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {filteredMenuItems.length === 0 ? (
        <div className="py-12 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200 my-4">
          <p className="text-gray-500 font-medium text-base">No dishes found matching your filter</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setVegOnly(false);
              setSelectedCategory("All");
            }}
            className="mt-3 text-sm text-green-700 font-semibold hover:underline"
          >
            Reset menu filters
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {topRated.length > 0 && !searchQuery && selectedCategory === "All" && (
            <Accordion
              defaultValue={["item-1"]}
              className="w-full shadow-sm border border-gray-100 px-4 rounded-2xl bg-white"
            >
              <AccordionItem value="item-1" className="border-b-0">
                <AccordionTrigger className="text-xl font-bold flex items-center gap-3 py-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    ⭐ Top Rated Items
                  </h2>
                  <span className="text-sm font-normal text-gray-500">
                    ({topRated.length} items)
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col divide-y divide-gray-100">
                    {topRated.map((item) => (
                      <ItemCard key={item._id} data={item} />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}

          <Accordion
            defaultValue={["item-1"]}
            className="w-full shadow-sm border border-gray-100 px-4 rounded-2xl bg-white"
          >
            <AccordionItem value="item-1" className="border-b-0">
              <AccordionTrigger className="text-xl font-bold flex items-center gap-3 py-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {selectedCategory === "All" ? "All Items" : selectedCategory}
                </h2>
                <span className="text-sm font-normal text-gray-500">
                  ({filteredMenuItems.length} items)
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col divide-y divide-gray-100">
                  {filteredMenuItems.map((item) => (
                    <ItemCard key={item._id} data={item} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </section>
  );
};
export default Menu;
