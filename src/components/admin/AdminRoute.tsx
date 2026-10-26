import type { RootState } from "@/store/store"
import { useSelector } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router-dom"

const AdminRoute = ()=>{
    const {userName, role} = useSelector(
        (state:RootState)=> state.user
    )
    const location = useLocation();
    if(!userName){
        return <Navigate to ={`/auth?mode=signin`} state={{from:location}} replace />
    }
    if(role != "admin"){
         return <Navigate to ="/" replace />
    }
    return <Outlet/>
}
export default AdminRoute