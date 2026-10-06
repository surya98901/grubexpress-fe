import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getMenu } from "@/services/menuApi";
import type { menuItems } from "@/types/menuItem";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";
import AdminItemCard from "@/components/admin/AdminItemCards";

const AdminMenu = () => {
  const navigate = useNavigate();
  const restaurantId = useSelector(
    (state: RootState) => state.user.RestaurantId,
  );
  const fetchMenu = async () => {
    try {
      const response = restaurantId ? await getMenu(restaurantId) : null;
      setMenu(response?.data.data || []);
    } catch (err) {
      console.error("Error fetching menu:", err);
    }
  };
  const [menuData, setMenu] = useState<menuItems[]>([]);
  useEffect(() => {
    if (restaurantId) {
      fetchMenu();
    }
  }, [restaurantId]);
  return restaurantId ? (
    <section className=" w-[60vw] mx-auto ">
      <div className="mb-5 flex items-center justify-between my-5  ">
        <section className="flex items-center gap-5">
          <h2 className="text-2xl font-bold ">Menu</h2>
          <span className="text-sm text-gray-500">
            ({menuData.length} items)
          </span>
        </section>
        <button
          className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          onClick={() => navigate(`/admin/menu/items?`)}
        >
          Add Item
        </button>
      </div>

      <Accordion
        defaultValue={["item-1"]}
        className="w-[90%] mx-auto shadow-md px-2 rounded-xl"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className=" text-2xl font-bold flex items-center gap-5">
            <h2 className="text-2xl font-bold"> All Items</h2>
            <span className="text-sm text-gray-500">
              ({menuData.length} items)
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col">
              {menuData.map((item) => (
                <AdminItemCard
                  key={item._id}
                  data={item}
                  onItemUpdated={fetchMenu}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  ) : (
    <main>
      <div> add your restaurant to get started</div>
    </main>
  );
};
export default AdminMenu;
