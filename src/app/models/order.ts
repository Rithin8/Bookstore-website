export interface Order {
  orderId: string;
  userId: number;
  orderDate: string; 
  items: OrderItem[];
  shippingAddress: string;
  status?: string;
  totalAmount?: number;
  book_name?: string;  
  delivery_date?: string; 
}

export interface OrderItem {
  product: {
    id: number;
    name: string;
  };
  quantity: number;
  unitPrice: number;
  subtotal: number;
}
