import mongoose from "mongoose";


const blogSchema = new mongoose.Schema(
{

title:{
type:String,
required:true,
trim:true
},


category:{
type:String,
required:true
},


description:{
type:String,
required:true
},


image:{
type:String,
default:""
},


date:{
type:String,
default:""
},


readTime:{
type:String,
default:"5 min read"
},


content:{
type:String,
required:true
},


status:{
type:String,
enum:[
"Published",
"Draft"
],
default:"Published"
}


},
{
timestamps:true
}

);


export default mongoose.model(
"Blog",
blogSchema
);