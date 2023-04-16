const express = require("express");
const router = express.Router();

const validate = require("../middleware/validator");
const {register, login, updatePhoto, updateEmail, updatePassword} = require("../controllers/auth");
const loggedIn = require("../middleware/loggedIn");
const {getAllUsers, getUserById} = require("../controllers/display");
const {createPost, getAllPosts, getPostById, deletePostById, getPostsByEmail, reply} = require("../controllers/post");

router.post("/register", validate, register);
router.post("/login", login);
router.post("/updatePhoto", loggedIn ,updatePhoto);
router.post("/updateEmail", loggedIn, updateEmail);
router.post("/updatePassword", loggedIn, updatePassword);
// router.post("/profile", loggedIn, profile);
router.get("/getAllUsers", getAllUsers);
router.get("/getUserById/:id", getUserById);

router.post("/createPost", loggedIn, createPost);
router.get("/getAllPosts", getAllPosts);
router.get("/getPostById/:id", getPostById);
router.get("/getPostsByEmail/:email", getPostsByEmail);
router.delete("/deletePostById/:id", deletePostById);
router.post("/reply",loggedIn, reply);

module.exports = router