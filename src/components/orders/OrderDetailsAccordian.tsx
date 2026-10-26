
interface cartItem {
 menuItemId: string;
 title: string;
 quantity: number;
}
const OrderDetailsAccordian = ({ data }: { data: cartItem}) => {
  return (
    <div
      key={data.menuItemId}
      className="flex flex-col gap-3 rounded-lg border border-gray-100 bg-gray-50/70 p-3 sm:flex-row sm:datas-center sm:justify-between sm:p-4"
    >
      <p className="break-words text-sm font-medium text-gray-800 sm:text-base">
        {data.title} <span className="text-gray-500">× {data.quantity}</span>
      </p>
      <section className="flex flex-wrap gap-2">
        {["Reorder", "Feedback", "Help"].map((data: string, index: number) => (
          <button
            key={index}
            type="button"
            className="rounded-lg border border-green-700 px-3 py-2 text-sm font-semibold text-green-700 transition-colors hover:bg-green-700 hover:text-white"
          >
            {data}
          </button>
        ))}
      </section>
    </div>
  );
};
export default OrderDetailsAccordian;
