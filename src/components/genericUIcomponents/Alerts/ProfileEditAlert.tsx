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
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cityStateMap } from "@/assets/utils/constants";
import type { Address } from "@/types/address";
import { setUserAddress } from "@/services/userApi";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import {
  Check,
  ChevronDown,
  ChevronUp,
  MapPin,
  PencilLine,
  Phone,
  UserRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { profileEdit } from "@/types/AuthFormData";
import useEditProfile from "@/hooks/use-editProfile";

type AddressFormData = Omit<Address, "_id">;
const labels = ["Home", "Work", "Other", "Restaurant"];

const ProfileEditAlert = () => {
  const city = useSelector((state: RootState) => state.location.city);
  const [open, setOpen] = useState(false);
  const [addressOpen, setAddressOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [profileData, setProfileData] = useState<profileEdit>({
    firstName: "",
    lastName: "",
    userName: "",
    phone: "",
  });

  const [formData, setFormData] = useState<AddressFormData>({
    addressLine: "",
    city: city || "",
    state: cityStateMap[city] || "",
    pincode: "",
    label: "Home",
  });
  const editProfile = useEditProfile(profileData, "customer");

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      city: city || "",
      state: cityStateMap[city] || "",
    }));
  }, [city]);

  const updateProfile = (field: keyof typeof profileData, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const updateField = <K extends keyof AddressFormData>(
    field: K,
    value: AddressFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSaving(true);
    setErrorMessage("");

    try {
      if (addressOpen) {
        await setUserAddress(formData);

        setFormData({
          addressLine: "",
          city: city || "",
          state: cityStateMap[city] || "",
          pincode: "",
          label: "Home",
        });

        setAddressOpen(false);
      } else {
        const result = await editProfile();
        if (!result.success) {
          setErrorMessage(result.error || "Unable to update profile");
          return;
        }

        setOpen(false);
      }
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "h-11 rounded-xl border-gray-200 bg-gray-50/70 transition-colors focus-visible:border-green-600 focus-visible:bg-white focus-visible:ring-green-600/20";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="outline"
            className="group hidden h-10 items-center gap-2 rounded-xl border-green-800/20 bg-white px-4 text-sm font-semibold text-green-900 shadow-sm transition-all hover:border-green-700 hover:bg-green-50 sm:flex"
          >
            <PencilLine
              size={16}
              className="transition-transform group-hover:rotate-[-8deg]"
            />
            Edit profile
          </Button>
        }
      />

      <DialogContent className="max-h-[88dvh] overflow-y-auto border-0 bg-white p-0 shadow-2xl sm:max-w-lg sm:rounded-3xl hide-scrollbar">
        <div className="relative overflow-hidden bg-gradient-to-br from-green-950 via-green-900 to-emerald-800 px-6 pb-7 pt-7 text-white sm:px-8">
          <div className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full border border-white/10 bg-white/[0.04]" />
          <div className="pointer-events-none absolute -bottom-20 right-16 h-36 w-36 rounded-full border border-white/10" />

          <DialogHeader className="relative text-left">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-inner">
              <UserRound size={24} strokeWidth={1.7} />
            </div>

            <DialogTitle className="text-2xl font-bold tracking-tight text-white">
              Your profile
            </DialogTitle>

            <DialogDescription className="mt-2 max-w-xs text-sm leading-6 text-green-100/80">
              Keep your details up to date for a smoother GrubExpress
              experience.
            </DialogDescription>
          </DialogHeader>

          <div className="relative mt-6 flex items-center gap-2 text-xs font-medium text-green-100/90">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
              <Check size={13} />
            </span>
            Your account, your details
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-green-800">
                <UserRound size={17} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">
                  Personal information
                </h3>
                <p className="text-xs text-gray-500">The basics about you</p>
              </div>
            </div>

            <FieldGroup className="gap-4">
              <div className="grid grid-cols-2 gap-3">
                <Field>
                  <Label htmlFor="firstName" className="text-gray-700">
                    First name
                  </Label>
                  <Input
                    id="firstName"
                    autoComplete="given-name"
                    className={inputClass}
                    placeholder="First name"
                    value={profileData.firstName}
                    onChange={(e) => updateProfile("firstName", e.target.value)}
                  />
                </Field>

                <Field>
                  <Label htmlFor="lastName" className="text-gray-700">
                    Last name
                  </Label>
                  <Input
                    id="lastName"
                    autoComplete="family-name"
                    className={inputClass}
                    placeholder="Last name"
                    value={profileData.lastName}
                    onChange={(e) => updateProfile("lastName", e.target.value)}
                  />
                </Field>
              </div>

              <Field>
                <Label htmlFor="userName" className="text-gray-700">
                  Username
                </Label>
                <Input
                  id="userName"
                  autoComplete="username"
                  className={inputClass}
                  placeholder="Choose a username"
                  value={profileData.userName}
                  onChange={(e) => updateProfile("userName", e.target.value)}
                />
              </Field>

              <Field>
                <Label htmlFor="phone" className="text-gray-700">
                  Phone number
                </Label>
                <div className="relative">
                  <Phone
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <Input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    className={`${inputClass} pl-9`}
                    placeholder="Enter phone number"
                    value={profileData.phone}
                    onChange={(e) => updateProfile("phone", e.target.value)}
                  />
                </div>
              </Field>
            </FieldGroup>
          </section>

          <div className="h-px bg-gray-100" />

          <section className="space-y-4">
            <button
              type="button"
              onClick={() => setAddressOpen((prev) => !prev)}
              aria-expanded={addressOpen}
              className="flex w-full items-center justify-between rounded-2xl border border-gray-200 bg-gray-50/70 p-4 text-left transition-colors hover:border-green-200 hover:bg-green-50/50"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-green-800 shadow-sm ring-1 ring-gray-100">
                  <MapPin size={19} />
                </span>
                <span>
                  <span className="block text-sm font-bold text-gray-900">
                    Delivery address
                  </span>
                  <span className="mt-1 block text-xs text-gray-500">
                    {addressOpen
                      ? "Add your delivery details"
                      : "Add a new saved address"}
                  </span>
                </span>
              </span>

              <span className="text-gray-500">
                {addressOpen ? (
                  <ChevronUp size={19} />
                ) : (
                  <ChevronDown size={19} />
                )}
              </span>
            </button>

            {addressOpen && (
              <div className="animate-in slide-in-from-top-2 space-y-4 duration-200">
                <Field>
                  <Label htmlFor="addressLine">Address line</Label>
                  <Input
                    id="addressLine"
                    autoComplete="street-address"
                    className={inputClass}
                    placeholder="House number, street, locality"
                    value={formData.addressLine}
                    onChange={(e) => updateField("addressLine", e.target.value)}
                    required
                  />
                </Field>

                <div className="grid grid-cols-2 gap-3">
                  <Field>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      className={inputClass}
                      value={formData.city}
                      readOnly
                    />
                  </Field>

                  <Field>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      className={inputClass}
                      value={formData.state}
                      readOnly
                    />
                  </Field>
                </div>

                <Field>
                  <Label htmlFor="pincode">PIN code</Label>
                  <Input
                    id="pincode"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    pattern="[0-9]{6}"
                    className={inputClass}
                    placeholder="6-digit PIN code"
                    value={formData.pincode}
                    onChange={(e) =>
                      updateField(
                        "pincode",
                        e.target.value.replace(/\D/g, "").slice(0, 6),
                      )
                    }
                    required
                  />
                </Field>

                <Field>
                  <Label>Save this address as</Label>
                  <div className="flex flex-wrap gap-2">
                    {labels.map((item) => {
                      const selected = formData.label === item;

                      return (
                        <button
                          type="button"
                          key={item}
                          aria-pressed={selected}
                          onClick={() => updateField("label", item)}
                          className={`rounded-xl border px-3 py-2 text-xs font-semibold transition-all duration-150 ${
                            selected
                              ? "border-green-800 bg-green-800 text-white shadow-sm"
                              : "border-gray-200 bg-white text-gray-600 hover:border-green-300 hover:bg-green-50 hover:text-green-900"
                          }`}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </Field>
              </div>
            )}
          </section>

          <DialogFooter className="gap-2 border-t border-gray-100 pt-5 sm:gap-2">
            {errorMessage && <p>{errorMessage}</p>}
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 rounded-xl border-gray-200 px-5"
                >
                  Cancel
                </Button>
              }
            />

            <Button
              type="submit"
              disabled={saving}
              className="h-11 flex-1 rounded-xl bg-green-800 px-5 font-semibold text-white shadow-md shadow-green-900/10 transition hover:bg-green-900 sm:flex-none"
            >
              {saving
                ? "Saving..."
                : addressOpen
                  ? "Save address"
                  : "Save profile"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditAlert;
