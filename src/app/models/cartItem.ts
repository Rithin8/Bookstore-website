import { Book } from './book';

export interface CartItem {
  id: number;
  userId: number;
  book: Book;
  quantity: number;
}