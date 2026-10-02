import { getOrders } from "@/services/userApi"
import { useEffect, useState } from "react"
import OrderCards from "@/components/orders/OrderCards"

import type {OrderDetails} from "@/types/order"

const Order = ()=>{
    const [orders, setOrders] = useState<OrderDetails[] | null>(null)
    useEffect(()=>{
        const fetchOrders = async ()=>{
            try{
                const response = await getOrders();
                setOrders(response.data.data)
            }catch(err){
                console.log(err);
            }
        }
        fetchOrders()
    }, [])

    return (
        <div>
            <section>
                {orders?.map((item)=> <OrderCards key= {item._id} data = {item}/>)}
            </section>
        </div>
    )
}
export default Order