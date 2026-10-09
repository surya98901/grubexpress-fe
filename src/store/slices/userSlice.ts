import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
export interface userState {
    userName: string | null,
    role : string,
    RestaurantId : string | null
    deliveryAddressId : string ,
}
const initialState: userState = {
    userName: null,
    role : "customer",
    RestaurantId : null,
    deliveryAddressId  : ""
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        setUser: (state, action:PayloadAction<string>)=>{
                state.userName = action.payload;
            },
        setRole :(state, action:PayloadAction<string>)=>{
                state.role = action.payload;
            },
        setRestaurant : (state, action:PayloadAction<string>)=>{
                if(state.role === "admin" && !state.RestaurantId?.includes(action.payload)){
                    state.RestaurantId = action.payload;
                }
            },
        removeRestaurant : (state)=>{
                if(state.role === "admin"){
                    state.RestaurantId = null
                }
            },
        setDeliveryAddress : (state,action:PayloadAction<string>)=>{
            if(state.role  === "customer"){
                state.deliveryAddressId =  action.payload
            }
        },
        removeUser :  (state)=>{
                state.userName = null;
                state.role = "";
                state.RestaurantId =null;
                state.deliveryAddressId = "";
            },

    }

})
export const { setUser, removeUser, setRole, setRestaurant, removeRestaurant,setDeliveryAddress} = userSlice.actions;
export default userSlice.reducer;