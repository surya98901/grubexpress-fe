
import { MapPin,MapPinPlus } from 'lucide-react';
const AddressCard = ({data} : {data:any | null})=>{
    return (
        <div className="w-[20vw] h-[30vh] shadow-xl border-t-2 border-gray-300 rounded-xl flex gap-2 p-5 shrink-0">
            <section className='text-gray-600 p-1 w-10 h-10'>{data ? <MapPin /> : <MapPinPlus/>}</section>
            <section className='flex flex-col justify-between'> 
                <div >
                    <h2 className=' font-bold '>{data?.label || "Add address"}</h2>
                    <p className='text-sm'>{data?.addressLine  || "get location from user location" }</p>
                </div>
                <div className='flex flex-col gap-2'>
                    <p className='text-sm'>EST : val</p>
                 <button className={`${data ? 'bg-green-700 text-white ' : ' border-2 border-green-700 text-green-700'}` + " font-bold p-1 px-2 " }> Deliver Here</button>
                </div>
            </section>
        </div>
    )
}
export default AddressCard