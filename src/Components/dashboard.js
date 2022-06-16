import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthTypes } from '../Redux/action_types/auth_types';
import { DashboardTypes } from '../Redux/action_types/dashboard_types';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import '../Styles/style.css'
import ModelforAdd from '../Shared/ModalforAdd';
import Logout from './logout';



const Dashboard = () => {
  const dashboardReduxData = useSelector((state) => state.Dashboard);
  const [show, setShow] = useState(false);
  const [userid, setUserId] = useState()
  const [deleteUser, setDeleteUser] = useState(false)
  const [data, setData] = useState();
  const [deleteUserFirstName, setDeleteUserFirstName] = useState()
  const [deleteUserLastName, setDeleteUserLastName] = useState()
  const handleClose1 = () => setShow(false);

  const dispatch = useDispatch()
  const navigate = useNavigate();


  const handleShow = (obj) => {
    setData(obj)
    setState(obj)
    setShow(true);
  };

  const [state, setState] = useState({
    id: '',
    email: '',
    first_name: '',
    last_name: ''
  })
  const [error, setError] = useState({
    errors: {
      first_name: '',
      last_name: '',
      email: ''
    }
  })
  const getInput = (e) => {
    state[e.target.name] = e.target.value;
    const { errors } = error
    if (state.first_name) {
      errors.first_name =""
    }
    if (state.last_name) {
      errors.last_name =""
    }
    if (state.email) {
      errors.email =""
    }
    setState({ ...state, [e.target.name]: e.target.value })
    setError({ ...error, errors: errors })
  }


  console.log('obj', data);
  const handleClose = (e) => {
    const { errors } = error
    if (!state.first_name) {
      errors.first_name = "Enter first name"
    }
    else {
      errors.first_name = ""
    }
    if (!state.last_name) {
      errors.last_name = "Enter last name"
    }
    else {
      error.errors.last_name = ""
    }
    if (!state.email) {
      errors.email = "Enter email"
    }
    else if (state.email && !(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(state.email))) {
      errors.email = "Invalid Email"
    }
    else {
      errors.email = ""
    }
    if (state.first_name && state.last_name && state.email && !error.errors.email) {
      
      const getIndex = list.findIndex((list) => list.id == state.id)
      list[getIndex] = state
      console.log("edit", list);
      setShow(false)
    }
    setError({ ...error, errors: errors })

  };


  const HandleDelete = (index) => {
    console.log('del', index)

    setDeleteUserFirstName(index.first_name)
    setDeleteUserLastName(index.last_name)
    setUserId(index.id)
    setDeleteUser(true)
  }

  const HandleBack = () => {
    // setDeleteUser(false)


  }
  const close=()=>{
    setShow(true);
}

  const handledeletClose = (index) => {
    setDeleteUser(false)

    console.log('du', index)

    // const name = list.splice(id, 1);
    // setRows(name);
    const newUserList = list.filter((each) => each.id !== userid)

    console.log('dn', newUserList)
    dispatch({
      type: DashboardTypes.DELETE_USER_SUCCESS,
      data: newUserList,
      // callback:()=>{
      //   navigate('/dashboard')
      // }
    })
  }








  const getUserData = () => {
    dispatch({
      type: DashboardTypes.USER_DATA_REQUEST,
    })

  }
  useEffect(() => {
    getUserData()
  }, [])





  // console.log(dashboardReduxData.UserDataRequests)
  const list = dashboardReduxData.UserDataRequests;


  return (
    <div className='flx'>
      <h1 className='user_dtsr center'>Dashboard</h1>
      <ModelforAdd />
      <Logout />

      <div className='innerdiv'>
        <table className="table table-striped">
          <thead className="thead-dark text-center">


            <tr>
              <th>Profile</th>
              <th>First  Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>

            {

              list && list.map((data, index) => {
                return (

                  <tr key={index} >
                    <td onClick={() => navigate(`/dashboard/${data.id}`)}><img className='img_rad2' src={data.avatar} /></td>
                    <td onClick={() => navigate(`/dashboard/${data.id}`)}>{data.first_name}</td>
                    <td onClick={() => navigate(`/dashboard/${data.id}`)}>{data.last_name}</td>
                    <td onClick={() => navigate(`/dashboard/${data.id}`)}>{data.email}</td>
                    <td> <Button variant="primary" onClick={() => handleShow(data)}>Edit</Button></td>
                    <td> <Button variant="danger" onClick={() => HandleDelete(data)}>Delete</Button></td>
                    {<Modal show={deleteUser}>
                      <Modal.Header>
                        <Modal.Title >Delete</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <p>Are you sure you want to delete </p>
                        <div>{deleteUserFirstName} {deleteUserLastName} </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant='primary' onClick={HandleBack}>Go Back</Button>
                        <Button variant="danger" onClick={handledeletClose}>
                          Delete
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    }
                  </tr>
                );
              }
              )
            }
          </tbody>

        </table>








        {data && (<Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Modal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>

              {
                !error.errors.first_name ?
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label >First Name</Form.Label>
                    <Form.Control onChange={getInput} name='first_name' value={state.first_name} type="text" placeholder="FirstName" autoFocus></Form.Control>
                  </Form.Group>
                  :
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label >First Name</Form.Label>
                    <Form.Control className="border border-danger" onChange={getInput} name='first_name' value={state.first_name} type="text" placeholder="FirstName" autoFocus></Form.Control>
                  </Form.Group>

              }
              {
                error.errors.first_name &&
                <span style={{ color: "red" }}>{error.errors.first_name}</span>
              }

              {
                !error.errors.last_name ?
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control name='last_name' value={state.last_name} onChange={getInput} type="text" placeholder="LastName" autoFocus></Form.Control>
                  </Form.Group>
                  :
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control className="border border-danger" name='last_name' value={state.last_name} onChange={getInput} type="text" placeholder="LastName" autoFocus></Form.Control>
                  </Form.Group>

              }
              {
                error.errors.last_name &&
                <span style={{ color: "red" }}>{error.errors.last_name}</span>
              }
              {
                !error.errors.email ?
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={getInput} name='email' value={state.email} type="text" autoFocus></Form.Control>
                  </Form.Group>
                  :
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control className="border border-danger" onChange={getInput} name='email' value={state.email} type="text" autoFocus></Form.Control>
                  </Form.Group>

              }
              {
                error.errors.email &&
                <span style={{ color: "red" }}>{error.errors.email}</span>
              }
            </Form>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}> Close</Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>)}


      </div>
    </div>
  )
}

export default Dashboard;