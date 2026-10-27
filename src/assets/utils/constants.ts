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
  Package,
  CreditCard,
  MapPin,
  Sparkles,
  Clock3,
  Bike,
  Table2,
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
  rowValues : [ "totalAmount","createdAt", "orderStatus"],
  icon: ClipboardList,
};
export const reservationTable = {
  title: "Reservation",
  tagLine: "Manage and track reservations",
  rows: ["Name", "Table", "Head count", "Time", "Date", "Status"],
  rowValues : [ "peopleCount","createdAt", "Status"],
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
export const profileOptions = [
  {
    label: "Orders",
    icon: Package,
    description: "Track your food and past orders",
    tagline: "Your orders live here",
    DetailDescription:
      "Your delicious discoveries, current deliveries, and past orders will show up here.",
    linkTag: "Explore restaurants",
    link: "/customer/restaurants",
  },
  {
    label: "Payments",
    icon: CreditCard,
    description: "Manage your payment methods",
    tagline: "Payment methods",
    DetailDescription:
      "Your saved payment methods will appear here.",
    linkTag: " Add payments",
  },
  {
    label: "Addresses",
    icon: MapPin,
    description: "Your saved delivery locations",
    tagline: "Delivery addresses",
    DetailDescription:
      "Manage your home, work, and other delivery addresses.",
    linkTag: " Add new address",
  },
  {
    label: "Settings",
    icon: Settings,
    description: "Preferences and account security",
    tagline: "Account preferences",
    DetailDescription:
      "Your account preferences and security options will appear here.",
  },
];
export const orderStatuses = [
  {
    name: "New",
    value: 0,
    icon: Sparkles,
    bg: "bg-blue-50",
    border: "border-blue-100",
    iconBg: "bg-blue-600",
  },
  {
    name: "Preparation",
    value: 0,
    icon: Clock3,
    bg: "bg-orange-50",
    border: "border-orange-100",
    iconBg: "bg-orange-500",
  },
  {
    name: "Out for Delivery",
    value: 0,
    icon: Bike,
    bg: "bg-purple-50",
    border: "border-purple-100",
    iconBg: "bg-purple-600",
  },
];

export const dineInStatuses = [
  {
    name: "New",
    value: 0,
    icon: Sparkles,
    bg: "bg-blue-50",
    border: "border-blue-100",
    iconBg: "bg-blue-600",
  },
  {
    name: "Reserved",
    value: 0,
    icon: CalendarCheck,
    bg: "bg-orange-50",
    border: "border-orange-100",
    iconBg: "bg-orange-500",
  },
  {
    name: "Available",
    value: 0,
    icon: Table2,
    bg: "bg-green-50",
    border: "border-green-100",
    iconBg: "bg-green-600",
  },
];

export const orderList = [
  {
    image: "...",
    title: "Chicken Biryani",
    time: "12 mins",
    value: "₹240",
  },
  {
    image: "...",
    title: "Paneer Butter Masala",
    time: "18 mins",
    value: "₹180",
  },
];

export const reservationList = [
  {
    image: "...",
    title: "Table 12",
    time: "7:30 PM",
    value: "4 guests",
  },
  {
    image: "...",
    title: "Table 4",
    time: "8:00 PM",
    value: "2 guests",
  },
];
export const cuisineOptions = [
  "South Indian",
  "North Indian",
  "Chinese",
  "Italian",
  "Continental",
  "Biryani",
  "Fast Food",
  "Desserts",
  "Cafe",
  "Other",
];

export const initialRestarantForm = {
  name: "",
  description: "",
  cusine: [] as string[],
  FSSAID: "",
  vegOnly: false,
  opensAt: "09:00",
  closesAt: "22:00",
  addressLine: "",
  city: "",
  state: "",
  pincode: "",
};
 export const activeOrderStatuses = [
  "PLACED",
    "CONFIRMED",
    "PREPARING",
    "READY",
    "OUT_FOR_DELIVERY",
  ];
