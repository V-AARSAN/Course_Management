import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminSignIn from './Components/Admin/Login/AdminSignIn';
import AdminSignUp from './Components/Admin/Login/AdminSignUp';
import UserRegister from './Components/Student/Login/UserRegister';
import UserSignIn from './Components/Student/Login/UserSignIn';
import Course from './Components/Admin/Manage/Course';
import Students from './Components/Admin/Manage/Students';
import Shedule from './Components/Admin/Manage/Shedule';
import AddCourse from './Components/Admin/Add/AddCourse';
import AddShedule from './Components/Admin/Add/AddShedule';
import AddStudents from './Components/Admin/Add/AddStudent';
import { Provider } from 'react-redux';
import { store } from './Store';
import StudentsOpt from './Components/Admin/Manage/StudentsOpt';
import StudentData from './Components/Student/Manage/StudentData';

// import {Provider} from "react-redux";
// import { Store } from './Redux/Store';

function App() {
  
  return (
    <React.StrictMode>
      {/* <Provider store={Store}> */}
          <BrowserRouter basename='coursemanagement'>
            <Provider store={store}>
            <Routes>
              <Route path='/' element={<AdminSignIn/>} />
              <Route path='/signup' element={<AdminSignUp/>} />
              <Route path='/usersignin' element={<UserSignIn/>} />
              <Route path='/register' element={<UserRegister/>} />
              <Route path='/course' element={<Course/>} />
              <Route path='/students' element={<Students/>} />
              <Route path='/shedule' element={<Shedule/>} />
              <Route path='/studentsopt' element={<StudentsOpt/>} />
              <Route path='/shedule/addshedule' element={<AddShedule/>} />
              <Route path='/course/addcourse' element={<AddCourse/>} />
              <Route path='/students/addstudents' element={<AddStudents/>} />
              <Route path='/usersignin/studentdetail' element={<StudentData/>} />

            </Routes>
            </Provider>
          </BrowserRouter>
        {/* </Provider> */}
    </React.StrictMode>
         

  );
}

export default App;
