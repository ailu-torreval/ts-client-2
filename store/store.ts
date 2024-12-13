import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice';
import merchantReducer from './merchantSlice';
import orderReducer from './orderSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    merchant: merchantReducer,
    order: orderReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


