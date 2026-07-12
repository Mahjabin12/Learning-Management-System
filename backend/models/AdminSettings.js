import mongoose from "mongoose";


const adminSettingsSchema = new mongoose.Schema(
{
    website:{
        platformName:{
            type:String,
            default:"Skillora"
        },

        supportEmail:{
            type:String,
            default:"support@skillora.com"
        },

        supportPhone:{
            type:String,
            default:"+880 1XXXXXXXXX"
        },

        address:{
            type:String,
            default:"Dhaka, Bangladesh"
        }
    },


    security:{
        twoFactorAuth:{
            type:Boolean,
            default:false
        }
    },


    notifications:{
        newUserRegistration:{
            type:Boolean,
            default:true
        },

        instructorRequest:{
            type:Boolean,
            default:true
        },

        paymentNotification:{
            type:Boolean,
            default:true
        },

        systemAlert:{
            type:Boolean,
            default:true
        }
    },


    landingPage:{
        title:{
            type:String,
            default:"Learn Creative Skills For Career Growth"
        },

        subtitle:{
            type:String,
            default:"Design, marketing and technology courses"
        },

        description:{
            type:String,
            default:"Build practical skills with professional instructors."
        }
    }
},
{
    timestamps:true
}
);

const AdminSettings =
mongoose.model(
    "AdminSettings",
    adminSettingsSchema
);


export default AdminSettings;