export interface MenuItem {
  _id: string;
  name: string;
  description: string;
  imageURL: string;
  cusine: string[];
  serves:number;
  rating: number;
  price: number;
  category: boolean;
  type: string;
  available:boolean;
}