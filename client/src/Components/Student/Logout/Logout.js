import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { getcoursedata } from '../../../Redux/CourseRedux/ActionType';
import { getStudentData } from '../../../Redux/StudentRedux/ActionType';

export default function Logout({key,logout,username,password}) {

  const [formated, setFormated] = useState({ 
      show: true 
  });

  const {studentState} = useSelector((state)=>state.Students);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = (e) =>{
    e.preventDefault();
    localStorage.removeItem("student")
    localStorage.removeItem("id")
    navigate("/usersignin",{replace:true})

  }

  const checkstudent = JSON.parse(localStorage.getItem('id'))
  const studentdata = studentState.find((data)=>data.id == checkstudent)
console.log(studentdata)

  useEffect(()=>{
    dispatch(getcoursedata())
    dispatch(getStudentData())
    
  },[getcoursedata])
  
  
  return (
    <>
    <Modal key={key} show={formated.show} onHide={()=>logout(false)} backdrop="static" keyboard={false} centered>
        <Modal.Header closeButton>
            <Modal.Title>Treasurer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p><span className="fw-bold pe-2 fs-5">Username :</span> {studentdata?.email}</p>
            <div className="fs-5 ">
                <form>
                <label className="form-label fw-bold pe-2" id='password'>Password :</label>
                <input type="password" className="border-0" name='password' style={{outlineColor:'white'}} defaultValue={studentdata?.password} />
                </form>
            </div>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="outline-danger" onClick={handleLogout}>Logout <FontAwesomeIcon icon={faRightFromBracket} /></Button></Modal.Footer>
    </Modal>
    </>
  )
}
