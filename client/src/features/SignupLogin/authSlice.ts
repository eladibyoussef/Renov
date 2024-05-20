import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../services/api';
import { saveToken, saveUserPermission, clearToken, clearUserPermission , getUserDetails} from '../../Utils/login';
import { catchError } from '../../Utils/errorCatch'; 

interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  phoneNumber?: string;
  address?: string;
  location?: Location;
  paymentMethods?: PaymentMethodData[];
  cart?: string; 
  requests?: Request[];
}
interface AuthState {
  user: User | null;
  token: string | null;
  permission: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
  isAuthenticated: boolean;
}

interface LoginData {
  email: string | undefined;
  password: string | undefined;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk<
  { user: User; token: string; permission: string },
  LoginData,
  { rejectValue: string }
>('auth/loginUser', async (userData, { rejectWithValue }) => {
  try {
    console.log(userData);
    
    const response = await axios.post<{ user: User; token: string; permission: string }>(
      '/user/login',
      userData
    );
    saveToken(response.data.token);
    const tokenPayload = getUserDetails()
    console.log(tokenPayload);
    
    saveUserPermission(tokenPayload.type);
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    const message = catchError(error);
    console.log(message);
     
    return rejectWithValue(message);
  }
});

export const registerUser = createAsyncThunk<
  { user: User; token: string; permission: string },
  RegisterData,
  { rejectValue: string }
>('auth/registerUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post<{ user: User; token: string; permission: string }>(
      '/user/register',
      userData
    );
    console.log(response.data);
    
    saveToken(response.data.token);
    saveUserPermission(response.data.permission);
    console.log(response.data);
    return response.data;
  } catch (error) {
    const message = catchError(error); 
    return rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    permission: null,
    status: 'idle',
    error: undefined,
    isAuthenticated: false,
  } as AuthState,
  reducers: {
    logout: (state) => {
      clearToken();
      clearUserPermission();
      state.user = null;
      state.token = null;
      state.permission = null;
      state.status = 'idle';
      state.error = undefined;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ user: User; token: string; permission: string }>) => {
        const tokenPayload = getUserDetails()

        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.permission = tokenPayload.type;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<{ user: User; token: string; permission: string }>) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.permission = action.payload.permission;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
