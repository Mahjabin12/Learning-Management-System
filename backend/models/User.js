import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema(

{

name:{
type:String,
required:true,
trim:true,
},


email:{
type:String,
required:true,
unique:true,
lowercase:true,
trim:true,
},


password:{
type:String,
required:true,
minlength:6,
},



role:{

type:String,

enum:[
"student",
"instructor",
"admin"
],

default:"student"

},



status:{

type:String,

enum:[
"active",
"inactive",
"blocked"
],

default:"active"

},




settings:{


phone:{
type:String,
default:""
},


bio:{
type:String,
default:""
},



language:{
type:String,
default:"English"
},



videoAutoPlay:{
type:Boolean,
default:true
},



courseUpdates:{
type:Boolean,
default:true
},



certificateNotification:{
type:Boolean,
default:true
},



emailNotification:{
type:Boolean,
default:true
},



twoFA:{
type:Boolean,
default:false
},



showCertificates:{
type:Boolean,
default:true
}


}



},


{
timestamps:true
}


);





userSchema.pre(
"save",
async function(){

if(!this.isModified("password"))
{
return;
}


const salt =
await bcrypt.genSalt(10);


this.password =
await bcrypt.hash(
this.password,
salt
);


}

);





userSchema.methods.matchPassword =
async function(password){

return bcrypt.compare(
password,
this.password
);

};





const User =
mongoose.model(
"User",
userSchema
);


export default User;