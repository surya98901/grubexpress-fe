
import {authApi }from "./api";
export const getUserDetails = ()=>{
    return authApi.get("/api/user/profile")
}
export const addUserOrderItem = (id:string)=>{
    return authApi.post(`/api/user/cart/add/:${id}`)
}
export const removeUserOrderItem = (id:string)=>{
    return authApi.patch(`/api/user/cart/remove/:${id}`)
}
export const getUserCart = ()=>{
    return authApi.get("/api/user/cart");
}
export const deleteUserCart = ()=>{
    return authApi.delete("/api/user/cart");
}