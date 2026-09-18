import { useEffect, useState } from "react"
import type { Restaurant } from "@/types/restaurant";
import type {MenuItem} from "@/types/menu"
import { getRestaurant} from "@/services/restaurantApi"
import { getMenu } from "@/services/menuApi";
import { useParams } from "react-router-dom";
const RestaurantPage = ()=>{
    const [restaurantData, setRestautantData]= useState<Restaurant | null>(null)
    const [menuData, setMenuData] = useState<MenuItem[] | null>(null)
    const { id } = useParams();
   useEffect( ()=>{
    if(!id)return;
       const fetchRestaurants = async () => {
         try {
           const response = await getRestaurant(id);
           setRestautantData(response.data.restaurant);
           const menudata = await getMenu(id);
            setMenuData(menudata.data)
         } catch (error) {
           console.error("Error fetching restaurants:", error);
         }
       };
       fetchRestaurants();
     }, [id]);
     console.log(menuData)
    return (
       <div className=" flex flex-col gap-5 mx-100">
        {/*restaurent details section*/}
         <div className="flex flex-col  items-center ">
            <h1 className="text-5xl font-bold ">welcome to  {restaurantData?.Name}</h1>

        </div>
        {/*offers and deals section*/}
         <div className="flex flex-col  items-center ">
            <h1 className="text-5xl font-bold ">deals slide</h1>
        </div>
        {/*menus*/}
        <div className="flex flex-col  items-center ">
            <h1 className="text-5xl font-bold ">accordeion for each menu type</h1>
        </div>
        {/*recommendations*/}
        <div className="flex flex-col  items-center ">
            <h1 className="text-5xl font-bold ">related restaurents</h1>
        </div>
         {/*about restaurent*/}
        <div className="flex flex-col  items-center ">
            <h1 className="text-5xl font-bold ">about restaurent </h1>
        </div>
         {/*faqs*/}
        <div className="flex flex-col  items-center ">
            <h1 className="text-5xl font-bold ">faqs </h1>
        </div>
         {/*disclamer*/}
        <div className="flex flex-col  items-center ">
            <h1 className="text-5xl font-bold ">disclaimer </h1>
        </div>
         {/*legal details*/}
        <div className="flex flex-col  items-center ">
            <h1 className="text-5xl font-bold ">fsaai and address </h1>
        </div>
        <div className="absolute right-50 bottom-50 bg-black text-white p-2 w-[50px] text-sm"> menu</div>
       </div>
    )
}
export default RestaurantPage