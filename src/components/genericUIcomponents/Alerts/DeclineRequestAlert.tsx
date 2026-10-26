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
import useEditAdminOrder from "@/hooks/AdminHooks/use-editAdminOrder";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";


export const DeclineRequestAlert = ({
  open,
  setOpen,
  id
}: {
  open: boolean;
   setOpen: (open: boolean) => void;
   id:string
}) => {
  const restaurantId = useSelector((state:RootState)=>state.user.RestaurantId)
  const { editOrder, loading, error } = useEditAdminOrder(
  restaurantId,
  id,
);

const handleDecline = async () => {
  const success = await editOrder("CANCELLED");
  if(success) setOpen(false)

};

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

          <AlertDialogDescription>
            you want to Decline the Order {id}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel >Cancel</AlertDialogCancel>

          <AlertDialogAction onClick={handleDecline}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
