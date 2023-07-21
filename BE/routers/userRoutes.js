const express = require("express");
const controller = require("../controllers/userController");
const router = express.Router();

router.route("/user").post((req, res) => {
    controller.createNewUser(req, res);
});

router.route("/users").get((req, res) => {
    controller.getAllUsers(req, res);
});

router.route("/user/:user_id").delete((req, res) => {
    controller.deleteUser(req, res);
});

router.route("/user/:user_id").patch((req, res) => {
    controller.updateUser(req, res);
});


module.exports = router;