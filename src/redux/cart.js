const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    cartItem: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            state.cartItem.push(action.payload);
        },
        removeFromCart(state, action) {
            state.cartItem = state.cartItem.filter(item => item._id !== action.payload);
            return state;
        },
        removeAll(state, action){
            state.cartItem = [];
            return state;
        }
    },
});

export const { addToCart, removeFromCart, removeAll } = cartSlice.actions;
export default cartSlice.reducer;