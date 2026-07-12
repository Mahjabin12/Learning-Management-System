import jwt from "jsonwebtoken";
import User from "../models/User.js";
import ActivityLog from "../models/ActivityLog.js";

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};


// REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists.",
      });
    }


    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
      role: "student",
      status: "active",
    });

    await ActivityLog.create({
        user:user._id,
        userName:user.name,
        role:"student",
        activity:`${user.name} created a new account`,
        module:"Users",
        status:"Completed"
      });


    return res.status(201).json({
      success: true,
      message: "Registration successful.",
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });


  } catch (error) {

    console.log("REGISTER ERROR:", error);

    return res.status(500).json({
      success:false,
      message:error.message,
    });
  }
};



// LOGIN
export const loginUser = async (req,res)=>{

  console.log("LOGIN REQUEST RECEIVED");


  try{
    const {email,password}=req.body;
    console.log("EMAIL:",email);

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    console.log("USER FOUND:", user?.email);

    if(!user){

      return res.status(401).json({
        success:false,
        message:"Invalid email or password",
      });

    }

    const passwordMatch =
      await user.matchPassword(password);

    console.log(
      "PASSWORD MATCH:",
      passwordMatch
    );



    if(!passwordMatch){

      return res.status(401).json({
        success:false,
        message:"Invalid email or password",
      });

    }

    const token = generateToken(user._id);

    console.log("TOKEN GENERATED");

    return res.status(200).json({

      success:true,
      message:"Login successful",
      token,
      user:{
        id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
        status:user.status,
      }
    });
  }
  
  catch(error){
    console.log("LOGIN ERROR:",error);

    return res.status(500).json({
      success:false,
      message:error.message,
    });
  }
};



// CURRENT USER

export const getMe = async(req,res)=>{

  return res.status(200).json({
    success:true,
    user:req.user,
  });
};




export const forgotPassword = async (req, res) => {

  try {
    const { email } = req.body;

    const user = await User.findOne({
      email: email.toLowerCase(),
    });


    if (!user) {
      return res.status(404).json({
        success:false,
        message:"No account found with this email"
      });
    }

    const code = Math.floor(
      100000 + Math.random() * 900000
    ).toString();


    user.resetPasswordCode = code;

    user.resetPasswordExpire =
      Date.now() + 10 * 60 * 1000;

    await user.save();

    // later email service add হবে
    console.log(
      "RESET CODE:",
      code
    );


   res.json({

  success:true,
  message:"Verification code generated",
  code

});


  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });
  }
};



export const verifyCode = async (req, res) => {

  try {
    const { email, code } = req.body;

    const user = await User.findOne({
      email: email.toLowerCase(),
    });


    if(!user){

      return res.status(404).json({
        success:false,
        message:"User not found"
      });
    }

    if(
      user.resetPasswordCode !== code ||
      user.resetPasswordExpire < Date.now()
    ){

      return res.status(400).json({
        success:false,
        message:"Invalid or expired verification code"
      });
    }


    res.json({
      success:true,
      message:"Code verified"
    });
  }
  
  catch(error){
    res.status(500).json({
      success:false,
      message:error.message
    });
  }

};


export const resetPassword = async(req,res)=>{

  try{
    const { email, password} = req.body;

    const user = await User.findOne({
      email: email.toLowerCase()
    });

    if(!user){
      return res.status(404).json({
        success:false,
        message:"User not found"
      });
    }

    user.password = password;
    user.resetPasswordCode = null;
    user.resetPasswordExpire = null;

    await user.save();

    res.json({
      success:true,
      message:"Password updated successfully"
    });
  }

  catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });
  }
};