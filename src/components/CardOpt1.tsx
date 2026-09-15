import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CircleArrowRight } from 'lucide-react';

import { Link } from "react-router-dom";

const CardOpt1 = (data : { title: string; tagline: string; content: string }) => {
  return (
    <Card className="w-[300px] rounded-4xl">
      <CardHeader>
        <CardTitle className="font-bold text-3xl">{data.title}</CardTitle>
        <CardDescription className="font-medium text-base pb-2">{data.tagline}</CardDescription>
        <p className="font-bold text-lg text-green-700">{data.content}</p>
      </CardHeader>
      <CardFooter className="flex justify-end">
        <Link to= "/customer/restaurants">
          <CircleArrowRight  color="green" size={50} />
        </Link>
      </CardFooter>
    </Card>
  );
};
export default CardOpt1;