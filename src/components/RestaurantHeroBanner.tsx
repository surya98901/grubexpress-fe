import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { Star, SignpostBig, Phone } from "lucide-react";
import { Button } from "@base-ui/react";
const RestaurantHeroBanner = ({ data }: { data: any }) => {
 
  const serviceType = useSelector(
    (state: RootState) => state.service.serviceType,
  );
  return serviceType === "dine-out"
    ? dininBanner(data)
    : foodDeliverBanner(data);
};
const foodDeliverBanner = (data: any) => {
  return (
    <div className="flex flex-col  w-[60vw]">
      <img
        src={data?.imageURL}
        alt=""
        className="
            rounded-xl h-[40vh] w-full object-center object-cover"
      />
      <div className="flex flex-col text-sm w-[80%] justify-left p-5 gap-2 ">
        <div className=" flex gap-2 px-2 items-center gap-1  text-sm font-semibold">
          <Star className="h-4 w-4 fill-white text-white rounded-full bg-green-700 p-1 w-[20px] h-[20px]" />
          <p className="font-bold">
            {data?.rating + "(xk+ ratings)"}{" "}
            <span className="text-gray-400 px-2">•</span>
            {data?.avgPriceforTwo + " for two"}
          </p>
        </div>
        <div className=" flex gap-2 px-2 items-center gap-1  text-[12px] font-semibold">
          {data?.Cusine?.map((item: string) => (
            <p className="text-green-700 tracking-tighter underline font-bold ">
              {" "}
              {item}
            </p>
          ))}
        </div>
        <div className=" flex gap-2 px-2 items-center  font-semibold border-b border-gray-400 w-[20vw] pb-5">
          <p
            className={
              data?.status == "open" ? `text-green-600` : `text-red-600`
            }
          >
            {data?.status}
          </p>
          <span className="text-gray-400 px-2">•</span>
          <p className="text-gray-500"> Closes {data?.closesAt}pm</p>
        </div>
        <div className=" flex flex-col px-2 font-semibold  w-[20vw] p-5">
          <p>{data?.address?.addressLine}</p>
          <span className="text-gray-400 px-2">•</span>
          <p> Closes {data?.closesAt}pm</p>
        </div>
      </div>
    </div>
  );
};
const dininBanner = (data: any) => {
  return (
    <div className="flex w-[60vw] gap-5 rounded-xl p-5">
      <img
        src={data?.imageURL}
        alt=""
        className="
            rounded-xl h-[40vh] w-[50%] object-center object-cover"
      />
      <div className="flex relative flex-col text-sm w-[50%] justify-left p-5  ">
        <h1 className="text-4xl font-bold pt-2 tracking-tighter">{data.Name}</h1>
        <div className=" flex p-1 mb-2 items-center gap-2 font-bold">
          {data?.Cusine?.map((item: string) => (
            <p className="text-green-700 tracking-tighter font-bold ">
              {item}
            </p>
          ))}
          
        </div>
        <div className="text-xl tracking-tighter flex p-1"><p>x km • {data.address.addressLine}</p></div>
        
        <div className=" flex gap-5 p-1 items-center text-sm font-semibold ">
          <p className="flex gap-1 items-center">
            <span className="flex gap-1 bg-green-900 text-white px-2 py-1 rounded-xl">
              <Star className="h-4 w-4 fill-yellow-300 text-yellow-500 rounded-xl  p-1 w-[20px] h-[20px]" />
              {data?.rating}
            </span>
            xk ratings
            
          </p>
          <p >|{data?.avgPriceforTwo + " for two"}</p>
        </div>        
        <div className=" flex gap-4 px-2 mt-3 items-center  font-semibold  w-[20vw] ">
          <p
            className={
              data?.status == "open" ? `text-green-600` : `text-red-600`
            }
          >
            {data?.status}
            <span className="text-gray-500"> till {data?.closesAt}pm</span>
          </p>
          <p className="flex items-center gap-1">
            <span>
              <SignpostBig className="w-[15px]" />{" "}
            </span>{" "}
            Directions
          </p>
          <p className="flex items-center gap-1">
            <span>
              <Phone className="w-[15px]  " />
            </span>{" "}
            Call
          </p>
        </div>
        <Button className= "absolute bottom-0  w-[80%] bg-green-700 text-white rounded-xl py-3 "> login to avail offer and pay  </Button>
      </div>
    </div>
  );
};
export default RestaurantHeroBanner;
