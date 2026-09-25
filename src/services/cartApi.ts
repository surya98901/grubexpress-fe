
import api from "./api";
export const getCartDetails = ()=>{
    return api.get("/api/user/cart")
}