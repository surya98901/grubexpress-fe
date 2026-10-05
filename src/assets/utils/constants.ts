import { ClipboardList, Utensils } from "lucide-react";
export const citiesList = [
    "Hyderabad",
    "Mumbai",
    "Bengaluru",
    "Chennai",
    "Delhi",
  ];
  export  const homeCardData = [
    {
      title: "Food Delivery",
      tagline: "from your favorite restaurants",
      content: "Upto x% off on your first order",
      val: "food-delivery",
    },
    {
      title: "Dine Out",
      tagline: "Eat out & Save More",
      content: "Upto y% off on your first order",
      val: "dine-out",
    },
  ];
export const orderTable = {
  title: "Order",
  tagLine : "Manage and track customer orders",
  rows : ["Items", "Quantity", "Price", "Date", "Status"],
  icon : ClipboardList,
}
export const reservationTable = {
  title: "Reservation",
  tagLine : "Manage and track reservations",
  rows : ["Name","Table", "Head count", "Time", "Date", "Status"],
  icon : Utensils ,
}
