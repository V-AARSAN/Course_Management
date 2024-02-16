import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { getadmin, getcoursedata } from '../../../Redux/CourseRedux/ActionType';

export default function Logout({key,logout}) {

  const [formated, setFormated] = useState({ 
      show: true 
  });


  const admin = useSelector((state)=>state.Courses.adminState);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const checkid = JSON.parse(localStorage.getItem("id"))
  const filter = admin.find((data)=>data.id == checkid)

  const handleLogout = (e) =>{
    e.preventDefault();
    localStorage.removeItem("credentials")
    localStorage.removeItem("id")
    navigate("/",{replace:true})

  }

  useEffect(() => {
    dispatch(getcoursedata());
    dispatch(getadmin());
  }, [dispatch, getcoursedata]);

  // console.log(treasurerState.results[0])

 
  return (
    <>
    <Modal key={key} show={formated.show} onHide={()=>logout(false)} backdrop="static" keyboard={false} centered>
        <Modal.Header closeButton>
            <Modal.Title>Treasurer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p><span className="fw-bold pe-2 fs-5">Username :</span> {filter?.email}</p>
            <div className="fs-5 ">
                <form>
                <label className="form-label fw-bold pe-2" id='password'>Password :</label>
                <input type="password" className="border-0" name='password' style={{outlineColor:'white'}} defaultValue={filter?.password} />
                </form>
            </div>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="outline-danger" onClick={handleLogout}>Logout <FontAwesomeIcon icon={faRightFromBracket} /></Button>                </Modal.Footer>
    </Modal>
    </>
  )
}
