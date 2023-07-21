const service = require("../services/userService");

function createNewUser(req, res) {
    service
        .createNewUser(req.body)
        .then((result) => {
            res.status(201).send(result);
        })
        .catch((err) => {
            res.status(400).send({ message: err.message });
        });
};

function getAllUsers(req, res) {
    service
        .getAllUsers()
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(400).send({ message: err.message });
        });
}

function deleteUser(req, res) {
    service
        .deleteUser(req.params.user_id)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(400).send({ message: err.message });
        });
};

function updateUser(req, res) {
    service
        .updateUser(req.params.user_id, req.body)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(400).send({ message: err.message });
        });
}


module.exports = { createNewUser, getAllUsers, deleteUser, updateUser };