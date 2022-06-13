import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { DashboardTypes } from '../Redux/action_types/dashboard_types'



const Profile = () => {
  const dashboardReduxData = useSelector((state) => state.Dashboard);

  const dispatch = useDispatch();
  const { id } = useParams();

  const getData = async () => {
 


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
    <div className='flx'>

      {
        user && <div className='user_dts center'>
          <div>First Name:{user.first_name}</div>
          <div>Last Name:{user.last_name}</div>
          <div>Email:{user.email}</div>

        
        
        </div>
        

      }


    </div>
  )
}

export default Profile;
