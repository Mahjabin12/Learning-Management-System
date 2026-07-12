import express from "express";

import {
  loginUser,
  registerUser,
  getMe,
  forgotPassword,
  verifyCode,
  resetPassword
} from "../controllers/authController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";


import {
  authorizeRoles,
} from "../middleware/roleMiddleware.js";


const router = express.Router();



// TEST ROUTE
router.get("/test", (req,res)=>{

  res.json({
    success:true,
    message:"Auth route working"
  });

});




// PUBLIC

router.post(
  "/register",
  registerUser
);



router.post(
  "/login",
  loginUser
);



router.post(
  "/forgot-password",
  forgotPassword
);


router.post(
 "/verify-code",
 verifyCode
);


router.post(
 "/reset-password",
 resetPassword
);


// PRIVATE

router.get(
  "/me",
  protect,
  getMe
);




// ADMIN TEST

router.get(
  "/admin-check",
  protect,
  authorizeRoles("admin"),
  (req,res)=>{

    res.json({
      success:true,
      message:"Admin access confirmed",
      user:req.user
    });

  }
);



export default router;