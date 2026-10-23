import useGetFoodItems from "@/hooks/use-getFooditems";

import { motion } from "framer-motion";

import AdminAddItemDraw from "@/components/admin/AdminAddItemDraw";

const AdminAddItem = () => {
  const { items, loading, error, refetch } = useGetFoodItems();
  const customItem = { title: "", imageURL: null };
  const itemslist = [...items, customItem];
  const handleItemAdd = () => {
    refetch();
  };

  return (
    <section className="w-full space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Items</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Select a food item to start with its title, or add one from scratch.
          </p>
        </div>
      </div>

      {loading ? (
        <p className="py-10 text-center text-muted-foreground">
          Loading food items...
        </p>
      ) : error ? (
        <p className="py-10 text-center text-destructive">
          Failed to load food items.
        </p>
      ) : (
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-start justify-center gap-6 px-4 py-6 sm:px-6 lg:px-10">
          {itemslist.map((item: any) => (
            <motion.div
              key={item._id ?? "custom-item"}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group w-[150px] shrink-0"
            >
              <AdminAddItemDraw
                title={item.title}
                imageURL={item.ImageURL || null}
                onItemAdd={handleItemAdd}
                id = {item._id}
              />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AdminAddItem;
