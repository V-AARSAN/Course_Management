import { faBirthdayCake, faEnvelope, faGenderless, faMoneyBill, faPersonHalfDress, faPhone, faSchool, faUser, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useEffect, useState } from 'react';
import '../assets/Css/Student.css';
import {Container,Row,Col,Card, Form,Stack,InputGroup,Button, FormGroup, ToastContainer, Toast} from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom';
import { addStudent, getStudentData } from '../../../Redux/StudentRedux/ActionType';
import { useDispatch, useSelector } from 'react-redux';
import { getcoursedata } from '../../../Redux/CourseRedux/ActionType';


export default function UserRegister() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
  const {courseState} = useSelector((state)=>state.Courses)
  const {studentState} = useSelector((state)=>state.Students)
    const[name, setName] = useState()
    const[age, setAge] = useState()
    const[gender, setGender] = useState()
    const[email, setEmail] = useState()
    const[fees, setFees] = useState()
    const[course, setCourse] = useState()
    const[joinDate, setJoinDate] = useState()
    const[username, setUsername] = useState()
    const[password, setPassword] = useState()
    const [showToaster, setShowToaster] = useState(false);
    const [showToasterEmpty, setShowToasterEmpty] = useState(false);

    const hanldesubmit = (e) => {
        e.preventDefault();
    
        const data = {
            studentName: name,
            age: age,
            gender: gender,
            email: email,
            fees: fees,
            course: course,
            joinedDate: joinDate,
            username: username,
            password: password
        };
    
        if (![name, age, gender, email, fees, course, joinDate, username, password].every(field => field?.trim())) {
            setShowToaster(true);
            setTimeout(() => {
                setShowToaster(false);

            }, 2000);
        } else {
            dispatch(addStudent(data));
            if (studentState && studentState.message) {
                setShowToasterEmpty(true);
                setTimeout(() => {
                    setShowToasterEmpty(false);
                }, 2000);
            }else {
                // it navigate ti sigin
                navigate('/usersignin')
            }
        }
    };

    console.log(studentState.message)

        useEffect(()=>{
           
            dispatch(getStudentData())
            dispatch(getcoursedata())
            
        },[getcoursedata,getStudentData])



  return (
      <>
        <div id='bg-image'>
            <Container>
            <ToastContainer  position="top-end" className="p-3 fadeInRight" style={{ zIndex: 1 }}>
                    <Toast show={showToaster}  >
                        <Toast.Body className="d-flex justify-content-between bg-danger text-white ">"Please fill all the fields"<span  style={{cursor:'pointer'}} className="fw-bold" onClick={()=>setShowToaster(false)}><FontAwesomeIcon icon={faX}/></span></Toast.Body> 
                    </Toast>
                </ToastContainer>
                <ToastContainer  position="top-end" className="p-3 fadeInRight" style={{ zIndex: 1 }}>
                    <Toast show={showToasterEmpty} className={"bg-danger" } >
                        <Toast.Body className="d-flex justify-content-between text-white">{studentState && studentState.message  }<span  style={{cursor:'pointer'}} className="fw-bold" onClick={()=>setShowToasterEmpty(false)}><FontAwesomeIcon icon={faX}/></span></Toast.Body> 
                    </Toast>
                </ToastContainer>
                <Row className="d-flex align-items-center vh-100">
                    <Col lg={8}  md={8} sm={12}  className="mx-auto" >
                        <Card className='addtransparent'>
                            <Form  className='shadow bg-transparent' onSubmit={hanldesubmit}  >
                                <Container>
                                    <Stack gap={2} className="m-4">
                                        <h3 className='fw-bold text-warning'><span className="text-decoration-underline ">Reg</span>ister</h3>
                                        <Row>
                                            <Col lg={6} md={6} >
                                                <Form.Group className="m-1">
                                                    <InputGroup >
                                                        <InputGroup.Text ><FontAwesomeIcon icon={faUser} /></InputGroup.Text>
                                                        <Form.Control type="text" placeholder='Name' onChange={(e)=>setName(e.target.value)}  />
                                                    </InputGroup>
                                                </Form.Group>
                                            </Col>
                                            <Col lg={6} md={6} >
                                                <Form.Group className="m-1">
                                                    <InputGroup >
                                                        <InputGroup.Text ><FontAwesomeIcon icon={faBirthdayCake} /></InputGroup.Text>
                                                        <Form.Control type="text" placeholder='Age'  onChange={(e)=>setAge(e.target.value)}  />
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide a valid state.
                                                        </Form.Control.Feedback>
                                                    </InputGroup>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        
                                        <Row>
                                            <Col>
                                                <Form.Group className="m-1 fw-bold">
                                                    <InputGroup>
                                                        <InputGroup.Text><FontAwesomeIcon icon={faPersonHalfDress} /></InputGroup.Text>
                                                        <Form.Check type='radio'  className='mt-2 ms-2' style={{fontSize:'18px'}} label={'Male'}  name='gender' value="Male"  onChange={(e)=>setGender(e.target.value)} />
                                                        <Form.Check type='radio'  className='mt-2 ms-2' style={{fontSize:'18px'}} label={'Female'} name='gender' value="Female" onChange={(e)=>setGender(e.target.value)}/>
                                                        <Form.Check type='radio'  className='mt-2 ms-2' style={{fontSize:'18px'}} label={'Other'} name='gender' value="Other" onChange={(e)=>setGender(e.target.value)} />
                                                    </InputGroup>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={6} md={6} sm={12}>
                                                <Form.Group className="m-1">
                                                    <InputGroup >
                                                        <InputGroup.Text><FontAwesomeIcon icon={faEnvelope} /></InputGroup.Text>
                                                        <Form.Control type="text" placeholder='Email' onChange={(e)=>setEmail(e.target.value)}  />
                                                    </InputGroup>
                                                </Form.Group>
                                            </Col>
                                            <Col lg={6} md={6} sm={12}>
                                                <Form.Group className="m-1">
                                                    <InputGroup >
                                                        <InputGroup.Text><FontAwesomeIcon icon={faSchool} /></InputGroup.Text>
                                                        <Form.Select onChange={(e)=>setCourse(e.target.value)}>
                                                            <option selected>Select Course Type</option>
                                                            {courseState && courseState.map((data)=>(
                                                            <option value={data.course}>{data.course}</option>
                                                            ))}
                                                        </Form.Select>
                                                    </InputGroup>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={6} md={6} sm={12}>
                                                <Form.Group className="m-1">
                                                    <InputGroup  >
                                                        <InputGroup.Text>Start From</InputGroup.Text>
                                                        <Form.Control type="date" placeholder="Join date" onChange={(e)=>setJoinDate(e.target.value)} />
                                                    </InputGroup>
                                                </Form.Group>
                                            </Col>
                                            <Col lg={6} md={6} sm={12}>
                                                <Form.Group className="m-1">
                                                    <InputGroup >
                                                        <InputGroup.Text><FontAwesomeIcon icon={faMoneyBill} /></InputGroup.Text>
                                                        <Form.Control placeholder="Fees" onChange={(e)=>setFees(e.target.value)} />
                                                    </InputGroup>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={6} md={6} sm={12}>
                                                <Form.Group className="m-1">
                                                    <InputGroup >
                                                        <InputGroup.Text><FontAwesomeIcon icon={faUser} /></InputGroup.Text>
                                                        <Form.Control type="text" placeholder='Username' onChange={(e)=>setUsername(e.target.value)}   />
                                                    </InputGroup>
                                                </Form.Group>
                                            </Col>
                                            <Col lg={6} md={6} sm={12}>
                                                <Form.Group className="m-1">
                                                    <InputGroup >
                                                        <InputGroup.Text><FontAwesomeIcon icon={faUser} /></InputGroup.Text>
                                                        <Form.Control type="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)}  />
                                                    </InputGroup>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <div className="text-end">
                                            <Button variant="danger" onClick={()=>navigate('/usersignin ')} className='mx-2' >Close</Button> 
                                            <Button type="submit" variant="primary" >Submit</Button> 
                                        </div>
                                    </Stack>
                                    <p className="text-white text-center ">Already have an account?<span onClick={()=>navigate('/usersignin')} className="text-decoration-underline text-warning fw-bold cursor">SignIn</span></p>

                                </Container>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
        </>
  )
}
