import {STATUS} from "../utils/Status"


const {createSlice} = require('@reduxjs/toolkit') ;



const LoginSlice = createSlice({
    name:"login",
    initialState:{
        data:[],
        status:STATUS.IDLE,
    },
    reducers:{
        addUserLogin(state,action){
            // state.push(action.payload);
            state.data = action.payload
        },
        removeUserLogin(state,action){
            return state.data.splice(0, state.length);
        },
        setStatus(state,action){
            state.status= action.payload;
        }
    }
});

export const {addUserLogin,removeUserLogin,setStatus} = LoginSlice.actions;
export default LoginSlice.reducer;