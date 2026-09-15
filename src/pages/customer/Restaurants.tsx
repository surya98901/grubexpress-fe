import ResataurantContainer from "@/components/RestaurantContainer";
import { ItemsContainer } from "@/components/ItemsContainer";
const Restaurants = () => {
  return (
    <div className="gap-5">
        <div className="h-[20vh] p-2 w-[80vw] flex flex-col mx-50 my-5 ">
                <h3 className="text-3xl font-bold">What's on your mind?</h3>
                <ItemsContainer />
              </div>
      <div className=" p-2 w-[80vw] flex flex-col mx-50 my-5">
        <h3 className="text-3xl font-bold">Popular Restaurants</h3>
        <ResataurantContainer />
      </div>
      <div className=" p-2 w-[80vw] flex flex-col mx-50 my-5 gap-5">
        <h3 className="text-3xl font-bold"> Restaurants in city x</h3>
        <ResataurantContainer />
        <ResataurantContainer />
        <ResataurantContainer />
      </div>

    </div>
  );
};
export default Restaurants;
