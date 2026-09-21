import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { menuItems } from "@/types/menuItem";
import { getMenu } from "@/services/menuApi";
import ItemCard from "./ItemCard";

const Menu = () => {
    
   const [menuData, setMenuData] = useState<menuItems[]>([]);
  const { id } = useParams();
  useEffect(() => {
    if (!id) return;
    const fetchRestaurantData = async () => {
      try {
        const menuResponse = await getMenu(id);
        setMenuData(menuResponse.data.data);
      } catch (error) {
        console.error("Error fetching restaurant:", error);
      }
    };
    fetchRestaurantData();
  }, [id]);
  const topRated = menuData?.filter((item)=> item.rating > 4.5);
  return (
    <section className=" w-[70vw] ">
      <div className="mb-5 flex items-center justify-between ">
        <h2 className="text-2xl font-bold">Menu</h2>
        <span className="text-sm text-gray-500">{menuData.length} items</span>
      </div>

      <Accordion defaultValue={["item-1"]} className="w-[90%] mx-auto shadow-md px-2 rounded-xl ">
        <AccordionItem value="item-1">
          <AccordionTrigger className=" text-2xl font-bold flex items-center gap-5">
            <h2 className="text-2xl font-bold">Top rated items for You</h2>
            <span className="text-sm text-gray-500">({topRated.length} items)</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col">
              {
                topRated
                .map((item) => (
                  <ItemCard key={item._id} data={item} />
                ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion defaultValue={["item-1"]} className="w-[90%] mx-auto shadow-md px-2 rounded-xl">
        <AccordionItem value="item-1">
          <AccordionTrigger className=" text-2xl font-bold flex items-center gap-5">
            <h2 className="text-2xl font-bold"> All Items</h2>
            <span className="text-sm text-gray-500">({menuData.length} items)</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col">
              {
                menuData
                .map((item) => (
                  <ItemCard key={item._id} data={item} />
                ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};
export default Menu;
