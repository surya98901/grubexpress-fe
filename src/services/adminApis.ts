
import {authApi }from "./api";
import type {itemData} from "@/types/items"
export const getAdminRestaurents = ()=>{
    return authApi.get("/api/admin/restaurants")
}
export const editItemDetails = (resId : string, itemId:string, formData :itemData)=>{
    return authApi.patch(`/api/admin/restaurants/${resId}/menu/${itemId}/edit`,formData)
}