import type { Address } from "./address";
export interface Restaurant {
  _id: string;
  Name: string;
  Description: string;
  imageURL: string;
  address: Address;
  Cusine: string[];
  rating: number;
  status: "open" | "close";
  FSSAIID: string;
  vegOnly: boolean;
  Active: boolean;
  avgPriceforTwo: number;
  closesAt: string;
  offers: string[];
  popular: boolean;
  AdminId: string;
  createdAt: string;
  updatedAt: string;
}