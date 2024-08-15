// src/Redux/Product/initialState.ts
export interface Product {
    brand: any;
    category: string;
    title: string;
    id: number;
    name: string;
    price: number;
    reviews?: {
      rating: number;
      comment: string;
      date: string;
      reviewerName: string;
      reviewerEmail: string;
    }[];
  }
  
  export interface ProductsState {
    products: Product[];
    status: 'idle' | 'loading' | 'failed';
    categoryFilter: string | null;
    brandFilter: string | null;
    priceFilter: number | number[];
  }
  
  export const initialState: ProductsState = {
    products: [],
    status: 'idle',
    categoryFilter: null,
    brandFilter: null,
    priceFilter:0 
  };
  