const express = require("express")
const router = express.Router()
const validate = require("../middleware/validator")
const {register, login, updatePhoto} = require("../controllers/auth")
//const {create, getAll} = require("../controllers/posts")
const loggedIn = require("../middleware/loggedIn")

// router.post("/register", validate, register)
// router.post("/login", validate, login)
// router.post("/create", loggedIn, create)
// router.get("/allPosts", getAll)

const {
  create,
  getAll,
  getSingle,
  update,
  remove
} = require("../controllers/gifs")

router.post("/register", validate, register);
router.post("/login", validate, login);
router.post("/updatePhoto", updatePhoto)

router.post("/creategif", create)
router.get("/getall", getAll)
router.get("/getSingle/:id", getSingle)
router.post("/updategif", update)
router.get("/removegif/:id", remove)

module.exports = router