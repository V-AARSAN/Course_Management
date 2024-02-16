import {createSlice} from '@reduxjs/toolkit';
import { addCourse, deletecoursedata, getadmin, getcoursedata, signIn, signUp, studentSignIn, updatecoursedata } from './ActionType';


const initialState = {
    courseState:[],
    adminState:[],
    sign:{},
    studentSign:{},
    selectState:{},
    isLoading:false,
    isError:''
}

export const CourseSlice = createSlice({
    name:"CourseSlice",
    initialState,
    reducers:{
      selectedItem(state,action){
         state.selectState = state.courseState.filter((data)=>data.id == action.payload)
      }
    },
    extraReducers(build){
        build
         .addCase(signUp.pending,(state,action)=>{
            state.isLoading = true
         })
         .addCase(signUp.fulfilled,(state,action)=>{
            state.isLoading = false
            state.courseState = action.payload;
            state.isError = ''
         })
         .addCase(signUp.rejected,(state,action)=>{
            state.isError = action.payload
         })
         .addCase(signIn.pending,(state,action)=>{
            state.isLoading = true
         })
         .addCase(signIn.fulfilled,(state,action)=>{
            state.isLoading = false
            state.sign = action.payload
            state.isError = ''
         })
         .addCase(signIn.rejected,(state,action)=>{
            state.isError = action.payload
         })
         .addCase(studentSignIn.pending,(state,action)=>{
            state.isLoading = true
         })
         .addCase(studentSignIn.fulfilled,(state,action)=>{
            state.isLoading = false
            state.studentSign = action.payload
            state.isError = ''
         })
         .addCase(studentSignIn.rejected,(state,action)=>{
            state.isError = action.payload
         })
         .addCase(addCourse.pending,(state,action)=>{
            state.isLoading = true
         })
         .addCase(addCourse.fulfilled,(state,action)=>{
            state.message = action.payload
         })
         .addCase(addCourse.rejected,(state,action)=>{
            state.isError = action.payload
         })
         .addCase(getcoursedata.pending,(state,action)=>{
            state.isLoading = true
         })
         .addCase(getcoursedata.fulfilled,(state,action)=>{
            state.courseState = action.payload
         })
         .addCase(getcoursedata.rejected,(state,action)=>{
            state.isError = action.payload
         })
         .addCase(getadmin.pending,(state,action)=>{
            state.isLoading = true
         })
         .addCase(getadmin.fulfilled,(state,action)=>{
            state.adminState = action.payload
         })
         .addCase(getadmin.rejected,(state,action)=>{
            state.isError = action.payload
         })
         .addCase(updatecoursedata.pending,(state,action)=>{
            state.isLoading = true
         })
         .addCase(updatecoursedata.fulfilled,(state,action)=>{
            state.courseState = state.courseState.map((data)=>data.id == action.payload.id ? action.payload : data)
            
         })
         .addCase(updatecoursedata.rejected,(state,action)=>{
            state.isError = action.payload
         })
         .addCase(deletecoursedata.pending,(state)=>{
            state.isLoading = true
         })
         .addCase(deletecoursedata.fulfilled,(state,action)=>{
            console.log(action.payload.id , "id")
            state.courseState = state.courseState.filter((data)=>data.id !== action.payload.id)
            
         })
         .addCase(deletecoursedata.rejected,(state,action)=>{
            state.isError = action.payload
         })
    }
})

export const {selectedItem} = CourseSlice.actions;

export default CourseSlice.reducer;