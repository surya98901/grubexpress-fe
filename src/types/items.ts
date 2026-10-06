export interface FoodItems {
  _id: string;
  title: string;
  ImageURL: string;
}
export interface itemData {
  title: string;
  description: string;
  serves: number;
  price: number;
  cusine: string;
  category: string;
  type: string;
  available?: boolean;
}