import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const signUp = createAsyncThunk(
    "CourseSlice/SignUp",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`http://localhost:5000/admin/admincontroller/createadmin`, data); 
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const signIn = createAsyncThunk(
    "CourseSlice/SignIn",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`http://localhost:5000/admin/admincontroller/signin`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error); 
        }
    }
);

export const studentSignIn = createAsyncThunk(
    "CourseSlice/studentSignIn",
    async (data, { rejectWithValue }) => {
        try {
            console.log(data)
            const response = await axios.post(`http://localhost:5000/admin/admincontroller/studentsignin`,data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error); 
        }
    }
);

export const addCourse = createAsyncThunk(
    "CourseSlice/addCourse",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`http://localhost:5000/admin/coursecontroller/addcourse`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error); 
        }
    }
);

export const getcoursedata = createAsyncThunk(
    "CourseSlice/getcoursedata",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:5000/admin/coursecontroller/getcourse`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error); 
        }
    }
);

export const getadmin = createAsyncThunk(
    "CourseSlice/getadmin",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:5000/admin/admincontroller/getadmin`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error); 
        }
    }
);

export const updatecoursedata = createAsyncThunk(
    "CourseSlice/updatecoursedata",
    async (data , { rejectWithValue }) => {
        try {
            const response = await axios.put(`http://localhost:5000/admin/coursecontroller/updatecourse`,data);
            console.log(response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error); 
        }
    }
);



export const deletecoursedata = createAsyncThunk(
    "CourseSlice/deletecoursedata",
    async (data , { rejectWithValue }) => {
        try {
            console.log(data,"hai")
            const response = await axios.delete(`http://localhost:5000/admin/coursecontroller/deletecourse`,{data});
            console.log(response.data,"hello")
            return response.data;
        } catch (error) {
            return rejectWithValue(error); 
        }
    }
);




