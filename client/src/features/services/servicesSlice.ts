import { selectAllServices } from './servicesSlice';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/api';

interface SubCategory {
  name: string;
  description: string;
  id:string
}

export interface Service {
  id: string;
  name: string;
  description: string;
  subCategories: SubCategory[];
}

interface ServiceState {
  services: Service[];
  loading: boolean;
  error: string | null;
}

const initialState: ServiceState = {
  services: [],
  loading: false,
  error: null,
};

export const fetchServices = createAsyncThunk('services/fetchServices', async () => {
  const response = await axios.get('/services'); 
  console.log(response.data.services);
  
  return response.data.services;
});

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch services.';
      });
  },
});

export default serviceSlice.reducer;

// Selector functions
export const selectAllServices = (state: { service: ServiceState }) => state.service.services;
export const selectServiceLoading = (state: { service: ServiceState }) => state.service.loading;
export const selectServiceError = (state: { service: ServiceState }) => state.service.error;
