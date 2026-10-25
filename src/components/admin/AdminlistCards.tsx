import { formatDate } from "@/assets/utils/helpers";

const AdminlistCard = ({ list }: { list: any }) => {
  console.log(list);
  return (
    <div className="group flex w-full items-center gap-4 rounded-2xl bg-white p-4 text-gray-900 shadow-sm transition-all duration-300  hover:shadow-md">
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-100 ring-1 ring-black/5">
        <img
          src={list.imageURL}
          alt={list.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <section className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex justify-between">
          <div>
            <p className="text-sm w-[100px] font-semibold tracking-tight text-gray-900">
              <span className="turncat">{list.title}</span> {" x"+ list.quantity}
            </p>
            <p className="text-xs text-gray-400">
              Added {formatDate(list.createdAt)}
            </p>
          </div>
          <span className=" font-bold tracking-tight text-gray-900">
            ₹{list.subTotal}
          </span>
        </div>

      </section>
    </div>
  );
};

export default AdminlistCard;
