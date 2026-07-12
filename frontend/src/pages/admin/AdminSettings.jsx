import { useEffect, useState } from "react";
import AdminPageHeader from "../../components/admin/AdminPageHeader";

import {
  getAdminSettings,
  updateAdminWebsite,
  updateAdminNotifications,
  updateLandingPage,
  updateAdminPassword,
} from "../../services/adminApi";


function useAdminTheme() {

  const [theme,setTheme]=useState(
    localStorage.getItem("theme") || "dark"
  );


  useEffect(()=>{
    const sync=()=>{
      setTheme(
        localStorage.getItem("theme") || "dark"
      );
    };

    window.addEventListener( "themechange", sync);
    window.addEventListener( "storage", sync );

    return()=>{

      window.removeEventListener("themechange", sync);
      window.removeEventListener( "storage", sync);
    };
  },[]);

  return theme;
}




function AdminSettings(){

const theme=useAdminTheme();
const isDark=theme==="dark";

const [website,setWebsite]=useState({ platformName:"",supportEmail:"",supportPhone:"",address:""});
const [landing,setLanding]=useState({title:"",subtitle:"",description:""});
const [notifications,setNotifications]=useState({newUserRegistration:false,instructorRequest:false,paymentNotification:false,systemAlert:false});
const [password,setPassword]=useState({

currentPassword:"",
newPassword:"",
confirmPassword:""

});





useEffect(()=>{


const loadSettings=async()=>{


try{

const res = await getAdminSettings();
const data=res.data.settings;

setWebsite(
data.website
);


setLanding(
data.landingPage
);


setNotifications(
data.notifications
);



}catch(error){

console.log(
"LOAD SETTINGS ERROR",
error
);
}
};

loadSettings();
},[]);








const saveWebsite=async()=>{


try{

await updateAdminWebsite(website);

alert("Website settings updated");

}catch(error){

console.log(error);}

};






const saveNotifications=async()=>{

try{

await updateAdminNotifications(notifications);
alert("Notification settings updated");
}

catch(error){
console.log(error);
}

};







const saveLanding=async()=>{

try{


await updateLandingPage(landing);
alert("Landing page updated");



}catch(error){


console.log(error);


}


};







const savePassword=async()=>{


if(
password.newPassword !== password.confirmPassword
){

alert(
"Password does not match"
);

return;

}



try{


await updateAdminPassword({

currentPassword:
password.currentPassword,


newPassword:
password.newPassword


});



alert(
"Password updated"
);



}catch(error){


console.log(error);


}



};







const headingClass=isDark
?
"text-white"
:
"text-[#061311]";



const labelClass=isDark
?
"text-slate-300"
:
"text-slate-700";



const cardClass=isDark
?
"bg-[#102823] border-[#24564c]"
:
"bg-white border-emerald-100";



const inputClass=isDark
?
"bg-[#18342e] border-[#28594e] text-white"
:
"bg-white border-emerald-200 text-[#061311]";



const inputStyle=`

w-full
h-11
rounded-xl
border
px-4
text-sm
outline-none
${inputClass}

`;



const buttonStyle=`

px-5
py-2.5
rounded-xl
bg-teal-400
text-[#061311]
font-semibold
text-sm

`;







return (

<div className="p-4 sm:p-6 lg:p-8">

<AdminPageHeader
title="Admin Settings"
subtitle="Manage website, security, notifications and landing page."
/>


<div className="grid xl:grid-cols-2 gap-6 mt-6">



{/* WEBSITE */}

<section className={`rounded-2xl border p-6 ${cardClass}`}>

<h2 className={`text-xl font-bold mb-6 ${headingClass}`}>
Website Information
</h2>


<div className="space-y-5">


<div>
<label className={`block mb-2 text-sm font-medium ${labelClass}`}>
Platform Name
</label>

<input
value={website.platformName}
onChange={(e)=>setWebsite({
...website,
platformName:e.target.value
})}
className={inputStyle}
/>

</div>



<div>

<label className={`block mb-2 text-sm font-medium ${labelClass}`}>
Support Email
</label>

<input
value={website.supportEmail}
onChange={(e)=>setWebsite({
...website,
supportEmail:e.target.value
})}
className={inputStyle}
/>

</div>




<div>

<label className={`block mb-2 text-sm font-medium ${labelClass}`}>
Support Phone
</label>

<input
value={website.supportPhone}
onChange={(e)=>setWebsite({
...website,
supportPhone:e.target.value
})}
className={inputStyle}
/>

</div>




<div>

<label className={`block mb-2 text-sm font-medium ${labelClass}`}>
Address
</label>

<input
value={website.address}
onChange={(e)=>setWebsite({
...website,
address:e.target.value
})}
className={inputStyle}
/>

</div>



<button
onClick={saveWebsite}
className={buttonStyle}
>
Save Changes
</button>


</div>


</section>







{/* SECURITY */}


<section className={`rounded-2xl border p-6 ${cardClass}`}>

<h2 className={`text-xl font-bold mb-6 ${headingClass}`}>
Admin Security
</h2>



<div className="space-y-4">


<input
type="password"
placeholder="Current Password"
value={password.currentPassword}
onChange={(e)=>setPassword({
...password,
currentPassword:e.target.value
})}
className={inputStyle}
/>



<input
type="password"
placeholder="New Password"
value={password.newPassword}
onChange={(e)=>setPassword({
...password,
newPassword:e.target.value
})}
className={inputStyle}
/>



<input
type="password"
placeholder="Confirm Password"
value={password.confirmPassword}
onChange={(e)=>setPassword({
...password,
confirmPassword:e.target.value
})}
className={inputStyle}
/>



<button
onClick={savePassword}
className={buttonStyle}
>
Update Password
</button>



</div>


</section>








{/* NOTIFICATION */}



<section className={`rounded-2xl border p-6 ${cardClass}`}>

<h2 className={`text-xl font-bold mb-6 ${headingClass}`}>
Notifications
</h2>


<div className="space-y-4">


<label className={`flex items-center gap-3 ${labelClass}`}>

<input
type="checkbox"
checked={notifications.newUserRegistration}
onChange={(e)=>setNotifications({
...notifications,
newUserRegistration:e.target.checked
})}
className="w-4 h-4 accent-teal-400"
/>

<span>
New User Registration
</span>


</label>




<label className={`flex items-center gap-3 ${labelClass}`}>

<input
type="checkbox"
checked={notifications.instructorRequest}
onChange={(e)=>setNotifications({
...notifications,
instructorRequest:e.target.checked
})}
className="w-4 h-4 accent-teal-400"
/>

<span>
Instructor Request
</span>

</label>




<label className={`flex items-center gap-3 ${labelClass}`}>

<input
type="checkbox"
checked={notifications.paymentNotification}
onChange={(e)=>setNotifications({
...notifications,
paymentNotification:e.target.checked
})}
className="w-4 h-4 accent-teal-400"
/>

<span>
Payment Notification
</span>


</label>




<label className={`flex items-center gap-3 ${labelClass}`}>

<input
type="checkbox"
checked={notifications.systemAlert}
onChange={(e)=>setNotifications({
...notifications,
systemAlert:e.target.checked
})}
className="w-4 h-4 accent-teal-400"
/>


<span>
System Alert
</span>
</label>




<button onClick={saveNotifications} className={buttonStyle}>
Save Notifications
</button>
</div>
</section>


{/* LANDING PAGE */}


<section className={`rounded-2xl border p-6 ${cardClass}`}>

<h2 className={`text-xl font-bold mb-6 ${headingClass}`}>
Landing Page
</h2>


<div className="space-y-4">


<input

value={landing.title}

onChange={(e)=>setLanding({
...landing,
title:e.target.value
})}

className={inputStyle}

/>



<input

value={landing.subtitle}

onChange={(e)=>setLanding({
...landing,
subtitle:e.target.value
})}

className={inputStyle}

/>



<textarea

rows="4"

value={landing.description}

onChange={(e)=>setLanding({
...landing,
description:e.target.value
})}

className={`${inputStyle} py-3 h-auto`}

/>



<button

onClick={saveLanding}

className={buttonStyle}

>

Update Content

</button>


</div>


</section>



</div>


</div>

);


}


export default AdminSettings;