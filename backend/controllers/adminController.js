import User from "../models/User.js";
import AdminSettings from "../models/AdminSettings.js";
import bcrypt from "bcryptjs";
import ActivityLog from "../models/ActivityLog.js";
import InstructorApplication from "../models/InstructorApplication.js";
import Category from "../models/Category.js";
import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";
import Blog from "../models/Blog.js";

// =================================
// GET STUDENTS
// =================================

export const getStudents = async(req,res)=>{
try{
    const {search}=req.query;
    let query={role:"student"};

    if(search){

    query.$or=[
    {
    name:{ $regex:search, $options:"i" }
    },
    {
    email:{$regex:search, $options:"i" }
    }
    ];
    }

    const students=await User
    .find(query)
    .select("-password")
    .sort({
    createdAt:-1
    });


    return res.status(200).json({

    success:true,
    count:students.length,
    users:students

    });
}
catch(error){

console.log(
"GET STUDENTS ERROR:",
error
);

return res.status(500).json({
success:false,
message:error.message
});
}

};


// =================================
// GET INSTRUCTORS
// =================================

export const getInstructors = async(req,res)=>{

try{
const {search}=req.query;

let query={
role:"instructor",
instructorStatus:"approved"
};

if(search){
query.$or=[
{ name:{ $regex:search, $options:"i" } },
{ email:{ $regex:search, $options:"i" } }
];
}

const instructors=await User
.find(query)
.select("-password")
.sort({ createdAt:-1 });

// ⬇️ প্রতিটা approved instructor এর জন্য তার approved application থেকে extra info জোড়া দেওয়া হচ্ছে
const instructorData = await Promise.all(
instructors.map(async(user)=>{

const application = await InstructorApplication.findOne({
user:user._id,
status:"approved"
});

return {
...user.toObject(),
yearsOfExperience: application?.yearsOfExperience || 0,
categories: application?.categories || [],
skills: application?.skills || ""
};

})
);

return res.status(200).json({
success:true,
count:instructorData.length,
users:instructorData   // ⬅️ এখন instructorData পাঠাচ্ছি, instructors না
});

}catch(error){

console.log("GET INSTRUCTORS ERROR:", error);

return res.status(500).json({
success:false,
message:error.message
});

}

};




// =================================
// SINGLE USER DETAILS
// =================================

export const getUserDetails = async(req,res)=>{

try{


const user=await User
.findById(req.params.id)
.select("-password");



if(!user){

return res.status(404).json({

success:false,
message:"User not found"

});

}



return res.status(200).json({

success:true,
user

});


}catch(error){


return res.status(500).json({

success:false,
message:error.message});

}

};


// =================================
// DELETE USER
// =================================

export const deleteUser = async(req,res)=>{

try{

const user=await User.findById(
req.params.id
);

if(!user){

return res.status(404).json({
success:false,
message:"User not found"});

}

await user.deleteOne();
return res.status(200).json({

success:true,
message:"User removed successfully"});

}catch(error){

return res.status(500).json({
success:false,
message:error.message});
}
};   


export const getAdminSettings = async(req,res)=>{

try{

let settings =
await AdminSettings.findOne();


if(!settings){

settings =
await AdminSettings.create({});

}


res.status(200).json({
success:true,
settings
});


}catch(error){

res.status(500).json({
success:false,
message:error.message
});

}

};

export const updateAdminWebsite = async(req,res)=>{

try{


const settings =
await AdminSettings.findOneAndUpdate(
{},
{
website:req.body
},
{
new:true,
upsert:true
}
);


res.status(200).json({
success:true,
settings
});


}catch(error){

res.status(500).json({
success:false,
message:error.message
});

}

};

export const updateAdminNotifications = async(req,res)=>{

try{


const settings =
await AdminSettings.findOneAndUpdate(
{},
{
notifications:req.body
},
{
new:true,
upsert:true
}
);



res.status(200).json({
success:true,
settings
});


}catch(error){

res.status(500).json({
success:false,
message:error.message
});

}

};

export const updateLandingPage = async(req,res)=>{

try{


const settings =
await AdminSettings.findOneAndUpdate(
{},
{
landingPage:req.body
},
{
returnDocument:"after",
upsert:true
}
);


res.status(200).json({
success:true,
settings
});


}catch(error){

res.status(500).json({
success:false,
message:error.message
});

}

};

export const updateAdminPassword = async(req,res)=>{

try{


const admin =
await User.findById(
req.user._id
);


const match =
await bcrypt.compare(
req.body.currentPassword,
admin.password
);


if(!match){

return res.status(400).json({
success:false,
message:"Current password incorrect"
});

}



admin.password =
req.body.newPassword;


await admin.save();



res.status(200).json({
success:true,
message:"Password updated"
});


}catch(error){

res.status(500).json({
success:false,
message:error.message
});

}

};


// =================================
// GET INSTRUCTOR APPLICATIONS
// =================================

export const getInstructorApplications = async(req,res)=>{

try{


const applications =
await InstructorApplication
.find({
status:"pending"
})
.populate(
"user",
"name email"
)
.sort({
createdAt:-1
});



return res.status(200).json({

success:true,

count:applications.length,

applications

});


}
catch(error){

console.log(
"GET INSTRUCTOR APPLICATION ERROR:",
error
);


return res.status(500).json({

success:false,

message:error.message

});


}

};

// =================================
// APPROVE INSTRUCTOR
// =================================

export const approveInstructor = async(req,res)=>{

try{
const application = await InstructorApplication.findById(req.params.id);

if(!application){
return res.status(404).json({
success:false,message:"Application not found"});
}

const user =await User.findById(application.user);

if(!user){
return res.status(404).json({
success:false,message:"User not found"});
}
// change role

user.role="instructor";
user.instructorStatus="approved";
await user.save();

application.status="approved";
await application.save();
res.status(200).json({
success:true,message:"Instructor approved successfully"});
}
catch(error){
res.status(500).json({
success:false,message:error.message});}
};

