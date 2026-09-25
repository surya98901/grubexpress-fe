import {createSlice, type PayloadAction} from "@reduxjs/toolkit"
interface cartState{
    orders: string[]
}
const initialState: cartState = {
    orders: []
}
const cartSlice = createSlice(
    {
        name : "Cart",
        initialState,
        reducers:{
            addOrder: (state, action:PayloadAction<string>)=>{
                state.orders.push(action.payload);
            },
            removeOrder:(state, action:PayloadAction<string>)=>{
                state.orders = state.orders.filter((item)=> item == action.payload);
            },
            clearCart:(state)=>{
                state.orders = [];
            },
            
        },
    }
);
export const {addOrder, removeOrder, clearCart} = cartSlice.actions;

export default cartSlice.reducer;