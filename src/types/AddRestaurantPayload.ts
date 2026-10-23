export type AddRestaurantPayload = {
  name: string;
  description: string;
  FSSAID: string;
  addressLine: string;
  city: string;
  state: string;
  address: {
    label: string;
    addressLine: string;
    city: string;
    state: string;
    pincode: string;
  };
};