export interface OrderDetails {
  _id: string;
  userId: string;
  restaurantId: string;

  items: {
    menuItemId: string;
    title: string;
    quantity: number;
  }[];

  subTotal: number;
  tax: number;
  deliveryFee: number;
  discount: number;
  totalAmount: number;

  orderStatus:
    | "PLACED"
    | "CONFIRMED"
    | "PREPARING"
    | "READY"
    | "OUT_FOR_DELIVERY"
    | "DELIVERED"
    | "CANCELLED";

  paymentStatus:
    | "PENDING"
    | "PAID"
    | "FAILED"
    | "REFUNDED";

  createdAt?: string;
  updatedAt?: string;
}