import NavBar from "../components/NavBar";
import LocationMenu from "../components/LocationMenu";
import CardOpt1 from "../components/CardOpt1";
import { Footer } from "@/components/Footer";
import ItemsContainer from "@/components/ItemsContainer";
import ResataurantContainer from "@/components/RestaurantContainer";
import RestaurntContainerSlide from "@/components/RestaurantContainerSlide"

const Home = () => {

  const data = [
    {
      title: "Food Delivery",
      tagline: "from your favorite restaurants",
      content: "Upto x% off on your first order",
      link: "/restaurants/food-delivery",
    },
    {
      title: "Dine Out",
      tagline: "Eat out & Save More",
      content: "Upto y% off on your first order",
      link: "/restaurants/dine-out",
    },
  ];
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div>
        <div className="flex flex-col justify-center items-center h-[100vh] bg-green-700 text-white gap-5">
          <div className="flex flex-col justify-center items-center gap-2">
            <h1 className="text-6xl font-bold ">Welcome to Grub Express</h1>
            <h2 className="text-3xl">
              Order food from your favorite restaurants
            </h2>
          </div>
          <div className="flex gap-2 items-center border-2 p-2 border-white rounded-xl w-[30vw]">
            <LocationMenu className="p-3"/>
            <input
              className="bg-white text-black placeholder:text-gray-500 p-2 w-[80%] rounded-xl"
              placeholder="Search for restaurants or dishes..."
            />

          </div>
          <div className="flex gap-4 mt-4">
            {data.map((item, index) => {
              return (
                <CardOpt1
                  key={index}
                  title={item.title}
                  tagline={item.tagline}
                  content={item.content}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className=" p-2 w-[80vw] flex flex-col mx-50 gap-2 mt-5">
        <h3 className="text-3xl font-bold">What's on your mind?</h3>
        <ItemsContainer />
      </div>
      <div className=" p-2 w-[80vw] flex flex-col mx-50 my-5 gap-5">
        <h3 className="text-3xl font-bold">Popular Restaurants</h3>
        <RestaurntContainerSlide />
        <h3 className="text-3xl font-bold">Restaurents at your city</h3>
        <ResataurantContainer />
      </div>
      <div className="p-2 w-[80vw] flex flex-col mx-50 my-5">
        <h3 className="text-3xl font-bold">Cities with food delivery </h3>
        <div className="flex flex-wrap gap-2 py-5 justify-between items-center">
          <div className="flex justify-center items-center border border-black p-2 rounded rounded-xl w-[22%]">
            {" "}
            <h4>city xyz</h4>
          </div>
          <div className="flex justify-center items-center border border-black p-2 rounded rounded-xl w-[22%]">
            {" "}
            <h4>city xyz</h4>
          </div>
          <div className="flex justify-center items-center border border-black p-2 rounded rounded-xl w-[22%]">
            {" "}
            <h4>city xyz</h4>
          </div>
          <div className="flex justify-center items-center border border-black p-2 rounded rounded-xl w-[22%]">
            {" "}
            <h4>city xyz</h4>
          </div>
          <div className="flex justify-center items-center border border-black p-2 rounded rounded-xl w-[22%]">
            {" "}
            <h4>city xyz</h4>
          </div>
          <div className="flex justify-center items-center border border-black p-2 rounded rounded-xl w-[22%]">
            {" "}
            <h4>city xyz</h4>
          </div>
          <div className="flex justify-center items-center border border-black p-2 rounded rounded-xl w-[22%]">
            {" "}
            <h4>city xyz</h4>
          </div>
          <div className="flex justify-center items-center border border-black p-2 rounded rounded-xl w-[22%]">
            {" "}
            <h4>city xyz</h4>
          </div>
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
