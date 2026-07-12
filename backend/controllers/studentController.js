import User from "../models/User.js";




// Dashboard

export const getStudentDashboard = async(req,res)=>{


try{


res.status(200).json({

enrollments:[],

certificates:[],

learningHours:0,

currentStreak:0

});


}

catch(error){


res.status(500).json({

message:error.message

});


}


};







// GET SETTINGS


export const getStudentSettings = async(req,res)=>{


try{


const user =
await User.findById(req.user.id)
.select("-password");



res.status(200).json({

name:user.name,

email:user.email,

settings:user.settings

});


}


catch(error){


res.status(500).json({

message:error.message

});


}


};







// UPDATE SETTINGS


export const updateStudentSettings = async(req,res)=>{


try{


const user =
await User.findById(req.user.id);



user.settings = {


...user.settings.toObject(),


...req.body


};




await user.save();




res.status(200).json({

message:
"Settings updated successfully",


settings:user.settings


});


}



catch(error){


res.status(500).json({

message:error.message

});


}


};