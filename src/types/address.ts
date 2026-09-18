export interface Address {
  _id?: string;
  label: "Home" | "Work" | "Other" | "Restaurent";
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  latitude?: number;
  longitude?: number;
  isDefault?: boolean;
}