export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  sizes: string[];
  colors: string[];
  rating: number;
  reviews: number;
  images: string[];
  video?: string;
  featured: boolean;
  new_arrival: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface CheckoutData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: string;
}
