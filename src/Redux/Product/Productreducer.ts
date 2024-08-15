import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product, ProductsState } from './initalstate';

const initialState: ProductsState = {
  products: [],
  status: 'idle',
  categoryFilter: null,
  brandFilter: null,
  priceFilter: [0, 2000]
};

export const fetchProducts = createAsyncThunk<Product[]>('products/fetchProducts', async () => {
  try {
    const response = await axios.get('https://dummyjson.com/products');
    console.log('Fetched Products:', response.data.products);
    return response.data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategoryFilter: (state, action) => {
      console.log(action,"actionactionactionaction");
      state.categoryFilter = action.payload;
      state.brandFilter = "";
      state.priceFilter = [0, 2000]
    },
    setBrandFilter(state, action: PayloadAction<string | null>) {
      state.brandFilter = action.payload;
      state.categoryFilter = "";
      state.priceFilter = [0, 2000]
    },
    setPriceRangeFilter(state, action: PayloadAction<number[]>) {
      state.priceFilter = action.payload;
      state.categoryFilter = "";
      state.brandFilter = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setCategoryFilter,setBrandFilter,setPriceRangeFilter } = productsSlice.actions;

export default productsSlice.reducer;
