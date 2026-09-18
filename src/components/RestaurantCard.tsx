import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Star } from "lucide-react";
import { motion } from "framer-motion";

const RestaurantCard = ({ data }: { data: any }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="w-[350px]"
    >
      <Card className="overflow-hidden border-none hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-[200px] overflow-hidden rounded-t-xl">
          <img
            src={data.imageURL}
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

        <CardHeader className="flex justify-between">
          <div>
            <CardTitle className="text-xl font-bold tracking-tight">
              {data.Name}-{data.address.city}
            </CardTitle>

            <CardDescription>{data.Cusine.join(" • ")}</CardDescription>
          </div>
          <div className=" w-[60px] flex items-center gap-1 rounded-full text-white px-3 py-1 text-sm font-semibold shadow bg-green-700">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            {data.rating}
          </div>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">
            Fast delivery EST : x hrsy min
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RestaurantCard;
