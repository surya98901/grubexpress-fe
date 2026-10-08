import {
  ClipboardList,
  Utensils,
  Beef,
  Egg,
  Leaf,
  Soup,
  Pizza,
  Salad,
  Sandwich,
  Cake,
  Drumstick,
    LayoutDashboard,
  LayoutGrid,
  SquareText,
  CalendarCheck,
  Settings,
} from "lucide-react";
import type { PaymentMethod } from "@/types/payment";

export const citiesList = [
  "Hyderabad",
  "Mumbai",
  "Bengaluru",
  "Chennai",
  "Delhi",
];
export const homeCardData = [
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
  tagLine: "Manage and track customer orders",
  rows: ["Items", "Quantity", "Price", "Date", "Status"],
  icon: ClipboardList,
};
export const reservationTable = {
  title: "Reservation",
  tagLine: "Manage and track reservations",
  rows: ["Name", "Table", "Head count", "Time", "Date", "Status"],
  icon: Utensils,
};
export const paymentMethods: PaymentMethod[] = [
  { id: "upi", type: "UPI", label: "Pay using UPI" },
  { id: "card", type: "CARD", label: "Credit / Debit Card" },
  { id: "netbanking", type: "NET_BANKING", label: "Net Banking" },
  { id: "cod", type: "COD", label: "Cash on Delivery" },
];

export const cusines = [
  { value: "indian", label: "Indian", icon: Utensils },
  { value: "south-indian", label: "South Indian", icon: Soup },
  { value: "italian", label: "Italian", icon: Pizza },
  { value: "asian", label: "Asian", icon: Salad },
  { value: "american", label: "American", icon: Sandwich },
];

export const categories = [
  { value: "starter", label: "Starter", icon: Salad },
  { value: "main-course", label: "Main Course", icon: Utensils },
  { value: "snacks", label: "Snacks", icon: Sandwich },
  { value: "dessert", label: "Dessert", icon: Cake },
  { value: "biryani", label: "Biryani", icon: Drumstick },
];

export const foodTypes = [
  {
    value: "veg",
    label: "Vegetarian",
    icon: Leaf,
  },
  {
    value: "has-egg",
    label: "Contains Egg",
    icon: Egg,
  },
  {
    value: "non-veg",
    label: "Non-Vegetarian",
    icon: Beef,
  },
];
export const menuItems = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Reservations",
    path: "/admin/services?type=reservation",
    icon: CalendarCheck,
  },
  {
    label: "Orders",
    path: "/admin/services?type=orders",
    icon: SquareText,
  },
  {
    label: "Menu",
    path: "/admin/menu",
    icon: LayoutGrid,
  },
  {
    label: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];
export const cityStateMap: Record<string, string> = {
  Hyderabad: "Telangana",
  Bangalore: "Karnataka",
  Chennai: "Tamil Nadu",
  Mumbai: "Maharashtra",
  Delhi: "Delhi",
};