import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { DashboardTypes } from '../Redux/action_types/dashboard_types';
import '../Styles/style.css';
import Logout from './logout';

//get user by id
// https://reqres.in/api/users/2

const Profile = () => {
  const dashboardReduxData = useSelector((state) => state.Dashboard);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { id } = useParams();

  const getData = async () => {
    // const url=`https://reqres.in/api/users/${id}`
    // const res= await axios.get(url)


    dispatch({
      type: DashboardTypes.PERSON_REQUST, data: { id },
      callback: () => {

      },

    })

  }

  useEffect(() => {
    getData();
  }, [id])

  const user = dashboardReduxData.Persondata;
  console.log("list", user)
  return (
    <div>
      <Logout />
    <div className='flx'>
      <h2 className='user_dtsr center'>Profile Details</h2>

      {
        user && <div className='user_dts center'>
          <div className='center'><img className='img_rad' src={user.avatar}/></div>
          <div className='center'>First Name:<span className="text">fsdfgsdfg</span></div>
          <div className='center text2'>Last Name:<span className="text ">{user.last_name}</span></div>
          <div className='center'>Email:<span className="text">{user.email}</span></div>
        </div>
      }

    </div>
    <a className='center2' href='' onClick={() => navigate('/dashboard')}>Back to Dashboard Page</a>
    </div>
  )
}

export default Profile;
