export interface Restaurant {
  _id: string;
  Name: string;
  Description: string;
  Cusine: string[];
  rating: number;
  FSSAIID: string;
  Active: boolean;
  AdminId: string;
}