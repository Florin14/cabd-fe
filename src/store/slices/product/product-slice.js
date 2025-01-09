import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    quantity: null,
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts(state, action) {
            state.items = action.payload.items;
            state.quantity = action.payload.quantity;
        },
        addProduct(state, action) {
            const product = action.payload.product;

            state.items.push(product);
            if (state.quantity) {
                state.quantity = state.quantity + 1;
            }
        },
        editProduct(state, action) {
            const product = action.payload.product;
            const index = state.items.findIndex((item) => item.id === product.id);

            state.items[index] = product;
        },
        deleteProduct(state, action) {
            const id = action.payload.id;

            state.items = state.items.filter((item) => item.id !== id);

            if (state.quantity) {
                state.quantity = state.quantity - 1;
            }
        },
    },
});

export const productsActions = productsSlice.actions;
export default productsSlice.reducer;
