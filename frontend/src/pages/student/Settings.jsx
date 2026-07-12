import React, { useState } from "react";

import {
    updateStudentSettings
} from "../../services/studentApi";



function Settings(){


const [formData,setFormData] = useState({

    name:"",
    email:"",
    phone:"",
    bio:"",

    language:"English",

    videoAutoPlay:true,

    courseUpdates:true,

    certificateNotification:true,

    emailNotification:true,

    twoFA:false,

    showCertificates:true

});



const handleChange = (e)=>{


const {name,value,type,checked}=e.target;


setFormData({

...formData,

[name]:
type==="checkbox"
?
checked
:
value


});


};





const handleSave = async()=>{


try{


const response =
await updateStudentSettings(formData);



console.log(
response.data
);


alert(
"Settings Updated Successfully"
);



}catch(error){


console.log(error);


alert(
"Something went wrong"
);


}



};






return(


<div className="settings-page">



<div className="settings-header">

<h1>
Student Settings
</h1>


<p>
Manage your profile, account security, learning preferences and notifications.
</p>


</div>





<div className="settings-grid">





{/* PROFILE */}


<div className="settings-card">


<h2>
Profile Information
</h2>


<p className="card-desc">
Update your personal details and profile information.
</p>



<label>
Full Name
</label>


<input

name="name"

value={formData.name}

onChange={handleChange}

placeholder="Enter your name"

/>





<label>
Email Address
</label>


<input

name="email"

value={formData.email}

onChange={handleChange}

placeholder="Enter your email"

/>





<label>
Phone Number
</label>


<input

name="phone"

value={formData.phone}

onChange={handleChange}

placeholder="+880 XXXXXXXX"

/>





<label>
Bio
</label>


<textarea

name="bio"

value={formData.bio}

onChange={handleChange}

placeholder="Tell something about yourself..."

 />




<button onClick={handleSave}>

Save Changes

</button>



</div>







{/* SECURITY */}



<div className="settings-card">


<h2>
Account Security
</h2>


<p className="card-desc">
Keep your account secure.
</p>



<input

type="password"

placeholder="Current Password"

/>



<input

type="password"

placeholder="New Password"

/>



<input

type="password"

placeholder="Confirm Password"

/>





<div className="toggle-row">


<div>

<h4>
Two Factor Authentication
</h4>


<span>
Add extra security to your account
</span>


</div>



<input

type="checkbox"

name="twoFA"

checked={formData.twoFA}

onChange={handleChange}

/>



</div>



<button>

Update Password

</button>


</div>







{/* LEARNING */}



<div className="settings-card">


<h2>
Learning Preferences
</h2>


<p className="card-desc">
Customize your learning experience.
</p>



<label>
Preferred Language
</label>



<select

name="language"

value={formData.language}

onChange={handleChange}

>


<option>
English
</option>


<option>
Bangla
</option>


</select>





<div className="toggle-row">


<div>

<h4>
Video Auto Play
</h4>


<span>
Automatically play course videos
</span>


</div>




<input

type="checkbox"

name="videoAutoPlay"

checked={formData.videoAutoPlay}

onChange={handleChange}

/>



</div>



</div>







{/* NOTIFICATIONS */}



<div className="settings-card">


<h2>
Notifications
</h2>


<p className="card-desc">
Manage your notifications.
</p>




<div className="toggle-row">

<div>

<h4>
Course Updates
</h4>


<span>
Get course updates
</span>


</div>



<input

type="checkbox"

name="courseUpdates"

checked={formData.courseUpdates}

onChange={handleChange}

/>



</div>







<div className="toggle-row">


<div>

<h4>
Certificate Notifications
</h4>


<span>
Certificate availability alerts
</span>


</div>



<input

type="checkbox"

name="certificateNotification"

checked={formData.certificateNotification}

onChange={handleChange}

/>



</div>







<div className="toggle-row">


<div>

<h4>
Email Notifications
</h4>


<span>
Receive email updates
</span>


</div>



<input

type="checkbox"

name="emailNotification"

checked={formData.emailNotification}

onChange={handleChange}

/>



</div>



</div>







{/* PRIVACY */}



<div className="settings-card">


<h2>
Privacy Settings
</h2>


<p className="card-desc">
Manage certificate visibility.
</p>



<div className="toggle-row">


<div>

<h4>
Show Certificates
</h4>


<span>
Display earned certificates
</span>


</div>



<input

type="checkbox"

name="showCertificates"

checked={formData.showCertificates}

onChange={handleChange}

/>



</div>



</div>








{/* ACCOUNT */}



<div className="settings-card">


<h2>
Account Management
</h2>


<p className="card-desc">
Manage your account.
</p>



<button>
Download My Data
</button>



<br/>


<button className="danger-btn">

Delete Account

</button>



</div>






</div>







<style>{`


.settings-page{

padding:30px;

background:#061b17;

min-height:100vh;

color:white;

}



.settings-header h1{

font-size:32px;

}



.settings-header p{

color:#8fa9a3;

}




.settings-grid{

display:grid;

grid-template-columns:repeat(2,1fr);

gap:22px;

margin-top:30px;

}




.settings-card{

background:#092d27;

border:1px solid #17463d;

border-radius:16px;

padding:25px;

}



.settings-card h2{

margin-bottom:10px;

}



.card-desc{

color:#9bb5ae;

font-size:14px;

}



.settings-card input,
.settings-card textarea,
.settings-card select{

width:100%;

padding:12px;

background:#103a33;

border:1px solid #22584d;

border-radius:10px;

color:white;

margin:10px 0;

}



.settings-card textarea{

height:90px;

}



.settings-card button{

background:#18c4c8;

border:none;

padding:12px 25px;

border-radius:10px;

font-weight:600;

cursor:pointer;

margin-top:15px;

}



.toggle-row{

display:flex;

justify-content:space-between;

align-items:center;

margin:20px 0;

}



.toggle-row span{

font-size:13px;

color:#91aaa4;

}



.toggle-row input{

width:18px;

height:18px;

}



.danger-btn{

background:#e55353!important;

color:white;

}



@media(max-width:900px){

.settings-grid{

grid-template-columns:1fr;

}

}


`}</style>



</div>


);


}


export default Settings;