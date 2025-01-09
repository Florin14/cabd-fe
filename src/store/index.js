import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/product/product-slice";
import inventoryReducer from "./slices/inventory/inventory-slice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    invemtory: inventoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
