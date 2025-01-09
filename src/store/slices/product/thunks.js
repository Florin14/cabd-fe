import Axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { productsActions } from "./product-slice";

export const fetchProducts = createAsyncThunk(
  "fetchProducts",
  async (
    { offset = 1, limit = 25, sortBy = null, sortType = null },
    thunkAPI
  ) => {
    const options = {
      url: "/product",
      method: "GET",
      params: {
        offset,
        limit,
        sortBy,
        sortType,
      },
    };

    try {
      const response = await Axios(options);
      const data = response.data.data;
      thunkAPI.dispatch(
        productsActions.setProduct({
          items: data.items,
          quantity: data.quantity,
        })
      );
    } catch (e) {
      return thunkAPI.rejectWithValue({
        error: true,
        message: "SomethingWentWrong",
      });
    }
  }
);

export const addProductHandler = createAsyncThunk(
  "addProduct",
  async ({ text }, thunkAPI) => {
    const options = {
      url: "/product",
      method: "POST",
      data: { text },
    };

    try {
      const response = await Axios(options);
      const product = response.data.data;
      thunkAPI.dispatch(productsActions.addProduct({ product: product }));
      return true;
    } catch (e) {
      return thunkAPI.rejectWithValue({
        error: true,
        message: "SomethingWentWrong",
      });
    }
  }
);

export const editProductHandler = createAsyncThunk(
  "editProduct",
  async ({ id, text }, thunkAPI) => {
    const options = {
      url: "/product/" + id,
      method: "PUT",
      data: { text },
    };

    try {
      const response = await Axios(options);
      const product = response.data.data;
      thunkAPI.dispatch(productsActions.editProduct({ product: product }));
      return true;
    } catch (e) {
      
        return thunkAPI.rejectWithValue({
          error: true,
          message: "SomethingWentWrong",
        });
      
    }
  }
);

export const deleteProductHandler = createAsyncThunk(
  "deleteProduct",
  async ({ id }, thunkAPI) => {
    const options = {
      url: "/product/" + id,
      method: "DELETE",
    };

    try {
      await Axios(options);
      thunkAPI.dispatch(productsActions.de({ id: id }));
      return true;
    } catch (e) {
      return thunkAPI.rejectWithValue({
        error: true,
        message: "SomethingWentWrong",
      });
    }
  }
);
