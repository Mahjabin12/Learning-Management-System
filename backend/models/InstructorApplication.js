import mongoose from "mongoose";


const instructorApplicationSchema =
new mongoose.Schema(
{

user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
},


professionalHeadline:{
type:String,
required:true
},


professionalBio:{
type:String,
required:true
},


yearsOfExperience:{
type:Number,
required:true
},


currentOccupation:{
type:String,
required:true
},


workplace:{
type:String
},


skills:{
type:String,
required:true
},


languages:[
String
],


categories:[
String
],


portfolioLink:String,
linkedinLink:String,
behanceLink:String,
githubLink:String,
websiteLink:String,


certificateLink:String,


cvFile:String,


introductionVideoUrl:String,


teachingReason:String,


sampleCourseTitle:String,


plannedCourseDescription:String,


targetLearners:String,


courseLevel:String,


teachingApproach:String,


status:{
type:String,
enum:[
"pending",
"approved",
"rejected"
],
default:"pending"
},


adminFeedback:{
type:String,
default:""
}


},
{
timestamps:true
}
);



export default mongoose.model(
"InstructorApplication",
instructorApplicationSchema
); 