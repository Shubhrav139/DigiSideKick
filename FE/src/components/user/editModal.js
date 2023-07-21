import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
const mainServerAppUrl = process.env.REACT_APP_BACKEND;

export default function EditModal(props) {

    const handleSubmit = (event) => {
        event.preventDefault();
        let userData = {};
        if (event.target.name.value) {
            userData.name = event.target.name.value
        }
        if (event.target.email.value) {
            userData.email = event.target.email.value
        }
        if (event.target.contact.value) {
            userData.contact = event.target.contact.value
        }
        if (event.target.password.value) {
            userData.password = event.target.password.value
        }

        props.onHide();
        axios
            .patch(mainServerAppUrl + `/user/${props.user_id}`, userData)
            .then((response) => {
                console.log(response.data)
                let users = props.users;
                const ind = users.findIndex((user) => user._id === response.data._id);
                users[ind] = response.data;
                props.setUsers([...users]);

            }).catch(error => {
                console.error(error);
            });
    }
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit User Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>

                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Change Name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="contact">
                        <Form.Label>Contact</Form.Label>
                        <Form.Control type="number" placeholder="Change Contact" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" placeholder="Change Email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Change Password" />
                    </Form.Group>

                    <Button variant="primary" type="submit" style={{ float: 'right' }}>
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