// =================================
// REJECT INSTRUCTOR
// =================================

export const rejectInstructor = async(req,res)=>{

try{
const application =await InstructorApplication.findById(req.params.id);

if(!application){
return res.status(404).json({
success:false, message:"Application not found"});
}

application.status="rejected";
application.adminFeedback =
req.body.reason || "Application rejected";
await application.save();

res.status(200).json({
success:true,message:"Instructor application rejected"});
}
catch(error){
res.status(500).json({
success:false,message:error.message}); }
};



// =================================
// CREATE CATEGORY
// =================================

export const createCategory = async(req,res)=>{
try{

const category =
await Category.create({
name:req.body.name,
icon:req.body.icon,
description:req.body.description,
skills:req.body.skills,
career:req.body.career,
level:req.body.level,
certificate:req.body.certificate,
status:req.body.status
});

res.status(201).json({
success:true,
message:"Category added successfully",
category});
}
catch(error){
res.status(500).json({
success:false,
message:error.message});
}
};




// =================================
// GET ALL CATEGORIES ADMIN
// =================================

export const getCategories = async(req,res)=>{

try{
const categories = await Category.find().sort({createdAt:-1});
res.status(200).json({success:true,count:categories.length,categories});
}
catch(error){
res.status(500).json({success:false,message:error.message});
}
};




// =================================
// UPDATE CATEGORY
// =================================

export const updateCategory = async(req,res)=>{

try{
const category =
await Category.findByIdAndUpdate(
req.params.id,
req.body,
{
new:true
}
);

res.status(200).json({success:true,message:"Category updated",category});
}
catch(error){
res.status(500).json({success:false,message:error.message});
}
};


// =================================
// DELETE CATEGORY
// =================================

export const deleteCategory = async(req,res)=>{
try{
await Category.findByIdAndDelete(
req.params.id
);

res.status(200).json({
success:true,message:"Category deleted"});
}
catch(error){
res.status(500).json({success:false,message:error.message});
}
};


// =================================
// GET ALL ENROLLMENTS
// =================================

export const getEnrollments = async(req,res)=>{

try{
const enrollments =
await Enrollment.find()

.populate(
"student",
"name email"
)

.populate("course", "title")
.sort({
createdAt:-1
});

res.status(200).json({
success:true,
count:enrollments.length,
enrollments
});
}
catch(error){
console.log(
"GET ENROLLMENTS ERROR",
error
);

res.status(500).json({
success:false,
message:error.message
});
}
};




// =================================
// GET ALL COURSES ADMIN
// =================================
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("instructor", "name email")
      .sort({ createdAt: -1 });

    const formattedCourses = courses.map((course) => ({
      id: course._id,
      title: course.title,
      thumbnail: course.thumbnail,
      category: course.category,
      instructor: course.instructor?.name || "Unknown",
      price: course.price,
      students: course.students,
      status: course.status,
      publishedAt: course.publishedAt,
      description: course.description,
      duration: course.duration,
      level: course.level,
    }));

    res.status(200).json({
      success: true,
      count: formattedCourses.length,
      courses: formattedCourses,
    });
  } catch (error) {
    console.log("GET COURSES ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// =================================
// GET SINGLE COURSE (View page)
// =================================
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "instructor",
      "name email"
    );

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    res.status(200).json({
      success: true,
      course: {
        id: course._id,
        title: course.title,
        thumbnail: course.thumbnail,
        category: course.category,
        instructor: course.instructor?.name || "Unknown",
        price: course.price,
        students: course.students,
        status: course.status,
        publishedAt: course.publishedAt,
        description: course.description,
        duration: course.duration,
        level: course.level,
        lessons: course.lessons || [],
      },
    });
  } catch (error) {
    console.log("GET COURSE BY ID ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



export const createBlog = async(req,res)=>{

try{


const blog =
await Blog.create({

title:req.body.title,

category:req.body.category,

description:req.body.description,

image:req.body.image,

date:req.body.date,

readTime:req.body.readTime,

content:req.body.content

});


res.status(201).json({

success:true,

message:"Blog created successfully",

blog

});


}
catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};

export const getBlogs = async(req,res)=>{

try{


const blogs =
await Blog.find()
.sort({
createdAt:-1
});


res.status(200).json({

success:true,

count:blogs.length,

blogs

});


}
catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};

export const updateBlog = async(req,res)=>{

try{


const blog =
await Blog.findByIdAndUpdate(

req.params.id,

req.body,

{
new:true
}

);


res.status(200).json({

success:true,

message:"Blog updated",

blog

});


}
catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};

export const deleteBlog = async(req,res)=>{

try{


await Blog.findByIdAndDelete(
req.params.id
);


res.status(200).json({

success:true,

message:"Blog deleted"

});


}
catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};



































//=======================================================
// GET ACTIVITY LOGS
//=======================================================
export const getActivityLogs = async(req,res)=>{

try{

const {search,module,status}=req.query;
let query={};

if(module && module!=="All"){
query.module=module;
}

if(status && status!=="All"){
query.status=status;
}

if(search){
query.activity={
$regex:search,
$options:"i"
};}


const logs = await ActivityLog
.find(query)
.populate(
"user",
"name email role" 
)
.sort({
createdAt:-1
});


res.status(200).json({
success:true,
count:logs.length,
logs
}); }

catch(error){
console.log(
"GET ACTIVITY LOG ERROR",
error
);

res.status(500).json({
success:false,
message:error.message
});
}
};