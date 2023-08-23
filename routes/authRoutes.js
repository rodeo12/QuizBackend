const express= require("express");
const {body} = require("express-validator")
const authController = require("../controllers/authController");

const router= express.Router();


router.post(
"/signup",
[
 body("email").isEmail().withMessage("Invalid Email"),
 body("password").trim().isLength({min:6}).withMessage("Password must be 6 characters"),
],
authController.signup
);

router.post("/login",authController.login);

module.exports = router ;