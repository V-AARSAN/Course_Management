import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const addStudent = createAsyncThunk(
    "StudentSlice/addStudent",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`http://localhost:5000/admin/studentcontroller/addstudent`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error); 
        }
    }
);

export const getStudentData = createAsyncThunk(
    "StudentSlice/getStudentData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:5000/admin/studentcontroller/getstudent`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error); 
        }
    }
);

export const updateStudentData = createAsyncThunk(
    "StudentSlice/updateStudentData",
    async (data , { rejectWithValue }) => {
        try {
            const response = await axios.put(`http://localhost:5000/admin/studentcontroller/updatestudent`,data);
            console.log(response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error); 
        }
    }
);



export const deleteStudentData = createAsyncThunk(
    "StudentSlice/deleteStudentData",
    async (data , { rejectWithValue }) => {
        try {
            const response = await axios.delete(`http://localhost:5000/admin/studentcontroller/deletestudent`,{data});
            return response.data;
        } catch (error) {
            return rejectWithValue(error); 
        }
    }
);




