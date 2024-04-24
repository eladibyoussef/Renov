import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserState {
  loading: boolean;
  user: string; 
  email: string;
  password: string;
}

const initialState: UserState = {
  loading: false,
  user: '', 
  email: '',
  password: ''
};

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export const registerUser = createAsyncThunk<string, RegisterFormData>(
  'user/registerUser',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/user/register', formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Définissez vos reducers ici si nécessaire
  },
  extraReducers: builder => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    }).addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
  }
});

export default userSlice.reducer;
