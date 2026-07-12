import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
{
user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
default:null
},

userName:{
type:String,
required:true
},

role:{
type:String,
enum:[
"admin",
"student",
"instructor"
],
required:true
},

activity:{
type:String,
required:true
},

module:{
type:String,
enum:[
"Users",
"Courses",
"Instructors",
"Learning",
"Certificates",
"Payments",
"Settings",
"Announcements"
],
required:true
},

status:{
type:String,
enum:[
"Completed",
"Pending"
],
default:"Completed"
}

},
{
timestamps:true
}
);


const ActivityLog =
mongoose.model(
"ActivityLog",
activityLogSchema
);


export default ActivityLog;