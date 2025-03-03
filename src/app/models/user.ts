export interface User {
  id?: number;  
  username: string;
  email: string;
  phone: string;
  password?: string; 
  role: 'admin' | 'user' | 'manager';
  status: 'active' | 'suspended';
}
