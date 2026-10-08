import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import NavBar from "../components/NavBar";
import LocationMenu from "../components/customer/LocationMenu";
import CardOpt1 from "../components/CardOpt1";
import { Footer } from "@/components/Footer";
import ItemsContainer from "@/components/customer/ItemsContainer";
import ResataurantContainer from "@/components/restaurant/RestaurantContainer";
import RestaurntContainerSlide from "@/components/restaurant/RestaurantContainerSlide";
import { citiesList, homeCardData } from "@/assets/utils/constants";
import { setCity } from "@/store/slices/locationslice";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/customer/restaurants?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate(`/customer/restaurants`);
    }
  };

  const handleLocationChange = (city: string) => {
    dispatch(setCity(city));
    document?.getElementById("restaurant-carousel")?.scrollIntoView({ block: "end", behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div>
        <div className="flex flex-col justify-center items-center min-h-[85vh] py-12 bg-gradient-to-b from-green-800 to-green-700 text-white gap-6 px-4">
          <div className="flex flex-col justify-center items-center gap-3 text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">Welcome to Grub Express</h1>
            <h2 className="text-xl md:text-2xl text-green-100 font-medium">
              Order food & discover top restaurants near you
            </h2>
          </div>

          <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-2 items-center bg-white p-2 rounded-2xl shadow-xl w-full max-w-3xl">
            <LocationMenu className="w-full md:w-auto text-black border-r border-gray-200" />
            <div className="flex flex-1 items-center px-3 w-full">
              <Search className="h-5 w-5 text-gray-400 mr-2 shrink-0" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-black placeholder:text-gray-400 p-2 w-full focus:outline-none text-base"
                placeholder="Search for restaurants, cuisines, or dishes..."
              />
            </div>
            <button
              type="submit"
              className="w-full md:w-auto bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-xl transition duration-200"
            >
              Search
            </button>
          </form>

          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {homeCardData.map((item, index) => {
              return (
                <CardOpt1
                  key={index}
                  title={item.title}
                  tagline={item.tagline}
                  content={item.content}
                  val={item.val}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className=" p-2 flex mt-5 mx-auto">
        <ItemsContainer />
      </div>
      <div className=" p-2  flex flex-col w-[80vw] mx-auto my-5 gap-5">
        <RestaurntContainerSlide />
        <ResataurantContainer filter="" />
      </div>
      <div className="p-2 w-[80vw] flex flex-col mx-auto my-5">
        <h3 className="text-3xl font-bold mb-3">Cities with food delivery</h3>
        <div className="flex flex-wrap gap-4 justify-start items-center py-3">
          {citiesList?.map((city) => (
            <div
              key={city}
              className="flex justify-center items-center border border-gray-300 hover:border-green-600 bg-white hover:bg-green-50 p-3 rounded-xl cursor-pointer shadow-sm hover:shadow transition min-w-[140px]"
              onClick={() => handleLocationChange(city)}
            >
              <h4 className="font-semibold text-gray-800 hover:text-green-700">{city}</h4>
            </div>
          ))}
        </div>
      </div>
      <div className="h-[25vh] bg-green-700 overflow-hidden rounded-t-xl flex items-center justify-center p-1 pb-0">
        <img
          src="bannerdefault.png"
          alt=""
          className="h-full w-full rounded-t-xl object-cover  "
        />
      </div>
      <div className="h-[20vh] p-2  flex flex-col  bg-black text-white justify-center items-center">
        <h1 className="text-9xl font-black tracking-wider text-transparent [-webkit-text-stroke:2px_white]">
          GRUB EXPRESS
        </h1>
      </div>
      <Footer />
    </div>
  );
};
export default Home;
