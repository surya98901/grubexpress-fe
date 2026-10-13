

const AdminlistCard = ({ list }: { list : any} ) => {
  return (
    <div className="flex gap-2 w-[100%] h-[15vh] bg-white text-black rounded-xl items-center px-5 justify-between">
      <div className="flex  ">
        <img src={list.imageURL} alt="item" className="w-[10vh] h-[10vh] rounded-full" />
        <section>
          <span className="text-sm">{list.title}</span>
          <p className="text-sm text-gray-500"> {list.createdAt}</p>
        </section>
      </div>
      <p>{list.value}</p>
    </div>
  );
};
export default AdminlistCard;
