const {createSlice} = require('@reduxjs/toolkit') ;

const initialState=[];

const AssignCast = createSlice({
    name:"asiignCast",
    initialState,
    reducers:{
        assignCast(state,action){
            state.push(action.payload);
        },
        removeAssignCast(state,action){
            return state.filter((i)=>i.id!==action.payload);
        },
        removeAllAssignCast(){
            return [];
        }
    }
});

export const {assignCast,removeAssignCast,removeAllAssignCast} = AssignCast.actions;
export default AssignCast.reducer;