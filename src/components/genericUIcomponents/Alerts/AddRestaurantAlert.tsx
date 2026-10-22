import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { ArrowRight, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddRestaurantAlert = () => {
  const navigate = useNavigate()
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <button
            type="button"
            className="group flex min-h-[300px] flex-col items-center justify-center gap-5 rounded-2xl border-2 border-dashed border-green-600 bg-green-700 p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-green-800 hover:shadow-xl hover:shadow-green-950/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
          >
            <span className="flex size-16 items-center justify-center rounded-2xl bg-white/15 text-white transition-transform duration-300 group-hover:scale-110">
              <Plus size={32} strokeWidth={1.8} />
            </span>

            <div>
              <h3 className="text-xl font-bold text-white">
                Add your restaurant
              </h3>
              <p className="mt-2 max-w-[220px] text-sm leading-6 text-green-100">
                Bring another kitchen to GrubExpress and manage everything in
                one place.
              </p>
            </div>

            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition-colors group-hover:bg-green-50">
              Get started
              <ArrowRight size={16} />
            </span>
          </button>
        }
      >
      </AlertDialogTrigger>
      <AlertDialogContent className="flex flex-col px-10">
        <AlertDialogHeader>
          <AlertDialogTitle>Add A new Restaurent</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="border-b border-gray-300 pb-5">
              <h4 className="text-sm font-bold text-gray-800">
                For an easy form onboarding process,
              </h4>
              <p className="text-sm text-gray-600">
                you can keep these documents handy.
              </p>
            </div>
          </AlertDialogDescription>
          <div className=" w-[100%]">
            <ul className="mt-6 space-y-5 text-sm">
              <li className="flex gap-2">
                <span className="text-green-700">•</span>

                <span>
                  FSSAI License copy
                  <span className="ml-2 cursor-pointer font-bold text-green-700 underline">
                    Apply Here
                  </span>
                </span>
              </li>

              <li className="flex gap-2">
                <span className="text-green-700">•</span>
                <span>Your Restaurant menu</span>
              </li>

              <li className="flex gap-2">
                <span className="text-green-700">•</span>
                <span>Bank details</span>
              </li>

              <li className="flex gap-2">
                <span className="text-green-700">•</span>
                <span>
                  GSTIN
                  <span className="ml-2 cursor-pointer font-bold text-green-700 underline">
                    Apply Here
                  </span>
                </span>
              </li>

              <li className="flex gap-2">
                <span className="text-green-700">•</span>
                <span>PAN card copy</span>
              </li>
            </ul>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick = {()=> navigate("/admin/add-restaurant")}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default AddRestaurantAlert;
