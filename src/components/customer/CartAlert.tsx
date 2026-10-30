import type { RootState } from "@/store/store"
import { useSelector } from "react-redux"
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const CartAlert = ()=>{
    const navigate = useNavigate()
    const cartdetails = useSelector((state:RootState)=> state.cart)
    const val = cartdetails.items.reduce((acc, curr)=> acc+curr.quantity, 0)

    return (
        <div className="bg-green-700 w-[60vw] h-[5vh] text-white mx-auto z-50 fixed flex items-center justify-between px-5 p-2 text-sm bottom-4 left-1/2 -translate-x-1/2 rounded-lg shadow-lg">
            <p>{val } {val ===1 ? "Item" : "Items"} added  </p>
            <span onClick={()=> navigate("/customer/cart")} className="flex items-center gap-2 hover:underline">VIEW CART <ShoppingCart size={15}/></span>

        </div>
    )
}
export default CartAlert