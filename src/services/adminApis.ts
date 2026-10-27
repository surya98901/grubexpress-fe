
import {authApi }from "./api";
import type {editItemData, itemData} from "@/types/items"
import type { AddRestaurantPayload } from "@/types/AddRestaurantPayload";
export const getAdminRestaurents = ()=>{
    return authApi.get("/api/admin/restaurants");
}
export const AddRestaurant = (formData : AddRestaurantPayload)=>{
    return authApi.post("/api/admin/restaurants", formData)
}
export const getRestaurantStatus = (id:string)=>{
    return authApi.get(`/api/admin/restaurant/${id}/status`)
}
export const setRestaurantStatus = (id:string ,status : string)=>{
    return authApi.patch(`/api/admin/restaurant/${id}/status`, {status})
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
export const setMenuItemStatus = (id:string,itemId :string,  available:boolean) => {
  return authApi.patch(`/api/admin/restaurants/${id}/menu/${itemId}/available`, {available});
};
export const getMenuItemStatus = (id:string,itemId :string) => {
  return authApi.get(`/api/admin/restaurants/${id}/menu/${itemId}/available`);
};
export const deleteMenuItem = (id:string,itemId :string)=>{
    return authApi.delete(`/api/admin/restaurants/${id}/menu/${itemId}`);
}