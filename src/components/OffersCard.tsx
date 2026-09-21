import {BadgeIndianRupee} from 'lucide-react'
const OffersCard = ()=>{
    return (
        <div className='shadow-l flex gap-3 flex-shrink-0 items-center border-3 border-green-700 w-[300px] p-1 rounded-xl '>
            <BadgeIndianRupee size = {50} className='fill-white text-green-700 rounded-full '/>
            <section>
                <p className='text-black tracking-tighter font-bold text-xl '>Offer Title</p>
                <p className='text-black tracking-tighter text-gray-500 font-bold'>Ends in xhs: y min: z sec</p>
            </section>
        </div>
    )
}
export default OffersCard