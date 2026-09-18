import ResataurantContainer from "@/components/RestaurantContainer";
import RestaurntContainerSlide from "@/components/RestaurantContainerSlide";
import LocationMenu from "@/components/LocationMenu";
import ItemsContainer from "@/components/ItemsContainer";




const Restaurants = () => {
  return (
    <div className="flex flex-col gap-5 items-center justify-center">
      <ItemsContainer />
      <div className="w-[80vw] flex justify-start mt-5">
        <LocationMenu className="p-3 bg-green-700 text-white justify-between w-[200px] " />
      </div>
      <div className=" p-2 w-[80vw] flex flex-col  my-5 gap-5">
        <RestaurntContainerSlide />
      </div>
      <div
        id="restaurant-list"
        className="  relative  p-2 w-[80vw] flex flex-col mx-50 my-5 gap-5"
      >
        <ResataurantContainer />
        
      </div>
    </div>
  );
};
export default Restaurants;
