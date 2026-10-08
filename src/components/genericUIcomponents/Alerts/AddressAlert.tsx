import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Address } from "@/types/address";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { setUserAddress } from "@/services/userApi";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

const labels = ["Home", "Work", "Other", "Restaurant"];

const cityStateMap: Record<string, string> = {
  Hyderabad: "Telangana",
  Bangalore: "Karnataka",
  Chennai: "Tamil Nadu",
  Mumbai: "Maharashtra",
  Delhi: "Delhi",
};

const AddressAlert = () => {
  const city = useSelector((state: RootState) => state.location.city);

  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState<Address>({
    addressLine: "",
    city: city || "",
    state: cityStateMap[city] || "",
    pincode: "",
    label: "Home",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      city: city || "",
      state: cityStateMap[city] || "",
    }));
  }, [city]);

  const updateField = <K extends keyof Address>(
    field: K,
    value: Address[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log("Submitting address:", formData);

      const result = await setUserAddress(formData);

      console.log("Address saved:", result);

      setOpen(false);

      setFormData({
        addressLine: "",
        city: city || "",
        state: cityStateMap[city] || "",
        pincode: "",
        label: "Home",
      });
    } catch (err) {
      console.error("Failed to save address:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="outline"
            className="bg-green-700 text-white font-bold p-1 px-2 rounded-xl"
          >
            Add Address
          </Button>
        }
      />

      <DialogContent className="sm:max-w-sm">
        <form id="address-form" onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add address</DialogTitle>

            <DialogDescription>
              Add a new address here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Field>
              <Label htmlFor="addressLine">Address line</Label>

              <Input
                id="addressLine"
                name="addressLine"
                value={formData.addressLine}
                onChange={(e) =>
                  updateField("addressLine", e.target.value)
                }
                placeholder="Enter your address"
                required
              />
            </Field>

            <Field>
              <Label htmlFor="city">City</Label>

              <Input
                id="city"
                name="city"
                value={formData.city}
                readOnly
                className="bg-gray-100"
              />
            </Field>

            <Field>
              <Label htmlFor="state">State</Label>

              <Input
                id="state"
                name="state"
                value={formData.state}
                readOnly
                className="bg-gray-100"
              />
            </Field>

            <Field>
              <Label htmlFor="pincode">Pincode</Label>

              <Input
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={(e) =>
                  updateField("pincode", e.target.value)
                }
                placeholder="Enter pincode"
                maxLength={6}
                required
              />
            </Field>

            <Field>
              <Label>Label</Label>

              <section className="flex gap-2">
                {labels.map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => updateField("label", item)}
                    className={`border border-green-700 rounded-xl p-1 px-2 cursor-pointer ${
                      item === formData.label
                        ? "bg-green-700 text-white"
                        : ""
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </section>
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose
              render={
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              }
            />

            <Button type="submit">
              Save address
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddressAlert;