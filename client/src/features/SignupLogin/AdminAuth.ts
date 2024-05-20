import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../services/api';
import { saveToken, saveUserPermission, clearToken, clearUserPermission , getUserDetails} from '../../Utils/login';
import { catchError } from '../../Utils/errorCatch'; 



interface Admin {
    id: string;
    ref:string
    username: string;
    email: string;
    phoneNumber: string;
    address: string;
    permissions:string[]
  }
  export interface LoginData {
    email: string | null;
    password: string | null;
    ref: string| null;

  }
  interface AuthState {
    user: Admin | null;
    token: string | null;
    permission: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | undefined;
    isAuthenticated: boolean;
  }
  
  export const loginAdmin = createAsyncThunk<
  { user: Admin; token: string; permission: string },
  LoginData,
  { rejectValue: string }
>('AdminAuthSlice/loginAdmin', async (loginFrom, { rejectWithValue }) => {
  try {
    
    const response = await axios.post<{ user: Admin; token: string; permission: string }>(
      '/admin/login',
      loginFrom
    );
    saveToken(response.data.token);
    const tokenPayload = getUserDetails()
    console.log(tokenPayload);
    
    saveUserPermission(tokenPayload.permissions);
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    const message = catchError(error);
    console.log(message);
     
    return rejectWithValue(message);
  }
});

  export const  AdminAuthSlice = createSlice({
      name: "AdminAuthSlice",
      initialState: {
          user: null,
          token: null,
          permission: null,
          status: 'idle',
          error: undefined,
          isAuthenticated: false,
      } as AuthState,
      reducers: {
        
      }
  })




  export default AdminAuthSlice.reducer;
