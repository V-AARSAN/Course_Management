import { faCheck, faEnvelope, faEye, faEyeSlash, faLock, faMailBulk, faUser, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, FormGroup, InputGroup, Row, Stack, Toast, ToastContainer } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { getadmin, signUp } from '../../../Redux/CourseRedux/ActionType';
import Course from '../Manage/Course';

export default function AdminSignUp() {

    const[visiblePassword,setVisiblePassword] = useState(true)
    const[visibleVerify,setVisibleVerify] = useState(true)
    const[errPassword,setErrPassword] = useState(false)
    const[showToaster, setShowToaster] = useState(false)
    const[showToasterEmpty, setShowToasterEmpty] = useState(false)
    const[name, setName] = useState()
    const[email, setEmail] = useState()
    const[password, setPassword] = useState()
    const[verifyPassword, setVerifyPassword] = useState()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {courseState} = useSelector((State)=>State.Courses)

    const handlsubmit = (e) =>{
        e.preventDefault();
        
        const data = {
            name : name,
            email : email,
            password : password
        }
        if(![email,name,password,verifyPassword].every(field => field?.trim())){
            setShowToasterEmpty(true)
            setTimeout(()=>{
                setShowToasterEmpty(false)
            },[2000])
        }else{
            if(courseState && courseState.message > 0){
                setShowToaster(true)
                setTimeout(()=>{
                    setShowToaster(false)
                },[2000])
            }
            if(courseState && courseState.success ){
                dispatch(signUp(data))
                navigate('/')
            }
        }

        // setToast(true){
        


    }

   
  return (
    <div id='Admin'>
    <Container>
    <ToastContainer  position="top-end" className="p-3 fadeInRight" style={{ zIndex: 1 }}>
                    <Toast show={showToasterEmpty}  >
                        <Toast.Body className="d-flex justify-content-between bg-danger text-white ">"Please fill all the fields"<span  style={{cursor:'pointer'}} className="fw-bold" onClick={()=>setShowToasterEmpty(false)}><FontAwesomeIcon icon={faX}/></span></Toast.Body> 
                    </Toast>
                </ToastContainer>
        <Row className="d-flex align-items-center vh-100">
        <ToastContainer  position="top-end" className="p-3 fadeInRight" style={{ zIndex: 1 }}>
                    <Toast show={showToaster}  >
                        <Toast.Body className="d-flex justify-content-between bg-danger text-white ">{courseState && courseState.message }<span  style={{cursor:'pointer'}} className="fw-bold" onClick={()=>setShowToaster(false)}><FontAwesomeIcon icon={faX}/></span></Toast.Body> 
                    </Toast>
                </ToastContainer>
                    <Col lg={5} md={7} sm={12}  className="mx-auto">
                        <Card className="transparentAdmin shadow-lg" style={{minHeight:'410px'}}>
                            <Form className="text-center p-3"  >
                                <h3 className="fw-bold text-light"><span className="text-decoration-underline">Regist</span>er</h3>
                                <Stack  gap={4} className='p-3'>
                                    <InputGroup>
                                        <InputGroup.Text><FontAwesomeIcon icon={faUser} className='text-primary fs-5' /></InputGroup.Text>
                                        <Form.Control type='text' placeholder='Enter Your Name' onChange={(e)=>setName(e.target.value)}/>
                                    </InputGroup>
                                    <InputGroup>
                                        <InputGroup.Text><FontAwesomeIcon icon={faEnvelope} className='text-primary fs-5'/></InputGroup.Text>
                                        <Form.Control type='text' placeholder='Enter Your Email' onChange={(e)=>setEmail(e.target.value)} />
                                    </InputGroup>
                                    <InputGroup>
                                        <InputGroup.Text><FontAwesomeIcon icon={faLock} className='text-primary fs-5' /></InputGroup.Text>
                                        <Form.Control type={visiblePassword ? "password" : "text"} placeholder='Type Password' onChange={(e)=>setPassword(e.target.value)}/>
                                        <InputGroup.Text ><FontAwesomeIcon icon={visiblePassword ? faEyeSlash : faEye} className={`text-dark cursor`} onClick={()=>setVisiblePassword(!visiblePassword)} /></InputGroup.Text>
                                    </InputGroup>
                                    <InputGroup>
                                        <InputGroup.Text><FontAwesomeIcon icon={faCheck} className='text-primary fs-5'/></InputGroup.Text>
                                        <Form.Control type={visibleVerify ? "password" : "text"}  placeholder='Re-type Password' onChange={(e)=>setVerifyPassword(e.target.value)}/>
                                        <InputGroup.Text><FontAwesomeIcon icon={visibleVerify ? faEyeSlash : faEye} className={`text-dark cursor`} onClick={()=>setVisibleVerify(!visibleVerify)} /></InputGroup.Text>
                                        {errPassword && <p>two password not matching</p>}
                                    </InputGroup>
                                <div>
                                    <Button variant="success"  type="submit" className="ps-4 pe-4 fw-bold fw-bold" onClick={handlsubmit}   >SignUp</Button> 
                                </div>
                                </Stack>
                                <p className="text-white">Already have an account?<Link to={'/'} className="text-decoration-underline text-primary fw-bold cursor" >SignIn</Link></p>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
    </div>
  )
}
