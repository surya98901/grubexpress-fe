import { useState, useEffect } from "react";
import type { FoodItems } from "@/types/items"
import { getdisplayItems } from "@/services/itemslist";
import { motion } from "framer-motion";
const ItemsContainer = () => {
  const [list, setList] = useState< FoodItems[]|null>(null);
  useEffect( ()=>{
    const fetchItemslist = async ()=>{
      try{
        const response = await getdisplayItems();
        setList(response.data.list)
      }catch(err){
        console.error("error fetching itemslist", err);
      }
    };
    fetchItemslist()
  },[])
    return (
  <div className="w-[80vw] mt-5  ">
    <div className="flex items-center justify-between mb-4 px-2">
      <div>
        <h2 className="text-xl font-bold">What are you craving?</h2>
        <p className="text-sm text-muted-foreground">
          Explore popular food
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() =>
            document
              .getElementById("food-carousel")
              ?.scrollBy({ left: -300, behavior: "smooth" })
          }
          className="h-9 w-9 rounded-full border flex items-center justify-center hover:bg-muted transition bg-green-700 text-white hover:text-green-700 "
        >
          ←
        </button>

        <button
          onClick={() =>
            document
              .getElementById("food-carousel")
              ?.scrollBy({ left: 300, behavior: "smooth" })
          }
          className="h-9 w-9 rounded-full border flex items-center justify-center hover:bg-muted transition bg-green-700 text-white hover:text-green-700"
        >
          →
        </button>
      </div>
    </div>

    <div
      id="food-carousel"
      className="flex hide-scrollbar gap-6 overflow-x-auto  px-2 pt-2 pb-4 cursor-grab active:cursor-grabbing"
    >
      {list?.map((item) => (
        <motion.div
          key={item._id}
          whileHover={{ y: -6 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="flex-shrink-0 flex flex-col items-center gap-2"
        >
          <div className="w-[100px] h-[100px] rounded-full overflow-hidden shadow-md border-2 border-background">
            <img
              src={item.ImageURL}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>

          <span className="text-sm font-medium text-center">
            {item.title}
          </span>
        </motion.div>
      ))}
    </div>
  </div>
);
};
export default ItemsContainer
