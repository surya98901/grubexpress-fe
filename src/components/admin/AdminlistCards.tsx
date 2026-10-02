
interface List {
    image: "...",
    title: "Chicken Biryani",
    time: "12 mins",
    value: "₹240",
  }

const AdminlistCard = ({ list }: { list : any} ) => {
  return (
    <div className="flex gap-2 w-[100%] h-[10vh] bg-white text-black rounded-xl items-center px-5 justify-between">
      <div className="flex  ">
        <img src="" alt="item" className="w-[10vh]" />
        <section>
          <span className="text-sm">{list.title}</span>
          <p className="text-sm text-gray-500"> {list.time}</p>
        </section>
      </div>
      <p>{list.value}</p>
    </div>
  );
};
export default AdminlistCard;
