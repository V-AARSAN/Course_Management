import { faEye, faEyeSlash, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Card, Col, Container, Form, FormGroup, InputGroup, Row, Stack, Toast, ToastContainer } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import "../assets/Css/Student.css";
import { useDispatch, useSelector } from 'react-redux';
import { studentSignIn } from '../../../Redux/CourseRedux/ActionType';

export default function UserSignIn() {
 
    const[visible, setVisible] = useState(true)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const[showToasterEmpty, setShowToasterEmpty] = useState(false)
    const[showToaster, setShowToaster] = useState(false)
    const {studentSign} = useSelector((state)=>state.Courses)

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    
    const handlesubmit = (e) =>{
        e.preventDefault();
    
        const data = {
            email:email,
            password:password
        }
        if (![email,password].every( field => field?.trim())){
            setShowToasterEmpty(true)
            setTimeout(()=>{
                setShowToasterEmpty(false)
            },[2000])
        }else{
            dispatch(studentSignIn(data))
            if(studentSign && studentSign.message){
                setShowToaster(true)
                setTimeout(()=>{
                    setShowToaster(false)
                },[2000])
            }
        }
    }

      useEffect(()=>{
        if (studentSign && studentSign.student == true){
            localStorage.setItem("student",JSON.stringify(studentSign.student))
            localStorage.setItem("id",JSON.stringify(studentSign.id))
            navigate( "/usersignin/studentdetail" ) 
        }
      },[studentSign])

      return(
          <>
          {/*========== Login Form section  =============  */}
  
          <div id="bg-image">
              <Container>
              <ToastContainer  position="top-end" className="p-3 fadeInRight" style={{ zIndex: 1 }}>
                    <Toast show={showToasterEmpty}  >
                        <Toast.Body className="d-flex justify-content-between bg-danger text-white ">"Please fill all the fields"<span  style={{cursor:'pointer'}} className="fw-bold" onClick={()=>setShowToasterEmpty(false)}><FontAwesomeIcon icon={faX}/></span></Toast.Body> 
                    </Toast>
                </ToastContainer>
                <ToastContainer  position="top-end" className="p-3 fadeInRight" style={{ zIndex: 1 }}>
                    <Toast show={showToaster} className={studentSign && studentSign.message ? "bg-danger" : "bg-success"} >
                        <Toast.Body className="d-flex justify-content-between text-white">{studentSign && studentSign.message   }<span  style={{cursor:'pointer'}} className="fw-bold" onClick={()=>setShowToaster(false)}><FontAwesomeIcon icon={faX}/></span></Toast.Body> 
                    </Toast>
                </ToastContainer>
                  <Row className="d-flex align-items-center vh-100">
                      <Col lg={5} md={7} sm={12}  className="mx-auto">
                          <Card className="transparent shadow-lg " style={{minHeight:'410px'}}>
                              <Form className="text-center p-3" onSubmit={handlesubmit}>
                                  <Stack  gap={3}>
                                  <ButtonGroup>
                                    <Button size="sm" variant='light' className="border" onClick={()=>navigate('/')}><h5 className="fw-bold" ><span className="text-decoration-underline">Adm</span>in</h5></Button>
                                    <Button size="sm" variant='danger' className="active-color hover border" onClick={()=>navigate('/usersignin')}><h5 className="fw-bold rounded"><span className="text-decoration-underline">Stud</span>ent</h5></Button>
                                  </ButtonGroup>
                                       <div className="text-center">
                                       <img src={require("../assets/images/pngegg.png")} alt="user png" width={'100px'} height={'100px'}/>
                                      </div>
                                      <FormGroup className="ps-5 pe-5 ">
                                          <Col>
                                              <Form.Control type="text" placeholder="User Id" className="text-center shadow-sm"   onChange={(e)=>setEmail(e.target.value)}/>
                                          </Col>
                                      </FormGroup>
                                      <FormGroup className="ps-5 pe-5">
                                          <Col >
                                              <InputGroup>
                                              <Form.Control type={visible ? "password" : "text"} placeholder="User Password" className="text-center ps-5 shadow-sm" onChange={(e)=>setPassword(e.target.value)}   />
                                              <InputGroup.Text><FontAwesomeIcon icon={visible ? faEyeSlash : faEye} className={`${visible ? "text-dark" : "text-danger"} cursor`} onClick={()=>setVisible(!visible)} /></InputGroup.Text>
                                              </InputGroup>
                                          </Col>
                                      </FormGroup>
                                      <div>
                                          <Button variant="success"  type="submit" className="ps-4 pe-4 fw-bold fw-bold" >Sign In</Button> 
                                      </div>
                                      <p className="text-white">Don't you have an account?<Link to={'/register'} className="text-decoration-underline text-warning fw-bold cursor">SignUp</Link></p>
                                  </Stack>
                              </Form>
                          </Card>
                      </Col>
                  </Row>
              </Container>
          </div>
          </>
      )
  }