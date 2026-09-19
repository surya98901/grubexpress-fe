import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { setServiceType } from "@/store/slices/serviceSlice";

import { CircleArrowRight } from 'lucide-react';
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const CardOpt1 = (data : { title: string; tagline: string; content: string, val:string }) => {
  const dispatch = useDispatch();
  const handleClick = (val:string)=>{
    dispatch(setServiceType(val))
  }
  return (
    <Card className="w-[300px] rounded-4xl" >
      <CardHeader>
        <CardTitle className="font-bold text-3xl">{data.title}</CardTitle>
        <CardDescription className="font-medium text-base pb-2">{data.tagline}</CardDescription>
        <p className="font-bold text-lg text-green-700">{data.content}</p>
      </CardHeader>
      <CardFooter className="flex justify-end">
        <Link to= {`/customer/restaurants`}>
          <CircleArrowRight  color="green" size={50} onClick={()=> handleClick(data.val)} />
        </Link>
      </CardFooter>
    </Card>
  );
};
export default CardOpt1;