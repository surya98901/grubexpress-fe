

interface SlideButtonTypes{
    style : string, 
    options: string[],
    actions : (option: string) => void,
    val : string,
}
const SlideButton = ({style, options , actions, val}: SlideButtonTypes )=>{
return (
    <div className={style + "bg-black text-white  p-2 w-[60%] flex justify-between items-center rounded-xl"}>
        {options.map(item => (
            <button className= {val === item ? "bg-green-700 text-white p-1 px-4  rounded-xl " : " p-1 px-4 rounded-xl"} onClick={()=>actions(item)}>
                {item}
            </button>
        ))}
    </div>
)
}
export default SlideButton