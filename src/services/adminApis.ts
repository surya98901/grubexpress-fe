
import {authApi }from "./api";
import type {editItemData, itemData} from "@/types/items"
import type { AddRestaurantPayload } from "@/types/AddRestaurantPayload";
export const getAdminRestaurents = ()=>{
    return authApi.get("/api/admin/restaurants");
}
export const AddRestaurant = (formData : AddRestaurantPayload)=>{
    return authApi.post("/api/admin/restaurants", formData)

}
export const addItem = (resId : string, formData :itemData)=>{
    return authApi.post(`/api/admin/restaurants/${resId}/menu/add`,formData);
}
export const editItemDetails = (resId : string, itemId:string, formData :editItemData)=>{
    return authApi.patch(`/api/admin/restaurants/${resId}/menu/${itemId}/edit`,formData);
}

export const getAdminOrders = (resId : string)=>{
    return authApi.get(`/api/admin/restaurants/${resId}/orders`);
}
export const editAdminOrders = (resId : string , oid:string,status: string,)=>{
    return authApi.patch(`/api/admin/restaurants/${resId}/orders/${oid}`,{status},);
}

export const getAdminReservations = (resId : string)=>{
    return authApi.get(`/api/admin/restaurants/${resId}/reservations`);
}

export const editAdminReservations = (resId : string, rid:string)=>{
    return authApi.get(`/api/admin/restaurants/${resId}/reservations/${rid}`);
}
