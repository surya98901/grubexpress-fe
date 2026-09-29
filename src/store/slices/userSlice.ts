import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
interface userState {
    userName: any,
    role : string
}
const initialState: userState = {
    userName: null,
    role : "customer"
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
        removeUser :  (state)=>{
                state.userName = null;
                state.role = ""
            },
    }

})
export const { setUser, removeUser, setRole} = userSlice.actions;
export default userSlice.reducer;