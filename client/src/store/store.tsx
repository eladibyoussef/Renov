import { configureStore } from '@reduxjs/toolkit'
import professionalReducer from '../features/professional/professionalSlice'
import authReducer from '../features/login/loginSlice'

export const store = configureStore({
  reducer: {
    professional:professionalReducer,
    auth: authReducer
    
  
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch