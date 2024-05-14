import { configureStore } from '@reduxjs/toolkit'
import professionalReducer from '../features/professional/professionalSlice'
import authReducer from '../features/SignupLogin/authSlice'
import userReducer from '../features/user/userSlice';
import servivesReducer from '../features/services/servicesSlice'
import productsRducer from '../features/product/productSlice'

export const store = configureStore({
  reducer: {
    professional:professionalReducer,
    auth: authReducer,
    user: userReducer,
    product:productsRducer,
    service: servivesReducer
    

  }
    
  



})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


