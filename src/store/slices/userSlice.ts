import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
interface userState {
    userName: any
}
const initialState: userState = {
    userName: null
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        setUser: (state, action:PayloadAction<string>)=>{
                state.userName = action.payload;
            },
        removeUser :  (state)=>{
                state.userName = null;
            },
    }

})
export const { setUser, removeUser} = userSlice.actions;
export default userSlice.reducer;