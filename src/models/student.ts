export interface Student {
  id?: string;
  name: string;      
  age?: number;      
  mark: number;      
  gender: 'male' | 'female';       
  city: string;      
  createdAt?: number;      
  updateAt?: number;
  data?: Student      
}