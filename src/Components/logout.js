import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { AuthTypes } from '../Redux/action_types/auth_types';
import '../Styles/style.css'

const Logout = () => {
    const[state,setState]=useState(true)

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const Logout = () => {
        dispatch({
            type: AuthTypes.LOGOUT_REQUEST,
            callback: () => {
                navigate("/login");
            }
        })

    }
    const hide=()=>{
        setState(false)
    }
    return (
        <div>
            <Button variant='primary' className='logout' onClick={Logout}>Logout</Button>
            <Button onClick={hide}>hide</Button>
            {
                state&&<div>dsfdfgd</div>
            }

        </div>
    )
}

export default Logout
