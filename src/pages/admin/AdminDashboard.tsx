
import AdminResBanner from "@/components/admin/AdminResBanner";
import AdminServiceUpdates from "@/components/admin/AdminServiceUpdates";
import AdminTable from "@/components/admin/AdminTable";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";


const AdminDashboard = () => {
  const restaurantId = useSelector((state: RootState) => state.user.RestaurantId);

  return  restaurantId ? (
    <main className="min-w-0 flex-1 bg-gray-50 p-5">
      <div className="flex min-w-0 gap-5">
        <div className="min-w-0 flex-1 space-y-5">
         <AdminResBanner /> 
         <AdminTable tableType = "orders" tableData={[]}/>
         <AdminTable tableType = "reservations" tableData={[]}/>
        </div>
        <AdminServiceUpdates/>
      </div>
    </main>
  ) : ( <main>
    <div> add your restaurant to get started</div>
  </main>)
};

export default AdminDashboard;
