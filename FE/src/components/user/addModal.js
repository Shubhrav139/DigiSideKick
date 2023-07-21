import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useState } from 'react';

const mainServerAppUrl = process.env.REACT_APP_BACKEND

export default function AddModal(props) {

    const [values, setValues] = useState({
        name: "",
        contact: "",
        email: "",
        password: "",
    });
    const [formerrors, setFormErrors] = useState({});

    //this method handles the each form field changing and updates the relevant
    //state value for that input
    const handleChange = (event) => {
        setValues((values) => ({
            ...values,
            [event.target.name]: event.target.value,
        }));
    };

    //this method will check each field in your form. You define
    //the rules for each field
    const validate = () => {
        let errors = {};

        //name field
        if (!values.name) {
            errors.name = "Name is required";
        }

        //email field
        if (!values.email) {
            errors.email = "Email address is required";
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = "Email address is invalid";
        }

        //password field
        if (!values.password) {
            errors.password = "Password is required";
        }

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            return true;
        } else {
            return false;
        }
    };

    const handleSubmit = (event) => {
        if (event) event.preventDefault();

        if (validate(values)) {
            axios
                .post(mainServerAppUrl + '/user', values)
                .then((response) => {
                    props.setUsers([...props.users, response.data]);
                    closeModal();
                }).catch(error => {
                    console.error(error);
                });
        } else {
            alert('Invalid Values!!');
        }
    };

    function closeModal() {
        props.onHide();
        setValues({
            name: "",
            contact: "",
            email: "",
            password: "",
        });
        setFormErrors({});
    }

    return (
        <Modal
            show={props.show}
            onHide={closeModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add User
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>

                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" value={values.name} name='name'
                            onChange={handleChange} />
                        {formerrors.name && (
                            <p className="text-warning">{formerrors.name}</p>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="contact">
                        <Form.Label>Contact</Form.Label>
                        <Form.Control type="number" placeholder="Enter Contact" value={values.contact} name='contact'
                            onChange={handleChange} />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" placeholder="Enter Email" value={values.email} name='email'
                            onChange={handleChange} />
                        {formerrors.email && (
                            <p className="text-warning">{formerrors.email}</p>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" value={values.password} name='password'
                            onChange={handleChange} />
                        {formerrors.password && (
                            <p className="text-warning">{formerrors.password}</p>
                        )}
                    </Form.Group>

                    <Button variant="primary" type="submit" style={{ float: 'right' }}>
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

