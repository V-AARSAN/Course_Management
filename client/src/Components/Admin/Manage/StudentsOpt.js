import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Button, Card, Col, Container, Dropdown, Form, FormGroup, InputGroup, Modal, Nav, Row, Stack, Table, Toast, ToastContainer } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay, faEdit, faGraduationCap, faPeopleRoof, faSearch, faTimeline, faTrash, faUserTag, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deletecoursedata, getcoursedata, updatecoursedata } from '../../../Redux/CourseRedux/ActionType';
import { selectedItem } from '../../../Redux/CourseRedux/SliceControl';
import { getsheduledata } from '../../../Redux/SheduleRedux/ActionType';
import { getStudentData } from '../../../Redux/StudentRedux/ActionType';
import Logout from '../Logout/Logout';

export default function StudentsOpt() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search , setSearch ] = useState()
  const[show, setShow] = useState()


  const checkcredential = localStorage.getItem('credentials')

  useEffect(()=>{
    if(!checkcredential){
      navigate("/")
    }

    dispatch(getcoursedata())
    dispatch(getStudentData())
    dispatch(getsheduledata())
    
  },[checkcredential,dispatch])

  const {studentState} = useSelector((state)=>state.Students);
  const {courseState} = useSelector((state)=>state.Courses);
  const {sheduleState} = useSelector((state)=>state.Shedules);

  const shedulename = useMemo(() => {
    return (course) => {
      const filter = studentState.find((data) => data.course === course);
      console.log(filter);
      return filter ? filter.student_name : '';
    };
  }, [studentState]);

  const logout = (data) =>{
    setShow(data)
  
  }
  
  return (
    <>
      <div>
        {/* Header */}
        <Row className="g-0 bg-success py-3 ">
          <Col lg={4} md={4} sm={12}>
            <h1 className='text-decoration-underline text-white mx-2'>Training Institution</h1>
          </Col>
          <Col Col lg={8} md={8} sm={12} className="d-flex justify-content-end px-3 pt-2">
            <Nav variant="tabs" className="tabs">
              {[
                { path: "/course", icon:faGraduationCap, text: "Manage Course",textcolor:"text-white"  },
                { path: "/students", icon:faPeopleRoof, text: "Manage Students",textcolor:"text-white" },
                { path: "/shedule", icon:faCalendarDay, text: "Training Schedule",textcolor:"text-white" },
                { path: "/studentsopt", icon:faTimeline, text: "Students Opt in / out"},
              ].map((item, index) => (
                <Nav.Item key={index}>
                  <Nav.Link className={`${item.textcolor} fw-bold ${item.path === "/studentsopt" ? "active" : ""}`} onClick={() => navigate(item.path)}>
                    <FontAwesomeIcon icon={item.icon} /> <span className="">{item.text}</span>
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
            <div className="ms-2">
                <img src={require('../assets/images/user.png')} width={'40px'} height={'40px'} onClick={() => setShow(true)} style={{ cursor: 'pointer' }} alt="user icon" />
            </div>
            {show && <Logout logout={logout}/>}
          </Col>
        </Row>

        {/* Section */}
        <Container fluid className="py-3">
          <h3 className="text-center text-dark fw-bold">Students Opt In / Out</h3>
          <Row>
            <Col lg={3} md={3} xs={9} sm={9} className="my-2 d-flex">
              <InputGroup >
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={faSearch} />
                </InputGroup.Text>
                <Form.Control type="text" placeholder="Search"  onChange={(e)=>setSearch(e.target.value)}/>
              </InputGroup>
            </Col>
          </Row>
          <div className="table-container overflow-auto" style={{ maxHeight: '400px'}}  >
            <Table  striped hover responsive  className="text-center mb-0 shadow text-nowrap"  >
              <thead className="table-info position-sticky top-0">
                <tr>
                  {[
                    "Si.No","Student Name","Course","Time In", "Time Out", "Venue   "
                  ].map((item, index) => (
                    <th key={index}>{item}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
              {sheduleState.map((schedule, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{shedulename(schedule.course) ? shedulename(schedule.course) : "N/A"}</td>
                        <td>{schedule.course}</td>
                    <td>{schedule.starttime}</td>
                    <td>{schedule.endtime}</td>
                    <td>{schedule.venue}</td>
                </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Container> 
      </div>  
    </>
  )
}
