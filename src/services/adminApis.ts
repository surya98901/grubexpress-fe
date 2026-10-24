
import {authApi }from "./api";
import type {editItemData, itemData} from "@/types/items"
import type { AddRestaurantPayload } from "@/types/AddRestaurantPayload";
export const getAdminRestaurents = ()=>{
    return authApi.get("/api/admin/restaurants");
}
export const editItemDetails = (resId : string, itemId:string, formData :editItemData)=>{
    return authApi.patch(`/api/admin/restaurants/${resId}/menu/${itemId}/edit`,formData);
}
export const getAdminOrders = (resId : string)=>{
    return authApi.get(`/api/admin/restaurants/${resId}/orders`);
}
export const AddRestaurant = (formData : AddRestaurantPayload)=>{
    return authApi.post("/api/admin/restaurants", formData)

}
export const addItem = (resId : string, formData :itemData)=>{
    return authApi.post(`/api/admin/restaurants/${resId}/menu/add`,formData);
}