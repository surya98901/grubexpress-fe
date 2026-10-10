
import type { profileEdit } from "@/types/AuthFormData";
import {authApi }from "./api";
import type {Address} from "@/types/address"
type AddressFormData = Omit<Address, "_id">;
export const getUserDetails = ()=>{
    return authApi.get("/api/user/profile")
}
export const editUserDetails = (formData : profileEdit)=>{
    return authApi.patch("api/user/profile/edit", formData)
}
export const getUserAddress = ()=>{
    return authApi.get("/api/user/address")
}
export const getUserAddressId = (id: string)=>{
    return authApi.get(`/api/user/address/${id}`)
}
export const setUserAddress = (formData : AddressFormData)=>{
    return authApi.post("/api/user/address", formData)
}
export const addUserOrderItem = (id:string)=>{
    return authApi.post(`/api/user/cart/${id}`)
}
export const removeUserOrderItem = (id:string)=>{
    return authApi.patch(`/api/user/cart/${id}`)
}
export const getUserCart = ()=>{
    return authApi.get("/api/user/cart");
}
export const deleteUserCart = ()=>{
    return authApi.delete("/api/user/cart");
}
export const placeOrder = ()=>{
    return authApi.post("/api/user/order");
}
export const getOrders = ()=>{
    return authApi.get("/api/user/order");
}
export const getPayment = (orderId:String)=>{
    return authApi.get(`/api/payment/${orderId}`)
}
