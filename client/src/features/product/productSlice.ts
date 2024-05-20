import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/api';

export interface Product {
  name: string;
  description: string;
  price: number;
  category: string;
  availability: boolean;
  rentable?: boolean;
  photos: photo[];
  deliveryFees: number;
  _id:string
}

interface photo {
  url: string;
  cloudinaryId: string;
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
export const deleteFile = createAsyncThunk(
  'products/deleteFile', 
  async (file: photo, thunkAPI) => {
    try {
      const response = await axios.post('/delete-file', file);
      return { ...response.data, file }; 
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

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id: string, thunkAPI) => {
  try {
    const response = await axios.delete(`/products/${id}`);
    console.log(response.data);
    
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const updateProduct = createAsyncThunk('products/updateProduct', async (editedProduct: Product, thunkAPI) => {
  try {
    const response = await axios.put(`/products/${editedProduct._id}`, editedProduct);
    console.log('update dispatched');
    
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
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
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create product.';
      })
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.products = action.payload; 
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products.';
      })    .addCase(deleteFile.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        
        const { product, file } = action.payload;
        const productIndex = state.products.findIndex((p) => p._id === product._id);
        
        if (productIndex !== -1) {
          state.products[productIndex].photos = state.products[productIndex].photos.filter((photo) => photo.cloudinaryId !== file.cloudinaryId);
        }
      })
      .addCase(deleteFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete file.';
      })      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.products = state.products.filter(product => product._id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete product.';
      }).addCase(updateProduct.fulfilled , (state , action) =>{
        const index = state.products.findIndex((product) => product._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      ;

  },
});

export default productSlice.reducer;

export const selectAllProducts = (state: { product: ProductState }) => state.product.products;
export const selectProductLoading = (state: { product: ProductState }) => state.product.loading;
export const selectProductError = (state: { product: ProductState }) => state.product.error;
