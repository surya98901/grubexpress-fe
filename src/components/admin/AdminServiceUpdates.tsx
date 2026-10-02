
import { useState } from "react";
import AdminlistCard from "@/components/admin/AdminlistCards";

import {
  Bike,
  CalendarCheck,
  ClipboardList,
  Clock3,
  EllipsisVertical,
  Sparkles,
  Table2,
  Utensils,
  RotateCw,
} from "lucide-react";
type ServiceType = "orders" | "dineins";

const orderStatuses = [
  {
    name: "New",
    value: 0,
    icon: Sparkles,
    bg: "bg-blue-50",
    border: "border-blue-100",
    iconBg: "bg-blue-600",
  },
  {
    name: "Preparation",
    value: 0,
    icon: Clock3,
    bg: "bg-orange-50",
    border: "border-orange-100",
    iconBg: "bg-orange-500",
  },
  {
    name: "Out for Delivery",
    value: 0,
    icon: Bike,
    bg: "bg-purple-50",
    border: "border-purple-100",
    iconBg: "bg-purple-600",
  },
];

const dineInStatuses = [
  {
    name: "New",
    value: 0,
    icon: Sparkles,
    bg: "bg-blue-50",
    border: "border-blue-100",
    iconBg: "bg-blue-600",
  },
  {
    name: "Reserved",
    value: 0,
    icon: CalendarCheck,
    bg: "bg-orange-50",
    border: "border-orange-100",
    iconBg: "bg-orange-500",
  },
  {
    name: "Available",
    value: 0,
    icon: Table2,
    bg: "bg-green-50",
    border: "border-green-100",
    iconBg: "bg-green-600",
  },
];

const orderList = [
  {
    image: "...",
    title: "Chicken Biryani",
    time: "12 mins",
    value: "₹240",
  },
  {
    image: "...",
    title: "Paneer Butter Masala",
    time: "18 mins",
    value: "₹180",
  },
];

const reservationList = [
  {
    image: "...",
    title: "Table 12",
    time: "7:30 PM",
    value: "4 guests",
  },
  {
    image: "...",
    title: "Table 4",
    time: "8:00 PM",
    value: "2 guests",
  },
];
const AdminServiceUpdates = ()=>{
      const [selectService, setSelectService] = useState<ServiceType>("orders");

  const isOrders = selectService === "orders";
  const statusList = isOrders ? orderStatuses : dineInStatuses;
  const currentList = isOrders ? orderList : reservationList;

    return (
         <aside className="w-full max-w-[360px] shrink-0 space-y-5">
          <div className="grid grid-cols-2 gap-2 ">
            <button
              type="button"
              onClick={() => setSelectService("orders")}
              className={`flex items-center gap-3 rounded-2xl border px-4 text-left transition-all duration-200 ${
                isOrders
                  ? "border-yellow-400 bg-yellow-400 shadow-md"
                  : "border-gray-200 bg-white hover:-translate-y-0.5 hover:border-yellow-300 hover:shadow-md"
              }`}
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                  isOrders ? "bg-white" : "bg-yellow-100"
                }`}
              >
                <ClipboardList className="h-5 w-5 text-yellow-700" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">0</p>
                <span className="text-sm text-gray-600">Orders</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setSelectService("dineins")}
              className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all duration-200 ${
                !isOrders
                  ? "border-green-500 bg-green-500 shadow-md"
                  : "border-gray-200 bg-white hover:-translate-y-0.5 hover:border-green-300 hover:shadow-md"
              }`}
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                  !isOrders ? "bg-white" : "bg-green-100"
                }`}
              >
                <Utensils className="h-5 w-5 text-green-700" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">0</p>
                <span className="text-sm text-gray-600">Dine-ins</span>
              </div>
            </button>
          </div>

          <section className="grid grid-cols-3 gap-3">
            {statusList.map((status) => {
              const Icon = status.icon;
              return (
                <div
                  key={status.name}
                  className={`rounded-2xl border p-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm ${status.bg} ${status.border}`}
                >
                  <div
                    className={`mb-2 flex h-9 w-9 items-center justify-center rounded-lg ${status.iconBg}`}
                  >
                    <Icon className="h-4 w-4 text-white" />
                  </div>

                  <p className="text-xl font-bold text-gray-900">
                    {status.value}
                  </p>

                  <span className="text-xs font-medium text-gray-500">
                    {status.name}
                  </span>
                </div>
              );
            })}
          </section>


          <section className="flex min-h-[500px] flex-col rounded-2xl bg-gray-200 p-3">


            <div className="my-2 flex items-center justify-between px-3">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {isOrders ? "Today's Orders" : "Today's Reservations"}
                </h3>

                <p className="mt-0.5 text-xs text-gray-500">
                  {isOrders
                    ? "Recent order activity"
                    : "Recent reservation activity"}
                </p>
              </div>

              <button
                type="button"
                className="rounded-lg p-1 text-gray-500 transition hover:bg-white hover:text-gray-900 "
              >
                <RotateCw className="h-5 w-5" />
              </button>
            </div>

            {/* List */}

            <div className="mt-2 flex flex-col px-1 gap-2">
              {currentList.map((item)=><AdminlistCard list={item} /> )}
            </div>
          </section>
        </aside>
    )
}
export default  AdminServiceUpdates