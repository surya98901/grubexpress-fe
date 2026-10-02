import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Star, CalendarCheck,BadgeIndianRupee  } from "lucide-react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

const RestaurantCard = ({ data }: { data: any }) => {
  const serviceType = useSelector(
    (state: RootState) => state.service.serviceType,
  );
  return serviceType === "dine-out" ? diningCard(data) : deliveryCard(data);
};
const deliveryCard = (data: any) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="w-[350px]"
    >
      <Card className="overflow-hidden p-0 gap-1 hover:shadow-xl transition-shadow duration-300 h-[300px]">
        <div className="relative h-[180px] overflow-hidden rounded-t-xl">
          <img
            src={data?.imageURL}
            alt={data.Name}
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

          {data.popular && (
            <div className=" absolute top-3 -left-10 rotate-[-45deg] bg-green-700 px-10 py-1 text-sm font-semibold text-white">
              Popular
            </div>
          )}
        </div>

        <CardHeader className="flex justify-between mt-2 ">
          <div>
            <CardTitle className="text-xl font-bold tracking-tight">
              {data.Name}
            </CardTitle>

            <CardDescription>{data.Cusine[0] + " • " + data.Cusine[1]}</CardDescription>
          </div>
          <div className=" flex gap-2 px-2 items-center gap-1  text-sm font-semibold">
              <Star className="h-4 w-4 fill-white text-white rounded-full bg-green-700 p-1 w-[20px] h-[20px]" />
              <p>{data.rating}</p>
          </div>
        </CardHeader>

        <CardContent className="mb-2">
          <p className="text-sm text-muted-foreground">
            Fast delivery EST : x hrsy min
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};
const diningCard = (data: any) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="w-[350px]"
    >
      <Card className="overflow-hidden p-0 m-0 hover:shadow-xl transition-shadow duration-300 gap-1 h-[350px]">
        <div className="relative h-[150px] overflow-hidden p-0 m-0">
          <img
            src={data.imageURL}
            alt={data.Name}
            className="h-full w-full object-cover object-center rounded-xl "
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-between text-xl text-white font-bold tracker-tight p-2">
            <h3>{data.Name}</h3>
            <div className=" flex gap-2 px-2 items-center gap-1 text-white text-sm font-semibold shadow">
              <Star className="h-4 w-4 fill-white text-white rounded-full bg-green-700 p-1 w-[20px] h-[20px]" />
              <p>{data.rating}</p>
            </div>
          </div>

          {data.popular && (
            <div className=" absolute top-3 -left-10 rotate-[-45deg] bg-green-700 px-10 py-1 text-sm font-semibold text-white">
              Popular
            </div>
          )}
        </div>
        <CardContent className="flex justify-between mt-1 gap-1 ">
          <div className="flex justify-between text-xs  ">
            <p className="text-muted-foreground line-clamp-1 ">{data.Cusine[0] + " • " + data.Cusine[1]}</p>
            <p className="text-xs tracking-tighter">{data.avgPriceforTwo} for two</p>
          </div>
          <div className="flex justify-between text-xs ">
            <p className="text-muted-foreground line-clamp-1 ">{data.address.addressLine}</p>
            <p className="text-xs tracking-tighter">x km</p>
          </div>
          <div className=" px-2 py-1 h-[25px] w-[100px] bg-gray-300 flex gap-2 text-[10px] items-center rounded-xl py-2 justify-start"> <CalendarCheck className="w-[10px]"/> <span >table booking</span> </div>
          <div className="flex flex-col gap-2 ">
            <div className=" bg-green-100 w-full p-2 rounded-xl text-xs text-green-900 items-center justify-center flex gap-2 font-bold">
              <BadgeIndianRupee className="w-[15px]"/>
              <p>Flat X percent off on pre-booking</p>
              <p> +x more</p>
            </div>
            <div className=" bg-green-700 w-full p-2 rounded-xl text-xs text-white items-center justify-center flex gap-2 font-bold">
              <BadgeIndianRupee className="w-[15px]"/>
              <p>Flat X percent off on pre-booking</p>
              <p> +x more</p>
            </div>
            <p className="text-blue-900 font-bold">get rs x off using xpayment partner</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RestaurantCard;
