import { createSlice, createAsyncThunk , PayloadAction } from '@reduxjs/toolkit';
import axios from '../../services/api';

interface Location {
  lat: number;
  long: number;
}

interface PaymentMethod {
  cardType: string;
  cardNumber: number;
}

interface Request {
  id: string;
  serviceType: string;
  priority: string;
  description: string;
  images: string[];
  
}

export interface User  {
  id: string;
  username: string;
  email: string;
  password: string;
  phoneNumber?: string;
  address?: string;
  location?: Location;
  paymentMethods?: PaymentMethod[];
  requests?: Request[];

}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};


export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('/user/AllUsers'); 
  console.log(response.data);

  return response.data;
});

export const editUser =  createAsyncThunk('users/editUser', async (editedUser: User) => {
   const response = await axios.put(`/user/${editedUser.id}` , editedUser)
   console.log(response.data);
   return response.data
   
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users.';
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const editedUser = action.payload.user;
        const index = state.users.findIndex((user) => user.id === editedUser.id);
        if (index !== -1) {
          state.users[index] = editedUser;
        }
      });
  },
});


export default userSlice.reducer;

export const selectAllUsers = (state: { user: UserState }) => state.user.users;
export const selectUserLoading = (state: { user: UserState }) => state.user.loading;
export const selectUserError = (state: { user: UserState }) => state.user.error;

