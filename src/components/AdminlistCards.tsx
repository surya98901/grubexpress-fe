const AdminlistCard = () => {
  return (
    <div className="flex gap-2 w-[95%] h-[10vh] bg-white text-black rounded-xl items-center px-5 justify-between">
      <div className="flex gap-3 ">
        <img src="" alt="item" className="w-[10vh]" />
        <section>
          <span>item.title</span>
          <p className="text-sm text-gray-500">hr:mins</p>
        </section>
      </div>
      <p>₹ val</p>
    </div>
  );
};
export default AdminlistCard;
