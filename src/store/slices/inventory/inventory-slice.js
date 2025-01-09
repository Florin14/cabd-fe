import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  quantity: null,
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    setInventories(state, action) {
      state.items = action.payload.items;
      state.quantity = action.payload.quantity;
    },
    addInventory(state, action) {
      const inventory = action.payload.inventory;

      state.items.push(inventory);
      if (state.quantity) {
        state.quantity = state.quantity + 1;
      }
    },
    editInventory(state, action) {
      const inventory = action.payload.inventory;
      const index = state.items.findIndex((item) => item.id === inventory.id);

      state.items[index] = inventory;
    },
    deleteInventory(state, action) {
      const id = action.payload.id;

      state.items = state.items.filter((item) => item.id !== id);

      if (state.quantity) {
        state.quantity = state.quantity - 1;
      }
    },
  },
});

export const inventoryActions = inventorySlice.actions;
export default inventorySlice.reducer;
