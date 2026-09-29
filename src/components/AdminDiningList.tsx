import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const AdminDiningTable = ()=>{
    return (
    <Table>
  <TableCaption>A list of your recent Dine-in reservations.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[200px]">Product Name</TableHead>
      <TableHead>Product Id</TableHead>
      <TableHead>Quantity</TableHead>
      <TableHead>Price</TableHead>
      <TableHead>Date</TableHead>
       <TableHead>Order Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">item.name</TableCell>
      <TableCell>item._id</TableCell>
      <TableCell>item.quantity</TableCell>
      <TableCell>item.total</TableCell>
      <TableCell>item.createdAt</TableCell>
      <TableCell className= {"text-green-500"}>item.status</TableCell>
    </TableRow>
  </TableBody>
</Table>
    )
}
export default AdminDiningTable