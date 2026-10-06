"use client";

import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { cusines, categories, foodTypes } from "@/assets/utils/constants";
import { Check, IndianRupee, Users } from "lucide-react";
import type { itemData } from "@/types/items";
import type { menuItems } from "@/types/menuItem";
import useEditItemDetails from "@/hooks/use-editItemDetails";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

const ItemEditDraw = ({
  data,
  onItemUpdated,
}: {
  data: menuItems;
  onItemUpdated: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const restaurantId = useSelector(
    (state: RootState) => state.user.RestaurantId,
  );
  const [formData, setFormData] = useState<itemData>({
    title: "",
    description: "",
    serves: 0,
    price: 0,
    category: "",
    cusine: "",
    type: "",
  });
  const isMobile = useIsMobile();
  if (!restaurantId) {
    return;
  }
  const editItemDetails = useEditItemDetails(restaurantId, data._id, formData);
  useEffect(() => {
    if (open) {
      setFormData({
        title: data.title,
        description: data.description,
        serves: data.serves,
        price: data.price,
        category: data.category,
        cusine: data.cusine,
        type: data.type,
      });
    }
  }, [open, data]);
  const updateField = <K extends keyof itemData>(
    field: K,
    value: itemData[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await editItemDetails();

    if (result) {
      console.log(result);
      return;
    }

    setOpen(false);
    onItemUpdated();
  };

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      showSwipeHandle={isMobile}
      swipeDirection={isMobile ? "down" : "right"}
    >
      <DrawerTrigger render={<Button variant="secondary">Edit</Button>} />

      <DrawerContent className="max-h-[95vh] min-w-[40vw] px-2">
        <DrawerHeader className="border-b">
          <DrawerTitle className="text-xl font-bold tracking-tight">
            Edit Menu Item
          </DrawerTitle>

          <DrawerDescription>
            Update the details, pricing and food preferences.
          </DrawerDescription>
        </DrawerHeader>

        <form onSubmit={handleSubmit} className="overflow-y-auto">
          <FieldSet className="p-6">
            <FieldGroup className="space-y-6">
              <section className="space-y-4">
                <div>
                  <h3 className="font-semibold">Basic information</h3>
                  <p className="text-sm text-gray-500">
                    Keep the item details clear and descriptive.
                  </p>
                </div>

                <Field className="space-y-1.5">
                  <FieldLabel htmlFor="title">Title</FieldLabel>

                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={(e) => updateField("title", e.target.value)}
                    placeholder="Chicken Biryani"
                  />
                </Field>

                <Field className="space-y-1.5">
                  <FieldLabel htmlFor="description">Description</FieldLabel>

                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    placeholder="Describe the dish..."
                    className="min-h-[110px] resize-none"
                    maxLength={350}
                  />

                  <p className="text-xs text-gray-400 text-right">
                    {formData.description.length}/350
                  </p>
                </Field>
              </section>

              <section className="grid grid-cols-2 gap-4">
                <Field className="space-y-1.5">
                  <FieldLabel htmlFor="serves">
                    <Users className="size-4" />
                    Serves
                  </FieldLabel>

                  <Input
                    id="serves"
                    name="serves"
                    type="number"
                    min={1}
                    value={formData.serves}
                    onChange={(e) =>
                      updateField("serves", Number(e.target.value))
                    }
                  />
                </Field>

                <Field className="space-y-1.5">
                  <FieldLabel htmlFor="price">
                    <IndianRupee className="size-4" />
                    Price
                  </FieldLabel>

                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min={0}
                    value={formData.price}
                    onChange={(e) =>
                      updateField("price", Number(e.target.value))
                    }
                  />
                </Field>
              </section>

              <section className="space-y-3">
                <div>
                  <h3 className="font-semibold">Cuisine</h3>
                  <p className="text-sm text-gray-500">
                    What kind of food is this?
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {cusines.map((cuisine) => {
                    const Icon = cuisine.icon;
                    const selected = formData.cusine === cuisine.value;

                    return (
                      <button
                        type="button"
                        key={cuisine.value}
                        onClick={() => updateField("cusine", cuisine.value)}
                        className={`relative flex flex-col items-center justify-center gap-2 rounded-xl border p-4 transition cursor-pointer ${
                          selected
                            ? "border-green-700 bg-green-50 text-green-700"
                            : "border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        {selected && (
                          <span className="absolute top-2 right-2">
                            <Check className="size-4" />
                          </span>
                        )}

                        <Icon className="size-6" />
                        <span className="text-sm font-medium">
                          {cuisine.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className="space-y-3">
                <div>
                  <h3 className="font-semibold">Category</h3>
                  <p className="text-sm text-gray-500">
                    Where does this item belong?
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    const selected = formData.category === category.value;

                    return (
                      <button
                        type="button"
                        key={category.value}
                        onClick={() => updateField("category", category.value)}
                        className={`relative flex items-center gap-3 rounded-xl border p-3 transition cursor-pointer ${
                          selected
                            ? "border-green-700 bg-green-50 text-green-700"
                            : "border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        <Icon className="size-5" />

                        <span className="text-sm font-medium">
                          {category.label}
                        </span>

                        {selected && <Check className="size-4 ml-auto" />}
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className="space-y-3">
                <div>
                  <h3 className="font-semibold">Food type</h3>
                  <p className="text-sm text-gray-500">
                    Select the dietary classification.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {foodTypes.map((type) => {
                    const Icon = type.icon;
                    const selected = formData.type === type.value;

                    return (
                      <button
                        type="button"
                        key={type.value}
                        onClick={() => updateField("type", type.value)}
                        className={`relative flex flex-col items-center justify-center gap-2 rounded-xl border p-4 transition cursor-pointer ${
                          selected
                            ? "border-green-700 bg-green-50 text-green-700"
                            : "border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        {selected && (
                          <Check className="absolute top-2 right-2 size-4" />
                        )}

                        <Icon className="size-6" />

                        <span className="text-xs font-medium text-center">
                          {type.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>
            </FieldGroup>
          </FieldSet>

          <DrawerFooter className="border-t bg-white">
            <Button type="submit" className="h-10 bg-green-700">
              Save Changes
            </Button>

            <DrawerClose
              render={
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              }
            />
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default ItemEditDraw;
