import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
export interface userState {
    userName: string | null,
    role : string,
    RestaurantId : string | null
}
const initialState: userState = {
    userName: null,
    role : "customer",
    RestaurantId : null,
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
        removeUser :  (state)=>{
                state.userName = null;
                state.role = "";
                state.RestaurantId =null;
            },
    }

})
export const { setUser, removeUser, setRole, setRestaurant, removeRestaurant} = userSlice.actions;
export default userSlice.reducer;