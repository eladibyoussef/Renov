import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/api';

export interface Product {
  name: string;
  description: string;
  price: number;
  category: string;
  availability: boolean;
  rentable?: boolean;
  photos: string[];
  deliveryFees: number;
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData: Product, thunkAPI) => {
      try {
          // const uploadPromises = productData.photos.map(async (photo: string) => {
          //     const cloudinaryResponse = await axios.post('/upload', { file: photo });
          //     console.log(cloudinaryResponse.data);
              
          //     return cloudinaryResponse.data.url;
          // });

          // const imageUrls = await Promise.all(uploadPromises);
            
          // const modifiedProductData = { ...productData, photos: imageUrls };
          

          const response = await axios.post('/products', productData);
          console.log('server response', response.data);

          return response.data;
      } catch (error) {
          return thunkAPI.rejectWithValue(error);
      }
  }
);

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('/products'); 
  console.log(response.data);

  return response.data;
});

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // Assuming the backend returns the created product
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create product.';
      });
  },
});

export default productSlice.reducer;

export const selectAllProducts = (state: { product: ProductState }) => state.product.products;
export const selectProductLoading = (state: { product: ProductState }) => state.product.loading;
export const selectProductError = (state: { product: ProductState }) => state.product.error;
