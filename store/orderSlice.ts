import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
  } from "@reduxjs/toolkit";
import { Order } from "../entities/Order";
import { OrderAPI } from "../api/orderAPI";
  
  export interface OrderState {
    order: Partial<Order> | null;
    loading: boolean;
    error: string | null;
  }
  
  const initialState: OrderState = {
    order: {
      id : null,
      merchant_id: null,
      contact_method: null, 
      table_id : null,
      payment_method: null, 
      payment_ref: null,
      date : null,
      total_amount: null,
      order_status: null, 
      user: null,
      user_id : null,
      order_products: null
    },
    loading: false,
    error: null,
  };
  
  export const createOrder = createAsyncThunk(
    "order",
    async (order: Order, thunkAPI) => {
      try {
        const response = OrderAPI.createOrder(order);
        return response;
      } catch (error) {
        if (error instanceof Error) {
          return thunkAPI.rejectWithValue(error.message);
        }
        return thunkAPI.rejectWithValue("An unknown error occurred");
      }
    }
  );
  
  
  const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        updateOrder: (state, action: PayloadAction<Partial<Order>>) => {
            state.order = { ...state.order, ...action.payload };
            console.log("FROM SLICE", state.order);
          },
        clearOrder: (state) => {
        state.order = null;
      },

    },
    extraReducers: (builder) => {
      builder
        .addCase(createOrder.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(createOrder.fulfilled, (state, action) => {
          state.loading = false;
          state.order = action.payload.order;
        })
        .addCase(createOrder.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
          console.log("state", state);
        })
    },
  });
  
  export const { updateOrder } = orderSlice.actions;
  export const { clearOrder } = orderSlice.actions;
  export default orderSlice.reducer;
  