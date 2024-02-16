import { configureStore }from "@reduxjs/toolkit" ;
import CourseSlice from "./Redux/CourseRedux/SliceControl";
import StudentSlice from "./Redux/StudentRedux/SliceControl";
import SheduleSlice from "./Redux/SheduleRedux/SliceControl";

export const store = configureStore({
    devTools:true,
    reducer:{
        Courses: CourseSlice,
        Students:StudentSlice,
        Shedules:SheduleSlice
    }
})