export interface Reservation {
  _id: string;
  userId: string;
  restaurantId: string;
  headCount: number;
  time: string;
  date: string;
  note?: string;
  status: "PLACED" | "CONFIRMED" | "RESERVED" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
}