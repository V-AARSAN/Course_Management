import {createSlice} from '@reduxjs/toolkit';
import { addStudent, deleteStudentData, getStudentData, updateStudentData } from './ActionType';


const initialState = {
    studentState:[],
    studentMessage:{},
    selectStudentState:{},
    isLoading:false,
    isError:''
}

export const StudentSlice = createSlice({
    name:"StudentSlice",
    initialState,
    reducers:{
      selectedStudent(state,action){
         state.selectStudentState = state.studentState.filter((data)=>data.id == action.payload)
      }
    },
    extraReducers(build){
        build
         .addCase(addStudent.pending,(state,action)=>{
            state.isLoading = true
         })
         .addCase(addStudent.fulfilled,(state,action)=>{
            state.isLoading = false
            state.studentState = action.payload;
            state.isError = ''
         })
         .addCase(addStudent.rejected,(state,action)=>{
            state.isError = action.payload
         })
         .addCase(getStudentData.pending,(state,action)=>{
            state.isLoading = true
         })
         .addCase(getStudentData.fulfilled,(state,action)=>{
            state.studentState = action.payload
         })
         .addCase(getStudentData.rejected,(state,action)=>{
            state.isError = action.payload
         })
         .addCase(updateStudentData.pending,(state,action)=>{
            state.isLoading = true
         })
         .addCase(updateStudentData.fulfilled,(state,action)=>{
            state.studentState = state.studentState.map((data)=>data.id == action.payload.id ? action.payload : data)
            
         })
         .addCase(updateStudentData.rejected,(state,action)=>{
            state.isError = action.payload
         })
         .addCase(deleteStudentData.pending,(state)=>{
            state.isLoading = true
         })
         .addCase(deleteStudentData.fulfilled,(state,action)=>{
            console.log(action.payload.id , "id")
            state.studentState = state.studentState.filter((data)=>data.id !== action.payload.id)
            
         })
         .addCase(deleteStudentData.rejected,(state,action)=>{
            state.isError = action.payload
         })
    }
})

export const {selectedStudent} = StudentSlice.actions;

export default StudentSlice.reducer;