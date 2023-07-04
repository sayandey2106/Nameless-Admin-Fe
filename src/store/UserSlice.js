import {STATUS} from "../utils/Status"


const {createSlice} = require('@reduxjs/toolkit') ;



const UserSlice = createSlice({
    name:"user",
    initialState:{
        data:[],
        status:STATUS.IDLE,
    },
    reducers:{
        addUser(state,action){
            // state.push(action.payload);
            state.data = action.payload
        },
        removeUser(state,action){
            return state.filter((i)=>i.id!==action.payload);
        },
        setStatus(state,action){
            state.status= action.payload;
        }
    }
});

export const {addUser,removeUser,setStatus} = UserSlice.actions;
export default UserSlice.reducer;