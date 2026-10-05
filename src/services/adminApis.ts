
import {authApi }from "./api";
export const getAdminRestaurents = ()=>{
    return authApi.get("/api/admin/restaurants")
}