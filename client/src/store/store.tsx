import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice';
import servivesReducer from '../features/services/servicesSlice'


export const store = configureStore({
  reducer: {
    user: userReducer,
    service: servivesReducer
    

  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch