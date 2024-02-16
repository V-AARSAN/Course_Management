import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


export const addshedule = createAsyncThunk(
    "CourseSlice/addshedule",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`http://localhost:5000/admin/shedulecontroller/addshedule`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error); 
        }
    }
);

export const getsheduledata = createAsyncThunk(
    "CourseSlice/getsheduledata",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:5000/admin/shedulecontroller/getshedule`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error); 
        }
    }
);

export const updatesheduledata = createAsyncThunk(
    "CourseSlice/updatesheduledata",
    async (data , { rejectWithValue }) => {
        try {
            const response = await axios.put(`http://localhost:5000/admin/shedulecontroller/updateschedule`,data);
            console.log(response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error); 
        }
    }
);



export const deletesheduledata = createAsyncThunk(
    "CourseSlice/deletesheduledata",
    async (data , { rejectWithValue }) => {
        try {
            console.log(data,"hai")
            const response = await axios.delete(`http://localhost:5000/admin/shedulecontroller/deletesehdule`,{data});
            console.log(response.data,"hello")
            return response.data;
        } catch (error) {
            return rejectWithValue(error); 
        }
    }
);




