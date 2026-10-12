import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EllipsisVertical } from "lucide-react";
import { orderTable, reservationTable } from "@/assets/utils/constants";
import useGetAdminOrders from "@/hooks/use-getAdminOrders";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

const AdminTable = ({ tableType }: { tableType: string | null }) => {
  const restaurantId = useSelector(
    (state: RootState) => state.user.RestaurantId,
  );

  const tableDetails = tableType === "orders" ? orderTable : reservationTable;

  const { orderData, loading, error } = useGetAdminOrders(
    tableType === "orders" ? restaurantId : null,
  );

  const data = tableType === "orders" ? orderData : null;

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {tableDetails.title} List
          </h2>
          <p className="text-sm text-gray-500">{tableDetails.tagLine}</p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100">
          <tableDetails.icon className="h-5 w-5 text-yellow-700" />
        </div>
      </div>

      <div className="min-w-0 overflow-x-auto rounded-xl border border-gray-100">
        <Table>
          <TableCaption>
            A list of your recent {tableDetails.title}.
          </TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">
                {tableDetails.title}-Id
              </TableHead>

              {tableDetails.rows.map((column: string) => (
                <TableHead key={column}>{column}</TableHead>
              ))}

              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={tableDetails.rows.length + 2}>
                  Loading...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={tableDetails.rows.length + 2}>
                  {error}
                </TableCell>
              </TableRow>
            ) : data && data.length > 0 ? (
              data.map((item: any) => (
                <TableRow key={item._id}>
                  <TableCell className="max-w-[150px] truncate">
                    {item._id}
                  </TableCell>

                  <TableCell>
                    {item.items.map((oits: any) => (
                      <p key={oits._id}>{oits.title}</p>
                    ))}
                  </TableCell>

                  <TableCell>
                    {item.items.map((oits: any) => (
                      <p key={oits._id}>{oits.quantity}</p>
                    ))}
                  </TableCell>

                  {tableDetails.rowValues.map((column: string) => (
                    <TableCell key={column}>
                      {item[column] ?? "-"}
                    </TableCell>
                  ))}

                  <TableCell>
                    <button type="button" aria-label="Actions">
                      <EllipsisVertical className="h-5 w-5" />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={tableDetails.rows.length + 2}
                  className="py-8 text-center text-gray-500"
                >
                  No {tableDetails.title.toLowerCase()} found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default AdminTable;