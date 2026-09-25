import { getCartDetails } from "@/services/cartApi"
import { useState, useEffect } from "react"
interface cartDetails{
    cart : any[],
}
const Cart =  ()=>{
    const [cartData, setCartData] = useState<cartDetails | null>(null)
    useEffect(()=>{
        const fetchCartDetails = async ()=>{
           try{
            const response = await getCartDetails();
            const Cartdetails = response.data;
            setCartData(Cartdetails);
           }catch(err){
            console.log(err)
           }
        };
        fetchCartDetails();
    }, []);
    console.log(cartData)
    return (
        <div>
            Cart page
        </div>
    )
}
export default Cart