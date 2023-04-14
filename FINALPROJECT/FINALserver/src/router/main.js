const express = require("express");
const router = express.Router();

const validate = require("../middleware/validator");
const {register, login, updatePhoto, updateEmail, updatePassword} = require("../controllers/auth");
const loggedIn = require("../middleware/loggedIn");




router.post("/register", validate, register);
router.post("/login", login);
router.post("/updatePhoto", loggedIn ,updatePhoto);
router.post("/updateEmail", loggedIn, updateEmail);
router.post("/updatePassword", loggedIn, updatePassword);
// router.post("/profile", loggedIn, profile);

module.exports = router