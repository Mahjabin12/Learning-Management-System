import mongoose from "mongoose";


const categorySchema = new mongoose.Schema(
{

name:{
type:String,
required:true,
unique:true,
trim:true
},


icon:{
type:String,
default:"📚"
},


description:{
type:String,
required:true
},


skills:[
{
type:String
}
],


career:{
type:String,
required:true
},


level:{
type:String,
required:true
},


certificate:{
type:Boolean,
default:true
},


status:{
type:String,
enum:[
"Active",
"Inactive"
],
default:"Active"
},


},
{
timestamps:true
}

);


export default mongoose.model(
"Category",
categorySchema
);