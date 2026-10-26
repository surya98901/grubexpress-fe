
import { useState } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Store,
  Utensils,
  LoaderCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldLegend,
} from "@/components/ui/field";

import TimePicker from "@/components/genericUIcomponents/pickers/TimePicker";
import { cuisineOptions, initialRestarantForm } from "@/assets/utils/constants";
import NewRestaurantAlert from "@/components/genericUIcomponents/Alerts/NewRestaurantAlert";
import useAddRestaurant from "@/hooks/AdminHooks/use-addRestaurant";


type FormData = typeof initialRestarantForm;
const steps = [
  { title: "Restaurant details", description: "Basic information", icon: Store },
  { title: "Food & location", description: "Cuisine, hours and address", icon: MapPin },
  { title: "Review & create", description: "Confirm your details", icon: Check },
];

const AdminAddRestaurant = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>({ ...initialRestarantForm });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [created, setCreated] = useState(false);

  const update = (
    key: keyof FormData,
    value: string | boolean | string[],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validateStep = () => {
    const nextErrors: Record<string, string> = {};

    if (step === 0) {
      if (!form.name.trim()) {
        nextErrors.name = "Restaurant name is required.";
      } else if (form.name.trim().length > 20) {
        nextErrors.name = "Maximum 20 characters.";
      }

      if (!form.description.trim()) {
        nextErrors.description = "Description is required.";
      } else if (form.description.trim().length > 350) {
        nextErrors.description = "Maximum 350 characters.";
      }

      if (!form.FSSAID.trim()) {
        nextErrors.FSSAID = "FSSAI ID is required.";
      }
    }

    if (step === 1) {
      if (!form.cusine.length) {
        nextErrors.cusine = "Select at least one cuisine.";
      }

      if (!form.opensAt) {
        nextErrors.opensAt = "Opening time is required.";
      }

      if (!form.closesAt) {
        nextErrors.closesAt = "Closing time is required.";
      }

      if (form.opensAt && form.closesAt && form.opensAt === form.closesAt) {
        nextErrors.closesAt = "Opening and closing times cannot be identical.";
      }

      if (!form.addressLine.trim()) {
        nextErrors.addressLine = "Address is required.";
      }

      if (!form.city.trim()) {
        nextErrors.city = "City is required.";
      }

      if (!form.state.trim()) {
        nextErrors.state = "State is required.";
      }

      if (!/^\d{6}$/.test(form.pincode)) {
        nextErrors.pincode = "Enter a valid 6-digit pincode.";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const nextStep = () => {
    if (!validateStep()) return;
    setStep((prev) => Math.min(prev + 1, 2));
  };

  const editStep = (targetStep: number) => {
    setErrors({});
    setStep(targetStep);
  };

  const postData = useAddRestaurant(form);

const createRestaurant = async () => {
  setSubmitting(true);

  try {
    const result = await postData();

    if (result.success) {
      setCreated(true);
    }
  } finally {
    setSubmitting(false);
  }
};

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
      <div className="mb-8 space-y-2">
        <Badge variant="secondary">Restaurant onboarding</Badge>
        <h1 className="text-3xl font-semibold tracking-tight">
          Set up your restaurant
        </h1>
        <p className="text-sm text-muted-foreground">
          A few details now, and you’ll be ready to add your menu.
        </p>
      </div>

      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between gap-2">
          {steps.map((item, index) => {
            const Icon = item.icon;
            const active = step === index;
            const complete = step > index;

            return (
              <div key={item.title} className="flex min-w-0 items-center gap-2">
                <div
                  className={`flex size-9 shrink-0 items-center justify-center rounded-full border ${
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : complete
                        ? "border-primary bg-primary/10 text-primary"
                        : "text-muted-foreground"
                  }`}
                >
                  {complete ? (
                    <Check className="size-4" />
                  ) : (
                    <Icon className="size-4" />
                  )}
                </div>
                <div className="hidden min-w-0 sm:block">
                  <p
                    className={`text-sm font-medium ${
                      active ? "" : "text-muted-foreground"
                    }`}
                  >
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-5 shadow-sm sm:p-8">
        {step === 0 && (
          <FieldSet>
            <FieldLegend>Restaurant details</FieldLegend>
            <FieldDescription>
              Tell customers what makes your restaurant special.
            </FieldDescription>

            <FieldGroup className="mt-5">
              <Field>
                <FieldLabel htmlFor="restaurant-name">
                  Restaurant name *
                </FieldLabel>
                <Input
                  id="restaurant-name"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Evil Rabbit"
                  maxLength={20}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name}</p>
                )}
                <FieldDescription>
                  {form.name.length}/20 characters
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="restaurant-description">
                  Description *
                </FieldLabel>
                <Textarea
                  id="restaurant-description"
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  placeholder="Describe your restaurant and the food you serve..."
                  maxLength={350}
                  rows={4}
                  aria-invalid={!!errors.description}
                />
                {errors.description && (
                  <p className="text-sm text-destructive">
                    {errors.description}
                  </p>
                )}
                <FieldDescription>
                  {form.description.length}/350 characters
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="fssai-id">
                  FSSAI license number *
                </FieldLabel>
                <Input
                  id="fssai-id"
                  value={form.FSSAID}
                  onChange={(e) => update("FSSAID", e.target.value)}
                  placeholder="Enter your FSSAI number"
                  aria-invalid={!!errors.FSSAID}
                />
                {errors.FSSAID && (
                  <p className="text-sm text-destructive">{errors.FSSAID}</p>
                )}
              </Field>
            </FieldGroup>
          </FieldSet>
        )}

        {step === 1 && (
          <FieldSet>
            <FieldLegend>Food & location</FieldLegend>
            <FieldDescription>
              Configure your cuisine, operating hours, and restaurant address.
            </FieldDescription>

            <FieldGroup className="mt-5">
              <Field>
                <FieldLabel>Cuisine *</FieldLabel>
                <div className="flex flex-wrap gap-2">
                  {cuisineOptions.map((cuisine) => {
                    const selected = form.cusine.includes(cuisine);

                    return (
                      <Button
                        key={cuisine}
                        type="button"
                        size="sm"
                        variant={selected ? "default" : "outline"}
                        onClick={() =>
                          update(
                            "cusine",
                            selected
                              ? form.cusine.filter((item) => item !== cuisine)
                              : [...form.cusine, cuisine],
                          )
                        }
                      >
                        {selected && <Check className="mr-1 size-3.5" />}
                        {cuisine}
                      </Button>
                    );
                  })}
                </div>
                {errors.cusine && (
                  <p className="text-sm text-destructive">{errors.cusine}</p>
                )}
              </Field>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-1">
                  <Label htmlFor="veg-only">
                    Pure vegetarian restaurant
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    All items served are vegetarian.
                  </p>
                </div>
                <Switch
                  id="veg-only"
                  checked={form.vegOnly}
                  onCheckedChange={(checked) => update("vegOnly", checked)}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel>Opens at *</FieldLabel>
                  <TimePicker
                    label="Select opening time"
                    value={form.opensAt}
                    onChange={(value) => update("opensAt", value)}
                  />
                  {errors.opensAt && (
                    <p className="text-sm text-destructive">{errors.opensAt}</p>
                  )}
                </Field>

                <Field>
                  <FieldLabel>Closes at *</FieldLabel>
                  <TimePicker
                    label="Select closing time"
                    value={form.closesAt}
                    onChange={(value) => update("closesAt", value)}
                  />
                  {errors.closesAt && (
                    <p className="text-sm text-destructive">
                      {errors.closesAt}
                    </p>
                  )}
                </Field>
              </div>

              <div className="border-t pt-5">
                <h3 className="mb-4 font-medium">Restaurant address</h3>

                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="address-line">
                      Address line *
                    </FieldLabel>
                    <Input
                      id="address-line"
                      value={form.addressLine}
                      onChange={(e) => update("addressLine", e.target.value)}
                      placeholder="29, Spice Route Street"
                      aria-invalid={!!errors.addressLine}
                    />
                    {errors.addressLine && (
                      <p className="text-sm text-destructive">
                        {errors.addressLine}
                      </p>
                    )}
                  </Field>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field>
                      <FieldLabel htmlFor="city">City *</FieldLabel>
                      <Input
                        id="city"
                        value={form.city}
                        onChange={(e) => update("city", e.target.value)}
                        placeholder="Hyderabad"
                        aria-invalid={!!errors.city}
                      />
                      {errors.city && (
                        <p className="text-sm text-destructive">{errors.city}</p>
                      )}
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="state">State *</FieldLabel>
                      <Input
                        id="state"
                        value={form.state}
                        onChange={(e) => update("state", e.target.value)}
                        placeholder="Telangana"
                        aria-invalid={!!errors.state}
                      />
                      {errors.state && (
                        <p className="text-sm text-destructive">{errors.state}</p>
                      )}
                    </Field>
                  </div>

                  <Field>
                    <FieldLabel htmlFor="pincode">Pincode *</FieldLabel>
                    <Input
                      id="pincode"
                      inputMode="numeric"
                      maxLength={6}
                      value={form.pincode}
                      onChange={(e) =>
                        update(
                          "pincode",
                          e.target.value.replace(/\D/g, ""),
                        )
                      }
                      placeholder="500001"
                      aria-invalid={!!errors.pincode}
                    />
                    {errors.pincode && (
                      <p className="text-sm text-destructive">
                        {errors.pincode}
                      </p>
                    )}
                  </Field>
                </FieldGroup>
              </div>
            </FieldGroup>
          </FieldSet>
        )}

        {step === 2 && (
          <FieldSet>
            <FieldLegend>Review your restaurant</FieldLegend>
            <FieldDescription>
              Check your details before creating your restaurant.
            </FieldDescription>

            <div className="mt-5 space-y-4">
              <section className="rounded-xl border p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 font-medium">
                    <Store className="size-4" />
                    Restaurant details
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editStep(0)}
                  >
                    Edit
                  </Button>
                </div>
                <h3 className="text-lg font-semibold">{form.name}</h3>
                <p className="mt-1 whitespace-pre-wrap text-sm text-muted-foreground">
                  {form.description}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  FSSAI: {form.FSSAID}
                </p>
              </section>

              <section className="rounded-xl border p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 font-medium">
                    <Utensils className="size-4" />
                    Food & location
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editStep(1)}
                  >
                    Edit
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {form.cusine.map((item) => (
                    <Badge key={item} variant="secondary">{item}</Badge>
                  ))}
                  {form.vegOnly && <Badge variant="outline">Pure Veg</Badge>}
                </div>

                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Opens at</span>
                  <span className="font-medium">{form.opensAt}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Closes at</span>
                  <span className="font-medium">{form.closesAt}</span>
                </div>

                <div className="mt-4 border-t pt-4">
                  <p className="text-sm font-medium">{form.addressLine}</p>
                  <p className="text-sm text-muted-foreground">
                    {form.city}, {form.state} — {form.pincode}
                  </p>
                </div>
              </section>
            </div>
          </FieldSet>
        )}

        <div className="mt-8 flex items-center justify-between gap-3 border-t pt-5">
          <Button
            type="button"
            variant="outline"
            disabled={step === 0 || submitting}
            onClick={() => {
              setErrors({});
              setStep((prev) => prev - 1);
            }}
          >
            <ChevronLeft className="mr-1 size-4" />
            Back
          </Button>

          {step < 2 ? (
            <Button type="button" onClick={nextStep}>
              Continue
              <ChevronRight className="ml-1 size-4" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={createRestaurant}
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <LoaderCircle className="mr-2 size-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Check className="mr-2 size-4" />
                  Create restaurant
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        Step {step + 1} of {steps.length} · Your information stays in this form
        as you move between steps.
      </p>
      <NewRestaurantAlert created = {created} setCreated={setCreated} name={form.name}/>
    </div>
  );
};

export default AdminAddRestaurant;
