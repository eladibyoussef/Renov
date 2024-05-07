import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/api';

export interface Professional {
  id: string;
  CIN: string;
  anthropometricCertificate: String;
  license: string;
  username: string;
  companyname: string;
  email: string;
  phoneNumber: string;
  address: string;
  profilePicture: string;
  servicesProvided: string[];
  certificates?: string[];
  cart?: string[];
  quoteRequests?: string;
  availability?: boolean;
  overallRating?: number;
  paymentMethods?: PaymentMethod[];
  portfolio?: Portfolio[];
  reviews?: Review[];
  aboutMe: string;
  approved: Approved;
  permissions: string[];
}

interface PaymentMethod {
  cardType?: string;
  cardNumber?: number;
}

interface Portfolio {
  title: string;
  mediaType: string;
  mediaUrl: string;
}

interface Review {
  userId: string;
  rating: number;
  comment: string;
}

interface Approved {
  approvalStatus: boolean;
  reason: string;
}

interface ProfessionalState {
  professionals: Professional[];
  loading: boolean;
  error: string | null;
}

const initialState: ProfessionalState = {
  professionals: [],
  loading: false,
  error: null,
};

export const fetchProfessionals = createAsyncThunk('professionals/fetchProfessionals', async () => {
  const response = await axios.get('/pro/getAllPros');
  console.log(response.data);
  
  return response.data;
});

const professionalSlice = createSlice({
  name: 'professional',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfessionals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfessionals.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.professionals = action.payload;
      })
      .addCase(fetchProfessionals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch professionals.';
      });
  },
});

export default professionalSlice.reducer;

export const selectAllProfessionals = (state: { professional: ProfessionalState }) => state.professional.professionals;
export const selectProfessionalLoading = (state: { professional: ProfessionalState }) => state.professional.loading;
export const selectProfessionalError = (state: { professional: ProfessionalState }) => state.professional.error;
