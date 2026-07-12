import InstructorApplication from "../models/InstructorApplication.js";
import User from "../models/User.js";


// =================================
// APPLY FOR INSTRUCTOR
// =================================

export const applyInstructor = async(req,res)=>{

try{

const userId=req.user._id;


// check existing pending/approved application

const existingApplication =
await InstructorApplication.findOne({
user:userId,
status:{
$in:[
"pending",
"approved"
]
}
});


if(existingApplication){

return res.status(400).json({

success:false,

message:
"An instructor application already exists"

});

}



// create application

const application =
await InstructorApplication.create({

user:userId,

...req.body,

status:"pending"

});




// update user instructor status

await User.findByIdAndUpdate(

userId,

{

instructorStatus:"pending"

}

);



return res.status(201).json({

success:true,

message:
"Instructor application submitted successfully",

application

});


}catch(error){


console.log(
"INSTRUCTOR APPLY ERROR:",
error
);


return res.status(500).json({

success:false,

message:error.message

});


}

};