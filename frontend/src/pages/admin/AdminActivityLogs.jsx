import { useEffect,useState } from "react";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import DataTable from "../../components/admin/DataTable";
import StatusBadge from "../../components/admin/StatusBadge";
import { getActivityLogs } from "../../services/adminApi";


function useAdminTheme(){

  const [theme,setTheme]=useState(
    localStorage.getItem("theme") || "dark"
  );


  useEffect(()=>{

    const sync=()=>setTheme(
      localStorage.getItem("theme") || "dark"
    );


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





function AdminActivityLogs(){

const theme=useAdminTheme();
const isDark=theme==="dark";


const [logs,setLogs]=useState([]);


const [search,setSearch]=useState("");
const [module,setModule]=useState("");
const [status,setStatus]=useState("");



const loadLogs=async()=>{

try{


const res=await getActivityLogs({

search,
module,
status

});


setLogs(
res.data.logs || []
);


}catch(error){

console.log(
"ACTIVITY LOG ERROR",
error
);


}

};




useEffect(()=>{

loadLogs();

},[
search,
module,
status
]);





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



const inputClass=isDark
?
"bg-[#18342e] border-[#28594e] text-white"
:
"bg-white border-emerald-200 text-[#061311]";






const columns=[


{
key:"user",
label:"User",

render:(row)=>(

<div>

<p className={`font-semibold text-sm ${headingClass}`}>

{
row.user?.name ||
row.userName ||
"Deleted User"
}

</p>


<p className={`text-xs ${mutedClass}`}>

{
row.user?.role ||
row.role ||
"Unknown"

}

</p>


</div>

)

},




{
key:"activity",
label:"Activity",

render:(row)=>(

<span className={`text-sm ${mutedClass}`}>

{row.activity}

</span>

)

},




{
key:"module",
label:"Module",

render:(row)=>(

<span className="
text-sm
font-semibold
text-teal-400
">

{row.module}

</span>

)

},




{
key:"time",
label:"Date",

render:(row)=>(

<span className={`text-sm ${mutedClass}`}>

{
new Date(row.createdAt)
.toLocaleString()
}

</span>

)

},




{
key:"status",
label:"Status",

render:(row)=>(

<StatusBadge
status={row.status}
/>

)

}


];






return(

<div className="p-4 sm:p-6 lg:p-8">


<AdminPageHeader

title="Activity Logs"

subtitle="Track all important activities performed by students, instructors and admins."

/>





<section
className={`
rounded-3xl
border
p-5
mb-8
${cardClass}
`}
>



<div className="
grid
md:grid-cols-4
gap-4
">



<input

placeholder="Search activity"

value={search}

onChange={
e=>setSearch(e.target.value)
}

className={`
h-12
rounded-xl
px-4
border
outline-none
${inputClass}
`}

/>




<select

value={module}

onChange={
e=>setModule(e.target.value)
}

className={`
h-12
rounded-xl
px-4
border
${inputClass}
`}

>


<option value="">
All Modules
</option>


<option value="Users">
Users
</option>


<option value="Courses">
Courses
</option>

<option value="Learning">
Learning
</option>


<option value="Instructors">
Instructors
</option>


<option value="Certificates">
Certificates
</option>


<option value="Payments">
Payments
</option>


<option value="Announcements">
Announcements
</option>


<option value="Settings">
Settings
</option>


</select>






<select

value={status}

onChange={
e=>setStatus(e.target.value)
}

className={`
h-12
rounded-xl
px-4
border
${inputClass}
`}

>


<option value="">
All Status
</option>


<option value="Completed">
Completed
</option>


<option value="Pending">
Pending
</option>


</select>



</div>






<div className=" grid sm:grid-cols-3 gap-5 mt-6">

    <div>
        <p className={`text-xs ${mutedClass}`}>
        Total Logs
        </p>


        <h3 className={` text-2xl font-black ${headingClass} `}>
          {logs.length}
        </h3>
    </div>




        <div>

        <p className={`text-xs ${mutedClass}`}>
        Pending Actions
        </p>

        <h3 className=" text-2xl font-black text-teal-400 ">
        {
        logs.filter(
        item=>item.status==="Pending"
        ).length
        }
        </h3>
        </div>


        <div>

        <p className={`text-xs ${mutedClass}`}>
        Completed Today
        </p>


        <h3 className={` text-2xl font-black ${headingClass} `}>
         {
        logs.filter(item=>{

        const today=new Date()
        .toDateString();
        return new Date(item.createdAt)
        .toDateString()===today;
        }).length
        }
        </h3>
     </div>
</div>
</section>



<DataTable

columns={columns}
data={logs}

/>
</div>

);
}


export default AdminActivityLogs;