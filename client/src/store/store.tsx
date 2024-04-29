import { configureStore } from '@reduxjs/toolkit'
import professionalReducer from '../features/professional/professionalSlice'
import authReducer from '../features/SignupLogin/authSlice'
import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    professional:professionalReducer,
    auth: authReducer,
    user: userReducer,
  }
    
  



})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch