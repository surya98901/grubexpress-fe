import { MapPin, MapPinPlus } from "lucide-react";
import AddressAlert from "@/components/genericUIcomponents/Alerts/AddressAlert";
import { useDispatch } from "react-redux";
import { setDeliveryAddress } from "@/store/slices/userSlice";
import { useState } from "react";

export const AddressCard = ({ data }: { data: any }) => {
  const dispatch = useDispatch();
  const [select, setSelect] = useState<boolean>(false);

  const handleDeliveryAddress = () => {
    dispatch(setDeliveryAddress(data._id));
    setSelect((pre) => !pre);
  };

  return (
    <div
      className={`w-[20vw] h-[30vh] shadow-xl border-t-2 border-gray-300 rounded-xl flex gap-2 p-5 shrink-0 ${
        select ? "border-2 border-green-700" : ""
      }`}
    >
      <section className="text-gray-600 p-1 w-10 h-10">
        <MapPin />
      </section>

      <section className="flex flex-col justify-between">
        <div>
          <h2 className="font-bold">{data?.label}</h2>

          <p className="text-sm">{data?.addressLine}</p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm">EST: val</p>

          <button
            className={`font-bold p-1 px-2 rounded ${
              select
                ? "bg-green-700 text-white"
                : "border border-green-700 text-green-700"
            }`}
            onClick={handleDeliveryAddress}
          >
            {select ? "Selected" : "Deliver Here"}
          </button>
        </div>
      </section>
    </div>
  );
};

export const AddAddressCard = () => {
  return (
    <div className="w-[20vw] shadow-xl border-t-2 border-gray-300 rounded-xl flex gap-2 p-5 shrink-0">
      <section className="text-gray-600 p-1 w-10 h-10">
        <MapPinPlus />
      </section>

      <AddressAlert />
    </div>
  );
};
