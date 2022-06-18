import React, { useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthTypes } from "../Redux/action_types/auth_types";



const ModelforAdd = () => {
    const ref = useRef();
    const [data, setData] = useState({
        loginform: {
            first_name: '',
            last_name: '',
            email: '',
            avatar: ''
        },
        errors: {
            first_name: '',
            last_name: '',
            email: '',
            fileMessage: '',
        }
    })
    var url = ''
    const saveImage = (event) => {
        const { files } = event.target;
        const localImageUrl = window.URL.createObjectURL(files[0]);
        console.log("url", localImageUrl)
        setData({ ...data, loginform: { ...data.loginform, avatar: localImageUrl } })
    }

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
        setShow(true);
    }
    const close = () => {
        setShow(true);
    }

    const uploadClick = e => {
        ref.current.click();
    };


    const { loginform } = data
    const { errors } = data


    const submitFn = (e) => {
        if (!loginform.avatar) {

            errors.fileMessage = "image required"
        }

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


        if (loginform.first_name && loginform.last_name && loginform.email && !errors.email && !errors.fileMessage) {
            dispatch({
                type: AuthTypes.POST_REQUEST,
                data: loginform,
                callback: () => {
                    navigate("/Dashboard");
                    handleClose();
                }
            });
        }
        setData({ ...data, errors: errors })
        setData({ ...data, loginform: { ...data, loginform: '' } })
    }

    return (
        <div>
            <Button variant="primary" onClick={handleShow} className="m-2">
                Add New User
            </Button>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton onClick={close}>
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

                        <div className="main">

                            <div onClick={uploadClick}>
                                <a href="#" >Add File</a>
                                <span>or drop profile picture here</span>
                                <input type="file" hidden id="profile-pic" name='avatar' onChange={saveImage} ref={ref} accept="application/pdf,image/jpeg,image/png" />
                                {
                                    errors.fileMessage && <div style={{ color: "red" }}>{errors.fileMessage}</div>
                                }
                            </div>
                        </div>
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
