import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Utensils } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NewRestaurantAlert = ({created, setCreated, name} : {created : boolean, setCreated : (created:boolean)=>void, name : string})=>{
    const navigate = useNavigate()
    return (
              <AlertDialog
        open={created}
        onOpenChange={(open) => {
          if (!open) setCreated(false);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Restaurant created successfully!
            </AlertDialogTitle>
            <AlertDialogDescription>
              {name} is ready. Would you like to add menu items now, or
              explore your admin dashboard?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row">
            <AlertDialogCancel
              onClick={() => navigate("/admin/dashboard")}
            >
              Explore dashboard
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => navigate("/admin/menu")}>
              <Utensils className="mr-2 size-4" />
              Add menu items
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
}
export default NewRestaurantAlert