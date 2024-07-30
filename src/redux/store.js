import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart";
import searchSlice from './search';

const store = configureStore({
    reducer: {
        cart: cartSlice,
        search: searchSlice
    },
});

export default store;