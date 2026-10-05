import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EllipsisVertical   } from "lucide-react";
import { orderTable, reservationTable } from "@/assets/utils/constants";

const AdminTable = ({tableType, tableData}:{tableType:string | null, tableData : any[]})=>{
  const tableDetails = tableType === "orders" ? orderTable : reservationTable  
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{tableDetails.title} List</h2>

          <p className="text-sm text-gray-500">
            {tableDetails.tagLine}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100">
          <tableDetails.icon className="h-5 w-5 text-yellow-700" />
        </div>
      </div>
      <div className="min-w-0 overflow-x-auto rounded-xl border border-gray-100">
        <Table>
          <TableCaption>A list of your recent {tableDetails.title}.</TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]"> {tableDetails.title}-Id</TableHead>
               {tableDetails.rows.map((item)=> <TableHead className="w-[50px]">{item}</TableHead>)}
                <TableHead className="w-[100px]"> Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="w-[150px]">item._id</TableCell>
               {tableData.map((item)=> <TableCell className={`${item === "Status" ? "text-green-500" :"w-[50px]"}`}>{item}</TableCell>)}
              <TableCell >< EllipsisVertical className="w-5 h-5 "/></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  )
  
}
export default AdminTable