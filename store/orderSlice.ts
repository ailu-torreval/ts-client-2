import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Order, OrderProduct } from "../entities/Order";
import { OrderAPI } from "../api/orderAPI";

export interface OrderState {
  order: Partial<Order> | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  order: {
    id: null,
    merchant_id: null,
    contact_method: null,
    table_id: null,
    payment_method: null,
    payment_ref: null,
    date: null,
    total_amount: null,
    order_status: null,
    user: null,
    user_id: null,
    order_products: null,
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
    addOrderProduct: (state, action: PayloadAction<OrderProduct>) => {
      if (state.order) {
        if (!state.order.order_products) {
          state.order.order_products = [];
        }
        state.order.order_products.push(action.payload);
        console.log("from add prod slice", state.order.order_products);
      }
    },
    removeOrderProduct: (state, action: PayloadAction<OrderProduct>) => {
      if (state.order && state.order.order_products) {
        const index = state.order.order_products.findIndex(
          (product) =>
            product.product_id === action.payload.product_id &&
            product.price === action.payload.price &&
            product.total_amount === action.payload.total_amount &&
            product.note === action.payload.note &&
            product.name === action.payload.name &&
            JSON.stringify(product.extras) === JSON.stringify(action.payload.extras) &&
            JSON.stringify(product.option) === JSON.stringify(action.payload.option)
        );
        console.log("index", index);
        if (index !== -1) {
          state.order.order_products.splice(index, 1);
        }
        console.log("from remove prod slice", state.order.order_products);
      }
    },
    clearOrder: (state) => {
      state.order = null;
    },
    prepareOrder: (state) => {
      if (state.order && state.order.order_products) {
        state.order.order_products.forEach((orderProd) => {
          // Handle option
          if (orderProd.option) {
            orderProd.option_id = orderProd.option.id;
          }
          if (orderProd.extras && orderProd.extras.length > 0) {
            orderProd.extras_ids = orderProd.extras.map((extra) => extra.id);
          }
          delete orderProd.option;
          delete orderProd.extras;
        });
        console.log(state.order);
      }
    }
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
      });
  },
});

export const { addOrderProduct } = orderSlice.actions;
export const { removeOrderProduct } = orderSlice.actions;
export const { updateOrder } = orderSlice.actions;
export const { clearOrder } = orderSlice.actions;
export const { prepareOrder } = orderSlice.actions;
export default orderSlice.reducer;
