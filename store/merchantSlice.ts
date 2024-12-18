import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Merchant } from "../entities/Merchant";
import { MerchantAPI } from "../api/merchantAPI";
import { Product } from "../entities/Product";

interface ChangeOrderStatusArgs {
  order_id: number;
  status: string;
}

export interface MerchantState {
  merchant: Merchant | null;
  suggested_products: Product[] | null;
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: MerchantState = {
  merchant: null,
  suggested_products: null,
  selectedProduct: null,
  loading: false,
  error: null,
};

export const fetchMerchant = createAsyncThunk(
  "merchant",
  async (id: number, thunkAPI) => {
    try {
      const response = MerchantAPI.fetchMerchant(id);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

export const fetchMerchantByAdmin = createAsyncThunk(
  "adminMerchant",
  async (token: string, thunkAPI) => {
    console.log("FROM MERCHANT SLICE")
    try {
      const response = MerchantAPI.getAdminMerchant(token);
      console.log("MERCHSNT SLICE 43", response)
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

export const fetchProduct = createAsyncThunk(
  "product",
  async (id: number, thunkAPI) => {
    try {
      const response = MerchantAPI.fetchProduct(id);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

export const changeOrderStatus = createAsyncThunk(
  "orderStatus",
  async ({ order_id, status }: ChangeOrderStatusArgs, thunkAPI) => {
    try {
      console.log("changeOrderStatus FROM THUNK", order_id, status);
      const response = MerchantAPI.changeOrderStatus(order_id, status);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

const merchantSlice = createSlice({
  name: "merchant",
  initialState,
  reducers: {
    clearMerchant: (state) => {
      state.merchant = null;
      state.selectedProduct = null;
    },
    addMerchant: (state,  action: PayloadAction<Merchant>) => {
      state.merchant = action.payload;
      state.selectedProduct = null;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMerchant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMerchant.fulfilled, (state, action) => {
        state.loading = false;
        state.merchant = action.payload.merchant;
        state.suggested_products = action.payload.suggested_products;
      })
      .addCase(fetchMerchant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.log("state", state);
      })
      .addCase(fetchMerchantByAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMerchantByAdmin.fulfilled, (state, action) => {

        state.loading = false;
        state.merchant = action.payload;
      })
      .addCase(fetchMerchantByAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.log("state", state);
      })
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.log("state", state);
      })
      .addCase(changeOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.merchant?.orders?.findIndex((order) => order.id === action.payload.id);
        if (index && index !== -1 && state.merchant?.orders) {
          state.merchant.orders[index] = action.payload;
        }

        console.log("order status changed", action.payload);
      })
      .addCase(changeOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.log("state", state);
      });
  },
});

export const { clearMerchant } = merchantSlice.actions;
export default merchantSlice.reducer;
