export interface PaymentDetails {
  _id: string;
  orderId: string;
  userId: string;
  amount: number;
  paymentStatus: "PENDING" | "PAID" | "FAILED" | "EXPIRED" | "REFUNDED";
  expiresAt: string;
  paidAt?: string;
  paymentProvider?: string;
}
export type PaymentMethod = {
  id: string;
  type: string;
  label: string;
};