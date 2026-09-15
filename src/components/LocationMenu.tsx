import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { MapPin } from 'lucide-react';
const LocationMenu = ({ className }: { className?: string }) => {
    return(
        <NavigationMenu  className={className}>
            <NavigationMenuList >
                <NavigationMenuItem >
                    <NavigationMenuTrigger><MapPin className="mr-2 h-4 w-4" />Location</NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-white text-black placeholder:text-gray-500 w-full rounded-xl">
                        <p>Select your location</p>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>    
    )
}
export default LocationMenu