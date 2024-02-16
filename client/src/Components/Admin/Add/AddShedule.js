import { faBirthdayCake, faEnvelope, faGenderless, faMoneyBill, faPersonHalfDress, faPhone, faSchool, faUser, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import '../assets/Css/Admin.css';
import {Container,Row,Col,Card, Form,Stack,InputGroup,Button, FormGroup, Toast, ToastContainer} from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getcoursedata } from '../../../Redux/CourseRedux/ActionType';
import { addshedule } from '../../../Redux/SheduleRedux/ActionType';


export default function AddShedule() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {courseState} = useSelector((state)=>state.Courses)

    const checkcredential = localStorage.getItem('credentials')

    const [course, setCourse] = useState()
    const [date, setDate] = useState()
    const [startTime, setStartTime] = useState()
    const [endTime, setEndTime] = useState()
    const [venue, setVenue] = useState()
    const[showToaster, setShowToaster] = useState(false)


    const hanldesubmit = (e) =>{
        e.preventDefault();

        const data = {
            course: course,
            date: date,
            starttime: startTime,
            endtime: endTime,
            venue: venue
          };
        if (![course,date,startTime,endTime,venue].every( field => field?.trim())){
            setShowToaster(true)
            setTimeout(()=>{
                setShowToaster(false)
            },[2000])
        }else{
            dispatch(addshedule(data))
            navigate('/shedule')
        }

    }


    useEffect(()=>{
        if(!checkcredential){
          navigate("/")
        }
        dispatch(getcoursedata())
        
    },[checkcredential,getcoursedata])

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
                                        <h3 className='text-primary fw-bold'><span className="text-decoration-underline ">Add Shedu</span>le</h3>
                                        <FormGroup>
                                            <InputGroup>
                                                <InputGroup.Text style={{padding:'0 17px'}}>Course</InputGroup.Text>
                                                <Form.Select onChange={(e)=>setCourse(e.target.value)}>
                                                    <option>Select Course</option>
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
                                                <Form.Control type='date' onChange={(e)=>setDate(e.target.value)}/>
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                        <InputGroup>
                                            <InputGroup.Text style={{padding:'0 7px'}}>Start Time</InputGroup.Text>
                                            <Form.Control type='time' onChange={(e)=>setStartTime(e.target.value)} />
                                        </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <InputGroup>
                                                <InputGroup.Text style={{padding:'0 10px'}}>End Time</InputGroup.Text>
                                                <Form.Control type='time' onChange={(e)=>setEndTime(e.target.value)} />
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <InputGroup>
                                                <InputGroup.Text style={{padding:'0 20px'}}>Venue</InputGroup.Text>
                                                <Form.Control type='text' placeholder='enter venue' onChange={(e)=>setVenue(e.target.value)} />
                                            </InputGroup>
                                        </FormGroup>
                                        <div className="text-end">
                                        <Button type="submit" variant="danger" onClick={()=>navigate('/shedule')} className='mx-2' >Close</Button> 
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
