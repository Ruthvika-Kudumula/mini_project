import React from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { AuthTypes } from '../Redux/action_types/auth_types';
import '../Styles/style.css'

const Logout = () => {
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
    return (
        <div>
            <Button variant='primary' className='logout' onClick={Logout}>Logout</Button>

        </div>
    )
}

export default Logout
