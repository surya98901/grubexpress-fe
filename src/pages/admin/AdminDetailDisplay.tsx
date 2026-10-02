import AdminTable from "@/components/admin/AdminTable";
import { DatePicker } from "@/components/genericUIcomponents/DatePicker";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const AdminDetailDisplay = () => {
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState<number>(0);
  const type = searchParams.get("type");
  const filters = [
    {
      title : "All Orders",
    },
    {
      title : "Pending",
    },
    {
      title : "Completed",
    }
  ]

  return (
    <div className="w-[80vw] mx-auto">
      <div className="my-2 px-5 rounded-xl h-[10vh] shadow-xl flex border-1 border-t-gray-300 items-center justify-between">
        <section className=" flex items-center gap-4 px-5 ">
          {filters.map((item, index)=> <button key={index} className={`${filter === index && "font-bold" } px-2 py-1 rounded-xl  underline `} 
        onClick = {()=>setFilter(index)} > {item.title}</button>)
        }
        </section>
        <DatePicker/>
      </div>
      <AdminTable tableType={type} tableData={[]} />
      
    </div>
  );
};

export default AdminDetailDisplay;
