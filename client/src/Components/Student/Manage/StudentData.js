import React, { useEffect, useState } from "react";
import { Accordion, Button, Col, Container, Form, Modal, Row, Stack, Table, Toast, ToastContainer } from "react-bootstrap";
import '../assets/Css//Student.css';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStudentData } from "../../../Redux/StudentRedux/ActionType";
import { getcoursedata } from "../../../Redux/CourseRedux/ActionType";
import { getsheduledata } from "../../../Redux/SheduleRedux/ActionType";
import Logout from "../Logout/Logout";

export default function StudentData(){

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const[show, setShow] = useState()
  const {studentState} = useSelector((state)=>state.Students);
  const {studentSign} = useSelector((state)=>state.Courses);
  const {sheduleState} = useSelector((state)=>state.Shedules);

  const checkcredential = localStorage.getItem('student')

  const logout = (data) =>{
    setShow(data)
  
  }

  useEffect(()=>{
    if(!checkcredential){
        navigate("/")
      }
    
    dispatch(getStudentData())
    dispatch(getcoursedata())
    dispatch(getsheduledata())
  },[getStudentData,getcoursedata,getsheduledata])
  const checkstudent = JSON.parse(localStorage.getItem('id'))

  const filterdata = studentState.find((data)=>data.id == checkstudent )
  const filtershedule = sheduleState.filter((data) => data.course == filterdata?.course);
  console.log(filtershedule); // This will log the found object
  
  
    return(
        <div id="user-image">
            <Row className="g-0 pt-2 pb-5 ">
                    <Col lg={2} md={2}>
                    </Col>
                    <Col lg={8} md={8} sm={12}>
                    <h1 className="text-center text-white pt-3">User Detail</h1>
                    </Col>
                    <Col lg={2} md={2} sm={12} className=" text-end pe-4 pt-3">
                        <img src={require('../assets/images/user.png')} width={'40px'} height={'40px'} style={{cursor:'pointer'}} onClick={()=>setShow(true)}  alt="user icon" />
                        {/* <Modal show={showuser} onHide={()=>setshowuser(false)} backdrop="static" keyboard={false} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Modal title</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>Student Id : {studentId} </p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="outline-danger" onClick={logout}>
                                    Logout
                                </Button>
                            </Modal.Footer>
                        </Modal> */}
                    </Col>
                </Row>
            <Container>
                        
                <Table responsive bordered  className="text-center text-nowrap" >
                    <thead className=" table-dark ">
                        <tr className=" ">
                            <th><i class="fa-regular fa-address-card text-warning"></i> Student Name</th>
                            <th><i class="fa-solid fa-user text-warning"></i> Gender</th>
                            <th><i class="fa-solid fa-user-graduate text-warning"></i> Age</th>
                            <th><i class="fas fa-money-check text-warning"></i> Course</th>
                            <th><i class="fa fa-credit-card text-warning"></i> Joined</th>
                            <th><i class="fa-solid fa-money-bill-wave text-warning"></i> Fees</th>
                            <th><i class="fa-solid fa-calendar-days text-warning"></i>Username</th>
                            <th><i class="fa-solid fa-calendar-days text-warning"></i>Class Date</th>
                            <th><i class="fa-solid fa-calendar-days text-warning"></i>Start Time</th>
                            <th><i class="fa-solid fa-calendar-days text-warning"></i>End Time</th>
                            <th><i class="fa-solid fa-calendar-days text-warning"></i>Venue</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr>
                            <td>{filterdata?.student_name}</td>
                            <td>{filterdata?.gender}</td>
                            <td>{filterdata?.age}</td>
                            <td>{filterdata?.course}</td>
                            <td>{filterdata?.joined_date}</td>
                            <td>{filterdata?.fees}</td>
                            <td>{filterdata?.username}</td>
                            <td>{filtershedule?.date || "No Date Sheduled"}</td>
                            <td>{filtershedule?.starttime || "No Time Sheduled"}</td>
                            <td>{filtershedule?.endtime || "No Time Sheduled"}</td>
                            <td>{filtershedule?.venue || "No Venue Sheduled"}</td>
                        </tr>
                    </tbody>
                </Table>
                {show && <Logout logout={logout} username={filterdata?.username} password={filterdata?.password} />}
            </Container>
        </div>
    )
}