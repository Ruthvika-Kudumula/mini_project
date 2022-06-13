import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthTypes } from '../Redux/action_types/auth_types';
import { DashboardTypes } from '../Redux/action_types/dashboard_types';
import {Button,Modal,Form, Table} from 'react-bootstrap';
import '../Styles/style.css'
import ModelforAdd from '../Shared/ModalforAdd';


  
const Dashboard = () => {
  const dashboardReduxData = useSelector((state) => state.Dashboard);
  const [show, setShow] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false)
  const [data, setData] = useState();
  const [deleteUserFirstName,setDeleteUserFirstName]=useState()
  const [deleteUserLastName,setDeleteUserLastName]=useState()
  const [form, setForm] = useState()

  const dispatch = useDispatch()
  const navigate = useNavigate();


  const handleShow = (obj) => {
    setData(obj)
    setShow(true);
  };
  const handleClose = (e) => {
    setShow(false)
  };


  const HandleDelete = (index) =>{
    console.log(index)

    setDeleteUserFirstName(index.first_name)
    setDeleteUserLastName(index.last_name)
 
    setDeleteUser(true)
  }

  const HandleBack =()=>{
    setDeleteUser(false)

  }

  const handledeletClose = (id) => {
    setDeleteUser(false)
    console.log(id)

    const name = list.splice(id, 1);
    setRows(name);
  }

  const HandleFormData = (e) => {
    console.log(e)
  }






  const getUserData = () => {
    dispatch({
      type: DashboardTypes.USER_DATA_REQUEST,
    })

  }
  useEffect(() => {
    getUserData()
  }, [])

  const [rows, setRows] = useState([
  ]);



  // console.log(dashboardReduxData.UserDataRequests)
  const list = dashboardReduxData.UserDataRequests;

  const Logout = () => {
    dispatch({
      type: AuthTypes.LOGOUT_REQUEST,
      callback: () => {
        navigate("/login");
      }
    })

  }
  return (
    <div className='flx'>
      <h1>Dashboard</h1>
      <ModelforAdd/>

      <div className='innerdiv'>
        <table className="table table-striped">
          <thead className="thead-dark text-center">
          

            <tr>
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
                    <td  onClick={() => navigate(`/dashboard/${data.id}`)}>{data.first_name}</td>
                    <td  onClick={() => navigate(`/dashboard/${data.id}`)}>{data.last_name}</td>
                    <td onClick={() => navigate(`/dashboard/${data.id}`)}>{data.email}</td>
                    <td> <Button variant="primary" onClick={() => handleShow(data)}>Edit</Button></td>
                    <td> <Button variant="danger"  onClick={() => HandleDelete(data)}>Delete</Button></td>
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
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="FirstName"
                  autoFocus onBlur={HandleFormData}
            
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="LastName"
                  autoFocus onBlur={HandleFormData}
                  
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  // mailto:placeholder="name@example.com"
                  autoFocus onBlur={HandleFormData}
                
                ></Form.Control>
              </Form.Group>

            </Form>
          </Modal.Body>
          <Modal.Footer>

            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>)}


      </div>
      <button onClick={Logout}>Logout</button>
    </div>
  )
}

export default Dashboard;