import { useEffect, useState } from "react";

import AdminPageHeader from "../../components/admin/AdminPageHeader";
import DataTable from "../../components/admin/DataTable";
import StatusBadge from "../../components/admin/StatusBadge";

import {
getInstructorApplications,
getInstructors,
approveInstructor,
rejectInstructor,
deleteUser
}
from "../../services/adminApi";



function useAdminTheme(){

const [theme,setTheme]=useState(
localStorage.getItem("theme") || "dark"
);


useEffect(()=>{

const sync=()=>{

setTheme(
localStorage.getItem("theme") || "dark"
);

};


window.addEventListener(
"themechange",
sync
);

window.addEventListener(
"storage",
sync
);


return()=>{

window.removeEventListener(
"themechange",
sync
);

window.removeEventListener(
"storage",
sync
);

};

},[]);


return theme;

}




function AdminInstructors(){


const theme=useAdminTheme();

const isDark=theme==="dark";


const [applications,setApplications]=useState([]);

const [instructors,setInstructors]=useState([]);

const [selected,setSelected]=useState(null);



const loadData=async()=>{

try{


const pending =
await getInstructorApplications();


const approved =
await getInstructors();



setApplications(
pending.data.applications || []
);



setInstructors(
approved.data.users || []
);



}
catch(error){

console.log(
"INSTRUCTOR LOAD ERROR",
error
);

}

};





useEffect(()=>{

loadData();

},[]);






const handleApprove=async(id)=>{

try{

await approveInstructor(id);

setSelected(null);

loadData();


}
catch(error){

console.log(error);

}

};




const handleReject=async(id)=>{

try{

await rejectInstructor(
id,
{
reason:"Application rejected"
}
);


setSelected(null);

loadData();


}
catch(error){

console.log(error);

}

};






const headingClass=isDark
?
"text-white"
:
"text-[#061311]";


const mutedClass=isDark
?
"text-slate-300"
:
"text-slate-600";


const cardClass=isDark
?
"bg-[#102823] border-[#24564c]"
:
"bg-white border-emerald-100";







const tableData=[

...applications.map(item=>({

...item,

type:"Pending"

})),


...instructors.map(item=>({

...item,

type:"Instructor"

}))

];








const columns=[


{

key:"user",

label:"Instructor",

render:(row)=>(

<div>

<p className={`font-semibold ${headingClass}`}>

{
row.user?.name ||
row.name
}

</p>


<p className={`text-xs ${mutedClass}`}>

{
row.user?.email ||
row.email
}

</p>


</div>

)

},




{

key:"experience",

label:"Experience",

render:(row)=>(

<span className={mutedClass}>

{
row.yearsOfExperience ||
0
}

 years

</span>

)

},





{

key:"category",

label:"Category",

render:(row)=>(

<span className="text-teal-400 font-semibold">

{
row.categories?.join(", ") ||
"---"
}

</span>

)

},





{

key:"status",

label:"Status",

render:(row)=>(


<StatusBadge

status={
row.dataType==="pending"
?
"Pending"
:
"Approved"
}

/>


)

},





{

key:"action",

label:"Action",

render:(row)=>(


<button

onClick={()=>setSelected(row)}

className="
px-4
py-2
rounded-xl
bg-teal-400
text-[#061311]
font-semibold
text-sm
"

>

View

</button>


)

}



];









return(

<div className="p-4 sm:p-6 lg:p-8">



<AdminPageHeader

title="Manage Instructors"

subtitle="Review instructor applications and manage approved instructors."

/>


<section
className={`rounded-3xl border p-6 mb-8 ${cardClass}`}
>

<div className="grid sm:grid-cols-3 gap-6">

<div>

<p className={mutedClass}>
Pending Applications
</p>


<h2 className="
text-3xl
font-black
text-teal-400
">

{
applications.length
}

</h2>


</div>





<div>

<p className={mutedClass}>
Approved Instructors
</p>


<h2 className={`text-3xl font-black ${headingClass}`}>

{
instructors.filter(
(item)=>item.role==="instructor"
).length
}

</h2>


</div>





<div>

<p className={mutedClass}>
Total Requests
</p>


<h2 className={`text-3xl font-black ${headingClass}`}>

{
applications.length + instructors.length
}

</h2>


</div>



</div>


</section>






<DataTable
columns={columns}
data={[
...applications.map(item=>({
...item,
dataType:"pending"
})),

...instructors.map(item=>({
...item,
dataType:"approved"
}))
]}
/>








{
selected &&


<div
className="
fixed
inset-0
z-50
flex
items-center
justify-center
bg-black/60
px-4
"
>


<div
className={`w-full max-w-3xl rounded-3xl border p-6 ${cardClass}`}
>


<h2 className={`text-2xl font-bold ${headingClass}`}>

Instructor Details

</h2>




<div className="mt-5 space-y-3 text-sm">


<p>
<b>Name:</b>

{
selected.user?.name ||
selected.name
}

</p>



<p>
<b>Email:</b>

{
selected.user?.email ||
selected.email
}

</p>



<p>
<b>Status:</b>

{
selected.dataType==="pending"
?
"Pending Application"
:
"Approved Instructor"
}

</p>



<p>
<b>Experience:</b>{" "}
{
selected.yearsOfExperience
?
`${selected.yearsOfExperience} years`
:
"N/A"
}
</p>


<p>
<b>Skills:</b>

{
selected.skills || "---"
}

</p>



</div>





{
selected.dataType==="pending" &&

<div className="flex gap-3 mt-6">


<button

onClick={()=>handleApprove(selected._id)}

className="
px-5
py-2
rounded-xl
bg-teal-400
font-bold
"

>

Approve

</button>



<button

onClick={()=>handleReject(selected._id)}

className="
px-5
py-2
rounded-xl
bg-red-500/20
text-red-400
"

>

Reject

</button>


</div>

}


{
selected.dataType==="approved" &&

<button

onClick={async()=>{

await deleteUser(selected._id);

setSelected(null);

loadData();

}}

className="
px-5
py-2
rounded-xl
bg-red-500/20
text-red-400
font-bold
"

>

Remove Instructor

</button>

}



<button

onClick={()=>setSelected(null)}

className="
mt-5
px-5
py-2
rounded-xl
border
"

>

Close

</button>


</div>


</div>


}





</div>


);


}


export default AdminInstructors;