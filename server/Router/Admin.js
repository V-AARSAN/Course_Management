const express = require('express');
const AdminData = require('../Controller/AdminData');
const course = require('../Controller/Course');
const student = require('../Controller/Student');
const shedule = require('../Controller/Shedule');
const App = express();

App.use("/admincontroller", AdminData)
App.use("/coursecontroller", course)
App.use("/studentcontroller", student)
App.use("/shedulecontroller", shedule)

module.exports = App ;