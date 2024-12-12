import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { endpoints } from "../../../config/api";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "products/addNewProduct",
  async (formData) => {
    const response = await axios.post(
      `${endpoints.admin.products.base}/add`,
      formData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  }
);

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    const response = await axios.get(`${endpoints.admin.products.base}/get`);
    return response.data;
  }
);

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ id, formData }) => {
    const response = await axios.put(
      `${endpoints.admin.products.base}/edit/${id}`,
      formData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    const response = await axios.delete(
      `${endpoints.admin.products.base}/delete/${id}`
    );
    return response.data;
  }
);

const adminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default adminProductsSlice.reducer;
