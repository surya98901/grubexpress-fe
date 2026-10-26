"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import type { itemData } from "@/types/items";

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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { cusines, categories, foodTypes } from "@/assets/utils/constants";
import { Check, IndianRupee, Plus, Users} from "lucide-react";
import useAddItemsToMenu from "@/hooks/AdminHooks/use-addItemstoMenu";
import { toast } from "sonner";

type AdminAddItemDrawProps = {
  title: string;
  imageURL: string | null;
  onItemAdd: () => void;
  id:string;
};


export type CreateItemData = Omit<
  itemData,
   "rating" | "available"
>;
const emptyForm: CreateItemData = {
  title: "",
  description: "",
  serves: 1,
  price: 0,
  category: "",
  cusine: "",
  type: "",
  foodItemId: "",
  imageURL : ""
}
const AdminAddItemDraw = ({
  title,
  imageURL,
  onItemAdd,
  id,
}: AdminAddItemDrawProps) => {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const restaurantId = useSelector(
    (state: RootState) => state.user.RestaurantId,
  );

  const isMobile = useIsMobile();
  const [formData, setFormData] = useState<itemData>({
    ...emptyForm,
     rating : 0, available : true
  });
  const addItemToMenu = useAddItemsToMenu(formData, restaurantId ?? "");

useEffect(() => {
  if (!open) return;

  setFormData({
    ...emptyForm,
    title,
    imageURL: imageURL ?? "",
    foodItemId: id,
    rating: 0,
    available: true,
  });
}, [open, title, imageURL, id]);

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

    if (!restaurantId) {
      toast.error("Please select a restaurant first.");
      return;
    }

    if (submitting) return;
    if (
      !formData.title.trim() ||
      !formData.category ||
      !formData.cusine ||
      !formData.type ||
      formData.price < 0 ||
      formData.serves < 1

    ) {
      toast.error("Please complete all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      const success = await addItemToMenu();
      if (!success) return;

      setOpen(false);
      onItemAdd();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      showSwipeHandle={isMobile}
      swipeDirection={isMobile ? "down" : "right"}
    >
      <DrawerTrigger
  render={
    <Button
      type="button"
      variant="ghost"
      className="group flex h-auto w-full flex-col gap-3 p-0 hover:bg-transparent"
      aria-label={`Add menu item starting with ${title || "a blank title"}`}
    >
      <div className="relative size-[150px] overflow-hidden rounded-full border-2 border-background shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:ring-4 group-hover:ring-green-600/30">
        {imageURL ? (
          <img
            src={imageURL}
            alt={title}
            loading="lazy"
            className="size-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="flex size-full items-center justify-center rounded-full bg-muted">
            <Plus className="size-8 text-muted-foreground" />
          </div>
        )}
      </div>

      <span className="w-full truncate text-sm font-medium text-foreground group-hover:text-green-700">
        {title || "Add New Item"}
      </span>
    </Button>
  }
/>

      <DrawerContent className="max-h-[95vh] min-w-[40vw] px-2">
        <DrawerHeader className="border-b">
          <DrawerTitle className="text-xl font-bold tracking-tight">
            {"Add Menu Item"}
          </DrawerTitle>

          <DrawerDescription>
            {
              "Add a new dish to your restaurant menu."}
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
                    required
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
                  <p className="text-right text-xs text-gray-400">
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
                    required
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
                    required
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

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {cusines.map((cuisine) => {
                    const Icon = cuisine.icon;
                    const selected = formData.cusine === cuisine.value;

                    return (
                      <button
                        type="button"
                        key={cuisine.value}
                        onClick={() => updateField("cusine", cuisine.value)}
                        className={`relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border p-4 transition ${
                          selected
                            ? "border-green-700 bg-green-50 text-green-700"
                            : "border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        {selected && (
                          <Check className="absolute right-2 top-2 size-4" />
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

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    const selected = formData.category === category.value;

                    return (
                      <button
                        type="button"
                        key={category.value}
                        onClick={() => updateField("category", category.value)}
                        className={`relative flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${
                          selected
                            ? "border-green-700 bg-green-50 text-green-700"
                            : "border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        <Icon className="size-5" />
                        <span className="text-sm font-medium">
                          {category.label}
                        </span>
                        {selected && <Check className="ml-auto size-4" />}
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
                        className={`relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border p-4 transition ${
                          selected
                            ? "border-green-700 bg-green-50 text-green-700"
                            : "border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        {selected && (
                          <Check className="absolute right-2 top-2 size-4" />
                        )}
                        <Icon className="size-6" />
                        <span className="text-center text-xs font-medium">
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
            <Button
              type="submit"
              disabled={submitting}
              className="h-10 bg-green-700"
            >
              {submitting
                ? "Saving..."
                  : "Create Item"}
            </Button>

            <DrawerClose
              render={
                <Button type="button" variant="outline" disabled={submitting}>
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

export default AdminAddItemDraw
