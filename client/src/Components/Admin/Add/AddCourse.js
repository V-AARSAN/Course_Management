import React, {  useEffect, useState } from 'react';
import '../assets/Css/Admin.css';
import {Container,Row,Col,Card, Form,Stack,InputGroup,Button, FormGroup, ToastContainer, Toast} from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { addCourse, getcoursedata } from '../../../Redux/CourseRedux/ActionType';
import { getStudentData } from '../../../Redux/StudentRedux/ActionType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

export default function AddCourse() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const[course, setCourse] = useState()
    const[fees, setFees] = useState()
    const[duration, setDuration] = useState()
    const[showToaster, setShowToaster] = useState(false)
    const checkcredential = localStorage.getItem('credentials')


    const hanldesubmit = (e) =>{
        e.preventDefault();

        const data = {
            course : course,
            fees : fees,
            duration : duration
        }
        if (![course,fees,duration].every(field => field?.trim())){
            setShowToaster(true)
            setTimeout(()=>{
                setShowToaster(false)
            },[2000])
        }else{
            dispatch(addCourse(data))
            navigate('/course')
        }
    }

    useEffect(()=>{
        if(!checkcredential){
          navigate("/")
        }
        dispatch(getStudentData())
        dispatch(getcoursedata())
        
      },[checkcredential,getcoursedata,getStudentData])

    
  return (
      <>
        <div id='addBackground'>
            <Container>
            <ToastContainer  position="top-end" className="p-3 fadeInRight" style={{ zIndex: 1 }}>
                <Toast show={showToaster}  >
                    <Toast.Body className="d-flex justify-content-between bg-danger text-white ">"Please fill all the fields"<span  style={{cursor:'pointer'}} className="fw-bold" onClick={()=>setShowToaster(false)}><FontAwesomeIcon icon={faX}/></span></Toast.Body> 
                </Toast>
            </ToastContainer>
                <Row className="d-flex align-items-center vh-100">
                    <Col lg={5}  md={8} sm={12}  className="mx-auto" >
                        <Card className='addtransparent'>
                            <Form  className='shadow bg-transparent' onSubmit={hanldesubmit} >
                                <Container>
                                    <Stack gap={3} className="m-4">
                                        <h3 className='text-primary fw-bold'><span className="text-decoration-underline ">Add Cou</span>rse</h3>
                                        <FormGroup>
                                            <InputGroup>
                                                <InputGroup.Text style={{padding:'0 17px'}}>Course</InputGroup.Text>
                                                <Form.Control type='text' placeholder='type course' onChange={(e)=>setCourse(e.target.value)} />
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <InputGroup>
                                                <InputGroup.Text style={{padding:'0 26px'}}>Fees</InputGroup.Text>
                                                <Form.Control type='text' placeholder='type fees' onChange={(e)=>setFees(e.target.value)} />
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <InputGroup>
                                                <InputGroup.Text style={{padding:'0 10px'}}>Duration</InputGroup.Text>
                                                <Form.Select onChange={(e)=>setDuration(e.target.value)} >
                                                    <option>Select Duration</option>
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
                                        <div className="text-end">
                                        <Button type="submit" variant="danger" onClick={()=>navigate('/course')} className='mx-2' >Close</Button> 
                                        <Button type="submit" variant="primary" >Submit</Button> 
                                    </div>
                                    </Stack>
                                    {/* {validate && <p className="text-center text-danger">{Error}</p>} */}
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
