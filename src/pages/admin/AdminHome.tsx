
import AdminResBanner from "@/components/admin/AdminResBanner";
import AdminServiceUpdates from "@/components/admin/AdminServiceUpdates";
import AdminTable from "@/components/admin/AdminTable";



const AdminHome = () => {

  return (
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
  );
};

export default AdminHome;
