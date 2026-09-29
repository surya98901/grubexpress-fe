import AdminDiningTable from "@/components/AdminDiningList";
import AdminlistCard from "@/components/AdminlistCards";
import AdminOrderTable from "@/components/AdminOrderlist";
import { SquareStar, ChevronRight, EllipsisVertical } from "lucide-react";
import { useState } from "react";

const AdminHome = () => {
  const orders = ["new", "Underprep", "Out For delivery"];
  const dineins = ["new", "Booked", "cancelled"];
  const [selectSevice, setSelectService] = useState<string | null>("orders");
  const [display, setDisplay] = useState<String[]>(orders);
  function handleServiceSelection(e: React.MouseEvent<HTMLElement>) {
    setSelectService(e.currentTarget.id);
    e.currentTarget.id == "orders" ? setDisplay(orders) : setDisplay(dineins);
  }
  return (
    <div className=" flex gap-5 p-5">
      <div className="flex flex-col gap-5 ">
        <section className=" w-[60vw] h-[50vh] y-2 rounded-xl p-2 ">
          <div className="font-bold text-xl text-black flex items-center justify-between pr-5">
            <h2>Orders</h2>
            <ChevronRight />
          </div>
          <AdminOrderTable />
        </section>
        <section className="  w-[60vw] h-[50vh] y-2 rounded-xl p-2">
          <div className="font-bold text-xl text-black flex items-center justify-between pr-5">
            <h2>Reservations</h2>
            <ChevronRight />
          </div>
          <AdminDiningTable />
        </section>
      </div>
      <div className="flex flex-col gap-2">
        <div className=" flex w-[30vw] h-[10vh] justify-center  gap-2">
          <section
            id="orders"
            className={`flex w-[50%] border-1 border-yellow-400 items-center px-3 gap-5 rounded-xl ${selectSevice === "orders" ? "bg-yellow-400" : ""}`}
            onClick={(e) => handleServiceSelection(e)}
          >
            <SquareStar className="bg-green-700 w-10 h-10 text-white rounded-xl" />
            <section className="p-1 flex flex-col ">
              <p className="text-l font-bold mt-2">0</p>
              <span className=" "> Orders </span>
            </section>
          </section>
          <section
            id="dineins"
            className={`flex w-[50%] border-1 border-yellow-400 items-center px-3 gap-5 rounded-xl ${selectSevice === "dineins" ? "bg-yellow-400" : ""}`}
            onClick={(e) => handleServiceSelection(e)}
          >
            <SquareStar className="bg-green-700 w-10 h-10 text-white rounded-xl" />
            <section className="p-1 flex flex-col">
              <p className="text-l font-bold mt-2">0</p>
              <span className=""> Dine-ins </span>
            </section>
          </section>
        </div>
        <section className="  w-[30vw] h-[10vh] y-2 flex gap-2 p-1">
          {display.map((item) => (
            <div className="bg-green-200 w-[10vw] rounded-xl  flex gap-1 items-center p-2 ">
              <SquareStar className="bg-green-700 w-10 h-10 text-white rounded-xl" />
              <section className="p-1 flex flex-col">
                <p className="text-l font-bold mt-2">0</p>
                <span className=" text-xs"> {item} </span>
              </section>
            </div>
          ))}
        </section>
        <section className=" p-3 flex  flex-col  w-[30vw] h-[90vh] y-2 rounded-xl bg-gray-200 ">
          <div className="flex items-center justify-between px-5 my-2">
            <h3 className="">
              {selectSevice === "orders"
                ? "Today Orders"
                : "Today Reservations"}
            </h3>
            <EllipsisVertical />
          </div>
          <div className="px-2  flex items-center justify-center mt-2"><AdminlistCard /></div>
        </section>
      </div>
    </div>
  );
};
export default AdminHome;
