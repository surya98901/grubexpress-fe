import { activeOrderStatuses } from "@/assets/utils/constants";
import { motion } from "framer-motion";

const OrderTag = ({ status }: { status: string }) => {


  const isActive = activeOrderStatuses.includes(status);

  const style =
    status === "PLACED"
      ? "bg-green-50 text-green-700"
      : status === "CANCELLED"
        ? "bg-red-50 text-red-600"
        : "bg-green-100 text-yellow-700";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${style}`}
    >
      {status}

      {isActive && (
        <motion.span
          className="h-2 w-2 rounded-full bg-current"
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </span>
  );
};

export default OrderTag;