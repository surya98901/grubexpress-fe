import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MapPin } from "lucide-react";
import { ChevronDown } from 'lucide-react';
import { useDispatch } from "react-redux";
import { setCity } from "@/store/slices/locationslice";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import {citiesList} from "@/assets/utils/constants"

const LocationMenu = ({ className }: { className?: string }) => {
 
  const defaultCity = useSelector((state: RootState) => state.location.city);
  const dispatch = useDispatch()
  const handleLocationChange = (city: string)=>{
    dispatch(setCity(city))
                
    document?.getElementById("restaurant-carousel")?.scrollIntoView({block:"end",behavior: "smooth" })
  }
 

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild >
        <Button
          variant="ghost"
          className={`bg-white text-black hover:bg-gray-100 rounded-xl ${className}`}
        >
          <MapPin className="h-4 w-4" />
          {defaultCity }
          <ChevronDown  className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[200px]">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            Select location
          </DropdownMenuLabel>

          {citiesList.map((loc) => (
            <DropdownMenuItem
              key={loc}
              onClick={() => {handleLocationChange(loc)}}
            >
              
              {loc}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LocationMenu;