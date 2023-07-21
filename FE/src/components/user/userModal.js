import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import { MdOutlineDeleteForever } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import { AiOutlineUserAdd } from 'react-icons/ai';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import EditModal from "./editModal";
import AddModal from "./addModal";

const mainServerAppUrl = process.env.REACT_APP_BACKEND;

export default function UserPage() {
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState('');
    const [editModal, setEditModal] = useState(false);
    const [addModal, setAddModal] = useState(false);

    useEffect(() => {
        axios
            .get(mainServerAppUrl + "/users")
            .then((result) => {
                setUsers(result.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    const deleteUser = (userId) => {
        axios
            .delete(mainServerAppUrl + `/user/${userId}`)
            .then((result) => {
                console.log(result.data)
                const ind = users.findIndex((user) => user._id === userId);
                users.splice(ind, 1);
                setUsers([...users])
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const editUser = (userId) => {
        setUserId(userId);
        setEditModal(true);
    }

    return (
        <Container>
            <h2>USERS</h2>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Email</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                {users.map((user, k) => (
                    <tbody key={k}>
                        <tr>
                            <td>{user.name}</td>
                            <td>{user.contact}</td>
                            <td>{user.email}</td>
                            <td>
                                <Button variant="outline-primary" onClick={() => editUser(user._id)}>
                                    <CiEdit />
                                </Button>
                            </td>
                            <td>
                                <Button variant="outline-danger" onClick={() => deleteUser(user._id)}>
                                    <MdOutlineDeleteForever />
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                ))}
            </Table>

            <Button variant="outline-primary" onClick={() => setAddModal(true)} >
                <AiOutlineUserAdd />Add User
            </Button>
            <EditModal
                user_id={userId}
                users={users}
                setUsers={setUsers}
                show={editModal}
                onHide={() => setEditModal(false)}
            />
            <AddModal
                users={users}
                setUsers={setUsers}
                show={addModal}
                onHide={() => setAddModal(false)}
            />
        </Container>
    );
}