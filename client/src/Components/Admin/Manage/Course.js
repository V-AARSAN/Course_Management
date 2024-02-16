import React, { useEffect, useState } from 'react'
import { Alert, Button, Card, Col, Container, Dropdown, Form, FormGroup, InputGroup, Modal, Nav, Row, Stack, Table, Toast, ToastContainer } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import '../assets/Css/Admin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay, faEdit, faGraduationCap, faPeopleRoof, faSearch, faTimeline, faTrash, faUserTag, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deletecoursedata, getcoursedata, updatecoursedata } from '../../../Redux/CourseRedux/ActionType';
import { selectedItem } from '../../../Redux/CourseRedux/SliceControl';
import Logout from '../Logout/Logout';

export default function Course() {

const navigate = useNavigate();
const dispatch = useDispatch();
const {courseState,selectState} = useSelector((state)=>state.Courses)
const[search, setSearch] = useState()
const[show, setShow] = useState()
const[showEdit, setShowEdit] = useState(false)
const[showDelete, setShowDelete] = useState(false)
const[id, setId] = useState()
const[course, setCourse] = useState()
const[fees, setFees] = useState()
const[duration, setDuration] = useState()

const handleEdit = (id) =>{
  dispatch(selectedItem(id))
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
  dispatch(deletecoursedata(data))
  setShowDelete(false)
}

const logout = (data) =>{
  setShow(data)

}

const updateSubmit = (e)=>{
  e.preventDefault();
  
  const data = {
    id : id,
    course : course,
    fees : fees,
    duration : duration
  }
  dispatch(updatecoursedata(data))
  setShowEdit(false)
}

const checkcredential = localStorage.getItem('credentials')

const serachTerm = new RegExp (search,'gi')
const checkArray = Array.isArray(courseState) ? courseState : []
const filteredArray = checkArray.filter((data)=>{
  return serachTerm.test(data.course) || serachTerm.test(data.fees)
})

useEffect(()=>{
  if(!checkcredential){
    navigate("/")
  }

  // if (Object.keys(selectState).length !== 0){
    setId(selectState[0]?.id)
    setCourse(selectState[0]?.course)
    setFees(selectState[0]?.fees)
    setDuration(selectState[0]?.duration)
  // }
  dispatch(getcoursedata())
  
},[checkcredential,selectState,getcoursedata,deletecoursedata])



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
                  { path: "/course", icon:faGraduationCap, text: "Manage Course" },
                  { path: "/students", icon:faPeopleRoof, text: "Manage Students",textcolor:"text-white" },
                  { path: "/shedule", icon:faCalendarDay, text: "Training Shedule",textcolor:"text-white" },
                  { path: "/studentsopt", icon:faTimeline, text: "Students Opt in / out",textcolor:"text-white" },
                ].map((item, index) => (
                  <Nav.Item key={index}>
                    <Nav.Link className={`${item.textcolor} fw-bold ${item.path === "/course" ? "active" : ""}`} onClick={() => navigate(item.path)}>
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
              <h3 className="text-center text-dark fw-bold">Manage Course</h3>
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
                  <Button variant="primary" onClick={() => navigate('/course/addcourse')} className="text-nowrap">Add Course</Button>
                </Col>
              </Row>
              <div className="table-container overflow-auto" style={{ maxHeight: '400px'}}  >
                <Table  striped hover responsive  className="text-center mb-0 shadow text-nowrap"  >
                  <thead className="table-info position-sticky top-0">
                    <tr>
                      {[
                        "Si.No","Course","Fees","Duration","Action"
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
                       <td>{data.fees}</td>
                       <td>{data.duration}</td>
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
                <Form>
                  <Container>
                      <Stack gap={3}>
                          <FormGroup>
                              <InputGroup>
                                  <InputGroup.Text style={{padding:'0 17px'}}>Course</InputGroup.Text>
                                  <Form.Control type='text' value={course} onChange={(e)=>setCourse(e.target.value)}/>
                              </InputGroup>
                          </FormGroup>
                          <FormGroup>
                              <InputGroup>
                                  <InputGroup.Text style={{padding:'0 26px'}}>Fees</InputGroup.Text>
                                  <Form.Control type='text' value={fees} onChange={(e)=>setFees(e.target.value)}/>
                              </InputGroup>
                          </FormGroup>
                          <FormGroup>
                              <InputGroup>
                                  <InputGroup.Text style={{padding:'0 10px'}}>Duration</InputGroup.Text>
                                  <Form.Select value={duration}  onChange={(e)=>setDuration(e.target.value)} >
                                      <option>{duration}</option>
                                      <option value="2 weeks">2 weeks</option>
                                      <option value="3 weeks">3 weeks</option>
                                      <option value="4 weeks">4 weeks</option>
                                      <option value="5 weeks">5 weeks</option>
                                      <option value="6 weeks">6 weeks</option>
                                      <option value="7 weeks">7 weeks</option>
                                      <option value="8 weeks">8 weeks</option>
                                      <option value="9 weeks">9 weeks</option>
                                  </Form.Select>
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
                    <Button type="submit" variant="primary" onClick={updateSubmit} >Update</Button> 
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
