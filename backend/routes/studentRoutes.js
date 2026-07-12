import express from "express";


import {

getStudentDashboard,

getStudentSettings,

updateStudentSettings


} from "../controllers/studentController.js";



import {

protect

} from "../middleware/authMiddleware.js";



const router =
express.Router();





router.get(

"/dashboard",

protect,

getStudentDashboard

);





router.get(

"/settings",

protect,

getStudentSettings

);





router.put(

"/settings",

protect,

updateStudentSettings

);





export default router;