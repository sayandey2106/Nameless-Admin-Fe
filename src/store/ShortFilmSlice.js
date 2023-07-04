import { STATUS } from '../utils/Status';

const {createSlice} = require('@reduxjs/toolkit') ;



const ShortFilm = createSlice({
    name:"shortfilm",
    initialState:{
        data:[],
        status:STATUS.IDLE,
        editShortFilm:{
            
        }
    },
    reducers:{
        addShortFilm(state,action){
            // state.push(action.payload);
            state.data = action.payload
        },
        removeShortFilm(state,action){
            return state.filter((i)=>i.id!==action.payload);
        },
        setStatus(state,action){
            state.status= action.payload;
        },
        setEditShortFilm(state,action){
            
            state.editShortFilm=action.payload;
        }
    }
});

export const {addShortFilm,removeShortFilm,setStatus,setEditShortFilm} = ShortFilm.actions;
export default ShortFilm.reducer;