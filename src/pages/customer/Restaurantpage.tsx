import { useEffect, useState } from "react"
import type { Restaurant } from "@/types/restaurant";
import type {MenuItem} from "@/types/Menu"
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
        <div className="flex flex-col  items-center h-[90vh]">
            <h1 className="text-5xl font-bold ">welcome to  {restaurantData?.Name}</h1>

        </div>
    )
}
export default RestaurantPage