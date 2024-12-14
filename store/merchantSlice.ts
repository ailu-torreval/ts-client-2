import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Merchant } from "../entities/Merchant";
import { MerchantAPI } from "../api/merchantAPI";
import { Product } from "../entities/Product";

export interface MerchantState {
  merchant: Merchant | null;
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: MerchantState = {
  merchant: null,
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

const merchantSlice = createSlice({
  name: "merchant",
  initialState,
  reducers: {
    clearMerchant: (state) => {
      state.merchant = null;
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
        state.merchant = action.payload;
      })
      .addCase(fetchMerchant.rejected, (state, action) => {
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
      });
  },
});

export const { clearMerchant } = merchantSlice.actions;
export default merchantSlice.reducer;
