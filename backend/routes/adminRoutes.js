import express from "express";

import { getStudents, getInstructors,  getUserDetails, deleteUser, getAdminSettings,updateAdminWebsite,updateAdminNotifications,
updateLandingPage, updateAdminPassword, getActivityLogs, getInstructorApplications, approveInstructor, rejectInstructor,
createCategory, getCategories, updateCategory, deleteCategory,
getEnrollments, getCourses, getCourseById
} from "../controllers/adminController.js";

import { protect, isAdmin } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";


const router = express.Router();
router.use(protect, authorizeRoles("admin") );

router.get("/users/students", getStudents);
router.get("/users/instructors", getInstructors);
router.get( "/users/:id", getUserDetails);
router.delete( "/users/:id", deleteUser);

router.get("/settings",getAdminSettings);
router.patch("/settings/website", updateAdminWebsite);
router.patch("/settings/notifications",updateAdminNotifications);
router.patch("/settings/landing",updateLandingPage);
router.patch("/settings/password",updateAdminPassword);

router.get("/instructor-applications", getInstructorApplications);
router.patch("/instructors/:id/approve", approveInstructor);
router.patch("/instructors/:id/reject", rejectInstructor);

router.post(
"/categories",
createCategory
);


router.get(
"/categories",
getCategories
);


router.put(
"/categories/:id",
updateCategory
);


router.delete(
"/categories/:id",
deleteCategory
);

router.get(
"/enrollments",
getEnrollments
);

router.get("/courses", protect, isAdmin, getCourses);
router.get("/courses/:id", protect, isAdmin, getCourseById);


 

router.get("/activity-logs",getActivityLogs);

export default router;