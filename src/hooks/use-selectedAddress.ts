import { getUserAddressId } from "@/services/userApi"
import axios from "axios";
const useSelectedAddress = (id : string)=>{
    const getAddress = async ()=>{
        try{
            const response = await getUserAddressId(id);
        return response
        }catch(err){
            if(axios.isAxiosError(err)){
                if(err.response?.status === 400){
                    return err.response.data.message || "Address not found"
                }
                
            }
            return  "Unable to fetch address details"
        }
    }
    return getAddress; 
}
export default useSelectedAddress