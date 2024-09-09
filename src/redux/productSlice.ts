import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface Product {
  id: string;
  userId: string;
  name: string;
  quantity: number;
  price: number;
  expiryDate: string;
  image: string;
}

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    editProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex((product) => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((product) => product.id !== action.payload);
    },
  },
});

export const { addProduct, editProduct, deleteProduct } = productSlice.actions;
export const selectProductsByUser = (state: RootState, userId: string) =>
  state.products.products.filter((product) => product.userId === userId);
export default productSlice.reducer;