import {createSlice} from '@reduxjs/toolkit';
import { addStudent, addshedule, deleteStudentData, deletesheduledata, getStudentData, getsheduledata, updateStudentData, updatesheduledata } from './ActionType';


const initialState = {
    sheduleState:[],
    selectSheduleState:{},
    isLoading:false,
    isError:''
}

export const SheduleSlice = createSlice({
    name:"SheduleSlice",
    initialState,
    reducers:{
      selectedShedule(state,action){
         state.selectSheduleState = state.sheduleState.filter((data)=>data.id == action.payload)
      }
    },
    extraReducers(build){
        build
         .addCase(addshedule.pending,(state,action)=>{
            state.isLoading = true
         })
         .addCase(addshedule.fulfilled,(state,action)=>{
            state.isLoading = false
            state.sheduleState = action.payload;
            state.isError = ''
         })
         .addCase(addshedule.rejected,(state,action)=>{
            state.isError = action.payload
         })
         .addCase(getsheduledata.pending,(state,action)=>{
            state.isLoading = true
         })
         .addCase(getsheduledata.fulfilled,(state,action)=>{
            state.sheduleState = action.payload
         })
         .addCase(getsheduledata.rejected,(state,action)=>{
            state.isError = action.payload
         })
         .addCase(updatesheduledata.pending,(state,action)=>{
            state.isLoading = true
         })
         .addCase(updatesheduledata.fulfilled,(state,action)=>{
            state.sheduleState = state.sheduleState.map((data)=>data.id == action.payload.id ? action.payload : data)
            
         })
         .addCase(updatesheduledata.rejected,(state,action)=>{
            state.isError = action.payload
         })
         .addCase(deletesheduledata.pending,(state)=>{
            state.isLoading = true
         })
         .addCase(deletesheduledata.fulfilled,(state,action)=>{
            console.log(action.payload.id , "id")
            state.sheduleState = state.sheduleState.filter((data)=>data.id !== action.payload.id)
            
         })
         .addCase(deletesheduledata.rejected,(state,action)=>{
            state.isError = action.payload
         })
    }
})

export const {selectedShedule} = SheduleSlice.actions;

export default SheduleSlice.reducer;