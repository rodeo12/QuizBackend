const express= require("express");
const doctorController = require("../controllers/doctorController");

const router= express.Router();

//Post 

router.post("/",doctorController.bookAppointment) ;

// Get all appointments

router.get("/",doctorController.getAllDoctors) ;

// Get appointment by id

router.get("/:id",doctorController.getDoctorById) ;

//Put-Update

router.put("/:id",doctorController.updateAppointment) ;

//Delete

router.delete("/:id",doctorController.deleteAppointment) ;

//Filter

router.get("/filter",doctorController.filterAppointment) ;

//Sort

router.get("/sort",doctorController.sortAppointment) ;

module.exports= router ;

