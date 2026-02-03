export interface Recipe {
  [x: string]: string;
  title: string;
  image: string;
  ingredients: string[];
  instructions: string[];
}