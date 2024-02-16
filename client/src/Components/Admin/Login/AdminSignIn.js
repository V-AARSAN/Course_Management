import React, { useEffect, useRef, useState } from "react";
import { Button, ButtonGroup, ButtonToolbar, Card, Col, Container, Form, FormGroup, InputGroup, Row, Stack, Toast, ToastContainer } from "react-bootstrap";
import {  faEye, faEyeSlash, faX} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../assets/Css/Admin.css';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getadmin, getcoursedata, signIn } from "../../../Redux/CourseRedux/ActionType";


export default function AdminSignIn(){

  const[visible, setVisible] = useState(false)
  const[showToaster, setShowToaster] = useState(false)
  const[showToasterEmpty, setShowToasterEmpty] = useState(false)
  const[email , setEmail] = useState()
  const[password , setPassword] = useState()
  const navigate = useNavigate()
  const {sign,studentSign} = useSelector((State)=>State.Courses)
  const dispatch = useDispatch()

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
        dispatch(signIn(data))
        if(sign && sign.message){
            setShowToaster(true)
            setTimeout(()=>{
                setShowToaster(false)
            },[2000])
        }
    }
   
  }
    // console.log(signIn.results)
  useEffect(()=>{
    if (sign && sign.success){
        localStorage.setItem("credentials",JSON.stringify(sign.success))
        localStorage.setItem("id",JSON.stringify(sign.id))
        navigate('/course')
   }
    dispatch(getcoursedata())
    dispatch(getadmin())
    
  },[sign,getcoursedata,getadmin,dispatch])


  console.log(sign)
    return(
        <>
        {/*========== Login Form section  =============  */}

        <div id="Admin">
            <ToastContainer  position="top-end" className="p-3 fadeInRight" style={{ zIndex: 1 }}>
                    <Toast show={showToaster} className={sign && sign.message ? "bg-danger" : "bg-success"} >
                        <Toast.Body className="d-flex justify-content-between text-white">{sign && sign.message   }<span  style={{cursor:'pointer'}} className="fw-bold" onClick={()=>setShowToaster(false)}><FontAwesomeIcon icon={faX}/></span></Toast.Body> 
                    </Toast>
                </ToastContainer>
                <ToastContainer  position="top-end" className="p-3 fadeInRight" style={{ zIndex: 1 }}>
                    <Toast show={showToasterEmpty}  >
                        <Toast.Body className="d-flex justify-content-between bg-danger text-white ">"Please fill all the fields"<span  style={{cursor:'pointer'}} className="fw-bold" onClick={()=>setShowToasterEmpty(false)}><FontAwesomeIcon icon={faX}/></span></Toast.Body> 
                    </Toast>
                </ToastContainer>
            <Container>
                <Row className="d-flex align-items-center vh-100">
                    <Col lg={5} md={7} sm={12}  className="mx-auto">
                        <Card className="transparentAdmin shadow-lg" style={{minHeight:'410px'}}>
                            <Form className="text-center p-3" onSubmit={handlesubmit} >
                                <Stack  gap={3}>
                                <ButtonGroup className="adminbutton">
                                    <Button size="sm" variant="danger" className="border" onClick={()=>navigate('/')}><h5 className="fw-bold" ><span className="text-decoration-underline">Adm</span>in</h5></Button>
                                    <Button size="sm" variant="light" className="border" onClick={()=>navigate('/usersignin')}><h5 className="fw-bold  rounded"><span className="text-decoration-underline">Stud</span>ent</h5></Button>
                                </ButtonGroup>
                                    <div className="text-center">
                                    <img src={require("../assets/images/Logo.png")} alt="user png" width={'100px'} height={'100px'}/>
                                    </div>
                                    <FormGroup className="ps-5 pe-5 ">
                                        <Col>
                                            <Form.Control type="text" placeholder="Admin Id" className="text-center  shadow-sm" onChange={(e)=>setEmail(e.target.value)}  />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup className="ps-5 pe-5 ">
                                        <Col >
                                            <InputGroup>
                                            <Form.Control type={visible ? "text" : "password"} placeholder="Admin Password" className="text-center ps-5 shadow-sm" onChange={(e)=>setPassword(e.target.value)}  />
                                            <InputGroup.Text><FontAwesomeIcon icon={visible ? faEye : faEyeSlash} className={`"text-dark" cursor`} onClick={()=>setVisible(!visible)} /></InputGroup.Text>
                                            </InputGroup>
                                        </Col>
                                    </FormGroup>
                                    <div>
                                        <Button variant="success" type="submit" className="ps-4 pe-4 fw-bold fw-bold" >Sign In</Button> 
                                    </div>
                                    <p className="text-white">Don't you have an account?<Link to={'/signup'} className="text-decoration-underline text-primary fw-bold cursor">SignUp</Link></p>
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