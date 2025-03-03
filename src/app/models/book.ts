export interface Book {
  id: number; 
  name: string;
  author: string;
  price: number;
  rating: number;
  popularity: number;
  sale: number;
  category: string;
  description: string;
  publication: string;
  imageUrl?: string;
}