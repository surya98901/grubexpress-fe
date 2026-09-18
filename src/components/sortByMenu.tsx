import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from 'lucide-react';
import { useDispatch } from "react-redux";

const SortByMenu = ({className}: {className:string})=>{
     <DropdownMenu>
      <DropdownMenuTrigger >
        <Button
          variant="ghost"
          className={`bg-white text-black hover:bg-gray-100 rounded-xl ${className}`}
        >
          
          defaultCity
          <ChevronDown  className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[200px]">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            Select location
          </DropdownMenuLabel>

          {sortValues.map((val) => (
            <DropdownMenuItem
              key={val}
              onClick={() => {handleLocationChange(val)}}
            >
              
              {val}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
}
export default SortByMenu