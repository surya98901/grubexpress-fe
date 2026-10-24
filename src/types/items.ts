export interface FoodItems {
  _id: string;
  title: string;
  ImageURL: string;
}
export interface itemData {
  title: string;
  description: string;
  imageURL : string;
  serves: number;
  price: number;
  cusine: string;
  category: string;
  rating : number;
  type: string;
  available : boolean;
  foodItemId :string;
}
export interface editItemData {
  title: string;
  description: string;
  serves: number;
  price: number;
  cusine: string;
  category: string;
  type: string;
}