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
  ProRequestResponse: string | null;
  error: string | null;
}

const initialState: ProfessionalState = {
  professionals: [],
  ProRequestResponse: null,
  loading: false,
  error: null,
};

export const fetchProfessionals = createAsyncThunk('professionals/fetchProfessionals', async () => {
  const response = await axios.get('/pro/getAllPros');
  console.log(response.data);
  return response.data;
});

export const ProfessionalRequest = createAsyncThunk('professionals/ProfessionalRequest', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post('/pro/request-register', data);
    return response.data;
  } catch (err) {
    if (err.response) {
      return rejectWithValue(err.response.data);
    } else {
      return rejectWithValue({ message: 'Network error' });
    }
  }
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
      })
      .addCase(ProfessionalRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(ProfessionalRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.ProRequestResponse = action.payload.message;
      })
      .addCase(ProfessionalRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to submit professional request.';
      });
  },
});

export default professionalSlice.reducer;

export const selectAllProfessionals = (state: { professional: ProfessionalState }) => state.professional.professionals;
export const selectProfessionalLoading = (state: { professional: ProfessionalState }) => state.professional.loading;
export const selectProfessionalError = (state: { professional: ProfessionalState }) => state.professional.error;
export const selectResponse = (state: { professional: ProfessionalState }) => state.professional.ProRequestResponse;
