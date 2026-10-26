import { Calendar, Clock, SquareText, Tag, Users } from "lucide-react";
import { formatDate } from "@/assets/utils/helpers";
const AdminDineInDetailsCard = ({data}: {data: any}) => {
  return (
    <div className="flex flex-col gap-2 overflow-y-auto h-max-[40vh] hide-scrollbar">
      <section className="grid grid-cols-2 gap-4">
        <div className=" flex gap-2 ">
          <span className="bg-orange-400 flex items-center px-1 rounded-l text-white">
            <Calendar className=" w-[25px]" />
          </span>
          <div>
            <p className="text-[10px] text-gray-400">Date</p>
            <p className="font-bold text-sm">{data.date}</p>
          </div>
        </div>
        <div className=" flex gap-2">
          <span className="bg-yellow-400 flex items-center px-1 rounded-l text-white">
            <Clock className=" w-[25px]" />
          </span>
          <div>
            <p className="text-[10px] text-gray-400">Time</p>
            <p className="font-bold text-sm">{data.time}</p>
          </div>
        </div>
        <div className=" flex gap-2 ">
          <span className="bg-green-400 flex items-center px-1 rounded-l text-white">
            <Users className=" w-[25px]" />
          </span>
          <div>
            <p className="text-[10px] text-gray-400">Head Counr</p>
            <p className="font-bold text-sm">{data.headCount}</p>
          </div>
        </div>
        <div className=" flex gap-2 ">
          <span className="bg-blue-400 flex items-center px-1 rounded-l text-white">
            <SquareText className="w-[25px]" />
          </span>
          <div className="flex flex-col items-center">
            <p className="text-[10px] text-gray-400">Notes</p>
            <p className="font-bold text-sm">{data?.note || "-"}</p>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-2 gap-4 ">
        <div className=" flex gap-2 items-center">
          <Clock className="w-[25px]" />
          <div className="flex flex-col ">
            <p className="text-[10px] text-gray-400">Booked At</p>
            <p className="font-bold text-sm">{formatDate(data.createdAt)}</p>
          </div>
        </div>
        <div className=" flex gap-2 items-center">
          <Tag className="w-[25px]" />
          <div className="flex flex-col ">
            <p className="text-[10px] text-gray-400">Status</p>
            <p className="bg-orange-400 rounded-xl p-1 px-2 text-white text-xs">
              {data.status}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
export default AdminDineInDetailsCard;
