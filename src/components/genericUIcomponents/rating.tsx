import {  Star } from "lucide-react";
const Rating = ({rating}:{rating : number})=>{
    return (
        <div className=" flex gap-2 px-2 items-center gap-1 text-sm font-semibold shadow">
            <Star className="h-4 w-4 fill-white text-white rounded-full bg-green-700 p-1 w-[20px] h-[20px]" />
            <p>{ rating}</p>
          </div>
    )
}
export default Rating