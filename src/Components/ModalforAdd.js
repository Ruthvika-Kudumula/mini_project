import React, { useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthTypes } from "../redux/action_types/auth_types";

const ModelforAdd = () => {
    const dataRef = useRef();
    const [data, setData] = useState({
        loginform: {
            first_name: '',
            last_name: '',
            email: ''
        }, errors: {
            first_name: '',
            last_name: '',
            email: ''
        }
    })
    const handleInput = (e) => {
        const { loginform } = data;
        const { errors } = data
        loginform[e.target.name] = e.target.value;
        if (loginform.first_name) {
            errors.first_name = ""
        }
        if (loginform.last_name) {
            errors.last_name = ""
        }
        if (loginform.email) {
            errors.email = ""
        }
        setData({ ...data, loginform: loginform, errors: errors })
    }
    console.log("data", data);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        const loginform = {
            first_name: '',
            last_name: '',
            email: '',
            password: ''
        }
        setData({ ...data, loginform: loginform })
        setShow(true);
    }
    const showPass = () => {
        const elementRef = dataRef.current.getAttribute("type")
        if (elementRef === "password") {
            dataRef.current.setAttribute("type", "text")
        } else {
            dataRef.current.setAttribute("type", "password")
        }
        console.log(elementRef);
    }
    const { loginform } = data
    const { errors } = data
    const submitFn = () => {
        console.log("loginform", loginform);
        if (!loginform.first_name) {
            errors.first_name = "Enter first name"
        }
        else {
            errors.first_name = ""
        }
        if (!loginform.last_name) {
            errors.last_name = "Enter last name"
        }
        else {
            errors.last_name = ""
        }
        if (!loginform.email) {
            errors.email = "Enter email"
        }
        else if (loginform.email && !(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(loginform.email))) {
            errors.email = "Invalid Email"
        }
        else {
            errors.email = ""
        }
        if (loginform.first_name && loginform.last_name && loginform.email && !errors.email) {
            dispatch({
                type: AuthTypes.POST_REQUEST,
                data: loginform,
                callback: () => {
                    navigate("/Dashboard");
                    handleClose(true);
                }
            });
        }
        setData({ ...data, errors: errors })
    }

    return (
        <div>
            <Button variant="primary" onClick={handleShow} className="m-2">
                Add New User
            </Button>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title> Add New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {
                            !errors.first_name ?
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" name='first_name' value={loginform.first_name} placeholder="Enter Firstname" onChange={handleInput} />
                                </Form.Group>
                                :
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" className="border border-danger" name='first_name' value={loginform.first_name} placeholder="Enter Firstname" onChange={handleInput} />
                                </Form.Group>
                        }

                        {
                            errors.first_name &&
                            <span style={{ color: "red" }}>{errors.first_name}</span>
                        }

                        {
                            !errors.last_name ?
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Control type="text" name='last_name' value={loginform.last_name} placeholder="Enter Lastname" onChange={handleInput} />
                                </Form.Group>
                                :
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Control type="text" className="border border-danger" name='last_name' value={loginform.last_name} placeholder="Enter Lastname" onChange={handleInput} />
                                </Form.Group>
                        }

                        {
                            errors.last_name &&
                            <span style={{ color: "red" }}>{errors.last_name}</span>
                        }
                        {
                            !errors.email ?
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Control type="text" name='email' value={loginform.email} placeholder="Enter Email" onChange={handleInput} />
                                </Form.Group>
                                :
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Control type="text" className="border border-danger" name='email' value={loginform.email} placeholder="Enter Email" onChange={handleInput} />
                                </Form.Group>
                        }

                        {
                            errors.email &&
                            <span style={{ color: "red" }}>{errors.email}</span>
                        }
                       
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}> Close</Button>
                    <Button variant="primary" type="submit" onClick={submitFn}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </div >
    )
}

export default ModelforAdd;
