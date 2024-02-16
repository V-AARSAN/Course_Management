import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Dropdown, Form, FormGroup, InputGroup, Modal, Nav, Row, Stack, Table, Toast, ToastContainer } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import '../assets/Css/Admin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay, faEdit, faGraduationCap, faPeopleRoof, faSearch, faTimeline, faTimes, faTrash, faUserTag, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { deletesheduledata, getsheduledata, updatesheduledata } from '../../../Redux/SheduleRedux/ActionType';
import { useDispatch, useSelector } from 'react-redux';
import { selectedShedule } from '../../../Redux/SheduleRedux/SliceControl';
import { getcoursedata } from '../../../Redux/CourseRedux/ActionType';
import Logout from '../Logout/Logout';

export default function Shedule() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {courseState} = useSelector((state)=>state.Courses)
  const {sheduleState,selectSheduleState} = useSelector((state)=>state.Shedules)
  const[search, setSearch] = useState()
const[show, setShow] = useState()
  const[showEdit, setShowEdit] = useState(false)
  const[showDelete, setShowDelete] = useState(false)
  const[id, setId] = useState()
  const [course, setCourse] = useState()
    const [date, setDate] = useState()
    const [startTime, setStartTime] = useState()
    const [endTime, setEndTime] = useState()
    const [venue, setVenue] = useState()
  
  const handleEdit = (id) =>{
    dispatch(selectedShedule(id))
    setShowEdit(true)
  }
  
  const handleDelete = (id) =>{
    setId(id)
    setShowDelete(true)
  }
  
  const deleteSubmit = (e) =>{
    e.preventDefault()
    const data = {
      "id" : id
    }
    dispatch(deletesheduledata(data))
    setShowDelete(false)
  }
  
  const updateSubmit = (e)=>{
    e.preventDefault();
    
    const data = {
      id : id,
      course: course,
      date: date,
      starttime: startTime,
      endtime: endTime,
      venue: venue
    }
    dispatch(updatesheduledata(data))
    setShowEdit(false)
  }
  
  const checkcredential = localStorage.getItem('credentials')
  
  const serachTerm = new RegExp (search,'gi')
  const checkArray = Array.isArray(sheduleState) ? sheduleState : []
  const filteredArray = checkArray.filter((data)=>{
    return serachTerm.test(data.course) || serachTerm.test(data.fees)
  })


  useEffect(()=>{
    if(!checkcredential){
      navigate("/")
    }

    // if (Object.keys(selectState).length !== 0){
      setId(selectSheduleState[0]?.id)
      setCourse(selectSheduleState[0]?.course)
      setDate(selectSheduleState[0]?.date)
      setStartTime(selectSheduleState[0]?.starttime)
      setEndTime(selectSheduleState[0]?.endtime)
      setVenue(selectSheduleState[0]?.venue)
    // }
    dispatch(getsheduledata())
  dispatch(getcoursedata())

    
  },[checkcredential,getcoursedata,selectSheduleState,getsheduledata,deletesheduledata])


  const logout = (data) =>{
    setShow(data)
  
  }
  return (
    <>
       <div className="vh-100" id="manage-bg" >
          {/* Header */}
        <Row className="g-0 bg-success py-3 ">
            <Col lg={4} md={4} sm={12}>
              <h1 className='text-decoration-underline text-white mx-2'>Training Institution</h1>
            </Col>
            <Col Col lg={8} md={8} sm={12} className="d-flex justify-content-end px-3 pt-2">
            <Nav variant="tabs" className="tabs">
                {[
                  { path: "/course", icon:faGraduationCap, text: "Manage Course",textcolor:"text-white" },
                  { path: "/students", icon:faPeopleRoof, text: "Manage Students",textcolor:"text-white" },
                  { path: "/shedule", icon:faCalendarDay, text: "Training Shedule" },
                  { path: "/studentsopt", icon:faTimeline, text: "Students Opt in / out",textcolor:"text-white" },
                ].map((item, index) => (
                  <Nav.Item key={index}>
                    <Nav.Link className={`${item.textcolor} fw-bold ${item.path === "/shedule" ? "active" : ""}`} onClick={() => navigate(item.path)}>
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
              <h3 className="text-center text-dark fw-bold">Training shedule</h3>
              <Row>
                <Col lg={3} md={3} xs={9} sm={9} className="my-2 d-flex">
                  <InputGroup >
                    <InputGroup.Text id="basic-addon1">
                    <FontAwesomeIcon icon={faSearch} />
                    </InputGroup.Text>
                    <Form.Control type="text" placeholder="Search"  onChange={(e)=>setSearch(e.target.value)}/>
                  </InputGroup>
                </Col>
                <Col lg={9} md={9} sm={7} className="my-2 text-end d-flex justify-content-end">
                  <Button variant="primary" onClick={() => navigate('/shedule/addshedule')} className=" text-nowrap">Add Shedule</Button>
                </Col>
              </Row>
              <div className="table-container overflow-auto" style={{ maxHeight: '400px'}}  >
                <Table  striped hover  className="text-center mb-0 shadow text-nowrap"  >
                  <thead className="table-info position-sticky top-0">
                    <tr>
                      {[
                        "Si.No","Course","Date","Start Time", "End Time","Venue","Action"
                      ].map((item, index) => (
                        <th key={index}>{item}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredArray.map((data,index) => (
                      <tr key={data.id}>
                        <td>{index + 1}</td>
                       <td>{data.course}</td>
                       <td>{data.date}</td>
                       <td>{data.starttime}</td>
                       <td>{data.endtime}</td>
                       <td>{data.venue}</td>
                       <td>{[
                            {name:"Edit",icon:faEdit,color:"outline-primary",event:handleEdit},
                            {name:"Delete",icon:faTrash,color:"outline-danger",event:handleDelete}].map((handler,index)=>(
                            <Button key={`${index}_${handler.name}`} variant={handler.color} className="mx-2 rounded-circle" onClick={()=>handler.event(data.id)}><FontAwesomeIcon icon={handler.icon}/></Button>
                            ))}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Container> 
               {/* Edit Model */}
               <Modal show={showEdit} onHide={()=>setShowEdit(false)} backdrop={'static'}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Data</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <Form  >
                    <Container>
                        <Stack gap={3} className="m-4">
                            <h3 className='text-primary fw-bold'><span className="text-decoration-underline ">Add Shedu</span>le</h3>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroup.Text style={{padding:'0 17px'}}>Course</InputGroup.Text>
                                    <Form.Select value={course} onChange={(e)=>setCourse(e.target.value)}>
                                        <option value={course}>{course}</option>
                                        {Array.isArray(courseState) && courseState.map((data)=>(
                                            <>
                                            <option value={data.course}>{data.course}</option>
                                            </>
                                        ))}
                                    </Form.Select>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroup.Text style={{padding:'0 26px'}}>Date</InputGroup.Text>
                                    <Form.Control type='date' value={date} onChange={(e)=>setDate(e.target.value)}/>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                            <InputGroup>
                                <InputGroup.Text style={{padding:'0 7px'}}>Start Time</InputGroup.Text>
                                <Form.Control type='time ' value={startTime} onChange={(e)=>setStartTime(e.target.value)} />
                            </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroup.Text style={{padding:'0 10px'}}>End Time</InputGroup.Text>
                                    <Form.Control type='time' value={endTime} onChange={(e)=>setEndTime(e.target.value)} />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroup.Text style={{padding:'0 20px'}}>Venue</InputGroup.Text>
                                    <Form.Control type='text' value={venue} placeholder='enter venue' onChange={(e)=>setVenue(e.target.value)} />
                                </InputGroup>
                            </FormGroup>
                           
                        </Stack>
                        {/* {validate && <p className="text-center text-danger">{Error}</p>} */}
                    </Container>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <div className="text-end">
                    <Button type="submit" variant="danger" onClick={()=>setShowEdit(false)} className='mx-2' >Close</Button> 
                    <Button type="submit" variant="primary" onClick={updateSubmit}>Update</Button> 
                </div>
              </Modal.Footer>
            </Modal>

            {/* Delete Toast Confirm */}
            <ToastContainer position='middle-center'>
              <Toast show={showDelete} className='p-3'>
                <p className='fs-5 fw-bold text-dark'>Are you sure you want to Delete?</p>
                <div className='text-end'>
                  <Button variant='primary' className='mx-2' onClick={()=>setShowDelete(false)}>Cancel</Button>
                  <Button variant='danger' onClick={deleteSubmit}>Ok</Button>
                </div>
              </Toast>
            </ToastContainer>
        </div>  
    </>
  )
}
