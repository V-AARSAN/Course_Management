import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Dropdown, Form, FormGroup, InputGroup, Modal, Nav, Row, Stack, Table, Toast, ToastContainer } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import '../assets/Css/Admin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBirthdayCake, faCalendarDay, faEdit, faEnvelope, faGraduationCap, faLock, faMoneyBill, faPeopleRoof, faPersonHalfDress, faPhone, faSchool, faSearch, faTimeline, faTrash, faUser, faUserTag, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectedStudent } from '../../../Redux/StudentRedux/SliceControl';
import { deleteStudentData, getStudentData, updateStudentData } from '../../../Redux/StudentRedux/ActionType';
import { getcoursedata } from '../../../Redux/CourseRedux/ActionType';
import Logout from '../Logout/Logout';

export default function Students() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {studentState,selectStudentState} = useSelector((state)=>state.Students);
  const {courseState} = useSelector((state)=>state.Courses)
  const[search, setSearch] = useState()
const[show, setShow] = useState()
  const[showEdit, setShowEdit] = useState(false)
  const[showDelete, setShowDelete] = useState(false)
  const[id, setId] = useState()
  const[name, setName] = useState()
  const[age, setAge] = useState()
  const[gender, setGender] = useState()
  const[email, setEmail] = useState()
  const[fees, setFees] = useState()
  const[course, setCourse] = useState()
  const[joinDate, setJoinDate] = useState()
  const[username, setUsername] = useState()
  const[password, setPassword] = useState()


  const handleEdit = (id) =>{
    dispatch(selectedStudent(id))
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
    dispatch(deleteStudentData(data))
    setShowDelete(false)
  }
  
  const updateSubmit = (e)=>{
    e.preventDefault();
    
    const data = {
      id : id,
      studentName : name,
      age : age,
      gender : gender,
      email : email,
      fees : fees,
      course : course,
      joinedDate : joinDate,
      username : username,
      password : password
    }

    dispatch(updateStudentData(data))
    setShowEdit(false)

  }
  
  const checkcredential = localStorage.getItem('credentials')
  
  const serachTerm = new RegExp (search,'gi')
  const checkArray = Array.isArray(studentState) ? studentState : []
  const filteredArray = checkArray.filter((data)=>{
    return serachTerm.test(data.student_name) || serachTerm.test(data.course)
  })
  
  useEffect(()=>{
    if(!checkcredential){
      navigate("/")
    }
  
    // if (Object.keys(selectState).length !== 0){
      setId(selectStudentState[0]?.id)
      setName(selectStudentState[0]?.student_name)
      setGender(selectStudentState[0]?.gender)
      setAge(selectStudentState[0]?.age)
      setEmail(selectStudentState[0]?.email)
      setCourse(selectStudentState[0]?.course)
      setJoinDate(selectStudentState[0]?.joined_date)
      setFees(selectStudentState[0]?.fees)
      setUsername(selectStudentState[0]?.username)
      setPassword(selectStudentState[0]?.password)
    // }
    dispatch(getStudentData())
    dispatch(getcoursedata())
    
  },[checkcredential,selectStudentState,getStudentData])

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
                  { path: "/course", icon:faGraduationCap, text: "Manage Course",textcolor:"text-white"},
                  { path: "/students", icon:faPeopleRoof, text: "Manage Students" },
                  { path: "/shedule", icon:faCalendarDay, text: "Training Shedule",textcolor:"text-white" },
                  { path: "/studentsopt", icon:faTimeline, text: "Students Opt in / out",textcolor:"text-white" },
                ].map((item, index) => (
                  <Nav.Item key={index}>
                    <Nav.Link className={`${item.textcolor} fw-bold ${item.path === "/students" ? "active" : ""}`} onClick={() => navigate(item.path)}>
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
              <h3 className="text-center text-dark fw-bold">Manage Students</h3>
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
                  <Button variant="primary" onClick={() => navigate('/students/addstudents')} className=" text-nowrap">Add Students</Button>
                </Col>
              </Row>
              <div className="table-container overflow-auto" style={{ maxHeight: '400px'}}  >
                <Table  striped hover  className="text-center mb-0 shadow text-nowrap"  >
                  <thead className="table-info position-sticky top-0">
                    <tr>
                      {[
                        "Si.No","Student Name","Gender","Age","Email","Course","Joined Date", "Fees", "Username","Action"
                      ].map((item, index) => (
                        <th key={index}>{item}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredArray.map((data,index) => (
                      <tr key={data.id}>
                        <td>{index + 1}</td>
                       <td>{data.student_name}</td>
                       <td>{data.gender}</td>
                       <td>{data.age}</td>
                       <td>{data.email}</td>
                       <td>{data.course}</td>
                       <td>{data.joined_date}</td>
                       <td>{data.fees}</td>
                       <td>{data.username}</td>
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
            <Modal show={showEdit} onHide={()=>setShowEdit(false)} backdrop={'static'} scrollable>
              <Modal.Header closeButton>
                <Modal.Title>Edit Data</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                    <Container>
                        <Stack gap={3} className='change-size'>
                          <Form.Group  >
                              <InputGroup >
                                  <InputGroup.Text ><FontAwesomeIcon icon={faUser} /></InputGroup.Text>
                                  <Form.Control type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Name' required/>
                              </InputGroup>
                          </Form.Group>
                          <Form.Group >
                              <InputGroup >
                                  <InputGroup.Text ><FontAwesomeIcon icon={faBirthdayCake} /></InputGroup.Text>
                                  <Form.Control type="text" placeholder='Age' value={age} onChange={(e)=>setAge(e.target.value)} required/>
                                  <Form.Control.Feedback type="invalid">
                                      Please provide a valid state.
                                  </Form.Control.Feedback>
                              </InputGroup>
                          </Form.Group>
                          <Form.Group >
                              <InputGroup>
                                  <InputGroup.Text><FontAwesomeIcon icon={faPersonHalfDress} /></InputGroup.Text>
                                  <Form.Check type='radio'  className='mt-2 ms-2' style={{fontSize:'18px'}} label={'Male'}  name='gender' value="Male" checked={gender == "Male" || null} onChange={(e)=>setGender(e.target.value)}  />
                                  <Form.Check type='radio'  className='mt-2 ms-2' style={{fontSize:'18px'}} label={'Female'} name='gender' value="Female" checked={gender == "Female" || null} onChange={(e)=>setGender(e.target.value)} />
                                  <Form.Check type='radio'  className='mt-2 ms-2' style={{fontSize:'18px'}} label={'Other'} name='gender' value="Other" checked={gender == "Other" || null} onChange={(e)=>setGender(e.target.value)}  />
                              </InputGroup>
                          </Form.Group>
                          <Form.Group >
                              <InputGroup >
                                  <InputGroup.Text><FontAwesomeIcon icon={faEnvelope} /></InputGroup.Text>
                                  <Form.Control type="text" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                              </InputGroup>
                          </Form.Group>
                          <Form.Group>
                            <InputGroup>
                              <InputGroup.Text><FontAwesomeIcon icon={faSchool} /></InputGroup.Text>
                              <Form.Select value={course} onChange={(e) => setCourse(e.target.value)}>
                                <option value={course}>{course}</option>
                                {courseState && courseState.map((data)=>(
                                  <option value={data.course}>{data.course}</option>
                                ))}
                              </Form.Select>
                            </InputGroup>
                          </Form.Group>
                          <Form.Group >
                              <InputGroup  >
                                  <InputGroup.Text>Start From</InputGroup.Text>
                                  <Form.Control type="date" placeholder="Join date" value={joinDate} onChange={(e)=>setJoinDate(e.target.value)} />
                              </InputGroup>
                          </Form.Group>
                          <Form.Group>
                              <InputGroup >
                                  <InputGroup.Text><FontAwesomeIcon icon={faMoneyBill} /></InputGroup.Text>
                                  <Form.Control placeholder="Fees" value={fees} onChange={(e)=>setFees(e.target.value)} />
                              </InputGroup>
                          </Form.Group>
                          <Form.Group >
                              <InputGroup >
                                  <InputGroup.Text><FontAwesomeIcon icon={faUser} /></InputGroup.Text>
                                  <Form.Control type="text" placeholder='Username' value={username} onChange={(e)=>setUsername(e.target.value)}  required/>
                              </InputGroup>
                          </Form.Group>
                          <Form.Group >
                              <InputGroup >
                                  <InputGroup.Text><FontAwesomeIcon icon={faLock} /></InputGroup.Text>
                                  <Form.Control type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                              </InputGroup>
                          </Form.Group>
                        </Stack>
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
