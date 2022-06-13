import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { AuthTypes } from '../Redux/action_types/auth_types';
import { Button } from 'react-bootstrap';


const Login = () => {
    const[state,setState]=useState({
        data:'123',
        showError: false
    })
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const submit =()=>{
    dispatch({
        type:AuthTypes. LOGIN_REQUEST,
        callback: (value) =>{
            if(value){
                navigate("/Dashboard");
            }
        },
    })
  }

 

return(
    <div>
        <Button type="submit" onClick={submit}>Login</Button>
    </div>
)
}

export default Login;

