
import { motion } from "framer-motion";
interface SlideButtonTypes{
    style : string, 
    options: string[],
    actions : (option: string) => void,
    val : string,
}
const SlideButton = ({style, options , actions, val}: SlideButtonTypes )=>{
return (
    <div className={style + "flex w-fit items-center rounded-full bg-black border-2 border-gray-700 p-1"}>
        {options.map(item => (
            <button key= {item} className= {`relative p-1 px-4 rounded-xl ${val === item ? "text-white" : "text-gray-600"} `} onClick={()=>actions(item)}>
                {val === item && <motion.span layoutId="Role-indicator"
                className="absolute inset-0 rounded-full bg-green-700 "
                transition={{type:"spring",stiffness: 400, damping:30}}/>}
                <span className="relative z-10">{item}</span>
            </button>
        ))}
    </div>
)
}
export default SlideButton