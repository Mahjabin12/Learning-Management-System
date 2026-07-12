import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


function SidebarIcon({ type }) {

  const common = "w-4 h-4 transition duration-300";


  const icons = {

    dashboard: (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),


    courses: (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M4 4.5A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5Z" />
      </svg>
    ),


    users: (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="9" cy="7" r="4" />
        <path d="M17 11a4 4 0 100-8" />
        <path d="M2 21a7 7 0 0114 0" />
      </svg>
    ),


    instructor: (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3L2 8l10 5 10-5-10-5Z" />
        <path d="M6 12v4c3 3 9 3 12 0v-4" />
      </svg>
    ),


    enrollment: (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),


    category: (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),


    revenue: (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 1v22" />
        <path d="M17 5H9a3 3 0 000 6h6a3 3 0 010 6H6" />
      </svg>
    ),


    activity: (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),


    settings: (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.7 1.7 0 00.34 1.88l.06.06a2 2 0 01-2.83 2.83l-.06-.06A1.7 1.7 0 0015 19.4a1.7 1.7 0 00-1 .6V21a2 2 0 01-4 0v-.09a1.7 1.7 0 00-1-.6 1.7 1.7 0 00-1.88.34l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.7 1.7 0 004.6 15a1.7 1.7 0 00-.6-1H4a2 2 0 010-4h.09A1.7 1.7 0 004.6 9a1.7 1.7 0 00-.34-1.88l-.06-.06a2 2 0 012.83-2.83l.06.06A1.7 1.7 0 009 4.6a1.7 1.7 0 001-.6V4a2 2 0 014 0v.09a1.7 1.7 0 001 .6 1.7 1.7 0 001.88-.34l.06-.06a2 2 0 012.83 2.83l-.06.06A1.7 1.7 0 0019.4 9a1.7 1.7 0 00.6 1H20a2 2 0 010 4h-.09a1.7 1.7 0 00-.51 1Z"/>
      </svg>
    )

  };


  return icons[type] || icons.dashboard;
}




function AdminSidebar({isOpen=false,onClose}) {


const {logout}=useAuth();
const navigate=useNavigate();


const [theme,setTheme]=useState(
localStorage.getItem("theme") || "dark"
);


const isDark=theme==="dark";



useEffect(()=>{

const syncTheme=()=>{

setTheme(
localStorage.getItem("theme") || "dark"
);

};


window.addEventListener(
"themechange",
syncTheme
);


return ()=>{

window.removeEventListener(
"themechange",
syncTheme
);

};

},[]);




const links=[


{
name:"Dashboard",
path:"/admin/dashboard",
icon:"dashboard"
},


{
name:"Users",
path:"/admin/users",
icon:"users"
},


{
name:"Instructors",
path:"/admin/instructors",
icon:"instructor"
},


{
name:"Courses",
path:"/admin/courses",
icon:"courses"
},


{
name:"Categories",
path:"/admin/categories",
icon:"category"
},


{
name:"Enrollments",
path:"/admin/enrollments",
icon:"enrollment"
},


{
name:"Certificates",
path:"/admin/certificates",
icon:"courses"
},


{
name:"Revenue",
path:"/admin/revenue",
icon:"revenue"
},


{
name:"Activity Logs",
path:"/admin/activity-logs",
icon:"activity"
},


{
name:"Settings",
path:"/admin/settings",
icon:"settings"
}


];



const linkClass=({isActive})=>`

flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all duration-300

${
isActive

?

isDark

?
"bg-teal-400/15 text-teal-300 border border-teal-400/20"

:

"bg-[#061311] text-white"

:

isDark

?

"text-slate-400 hover:text-teal-300 hover:bg-white/5"

:

"text-slate-600 hover:text-emerald-700 hover:bg-white"

}

`;



const handleLogout=()=>{

logout();

navigate("/");

};



return(


<aside
className={`fixed top-0 left-0 z-50 h-screen w-64 border-r backdrop-blur-xl flex flex-col transition-transform duration-300

${isOpen?"translate-x-0":"-translate-x-full lg:translate-x-0"}

${
isDark
?
"bg-[#061311]/95 border-teal-400/10"
:
"bg-white/90 border-slate-200"
}

`}
>


<div className="px-5 py-5 border-b border-white/10">


<div className="flex items-center gap-3">


<div className="w-10 h-10 rounded-xl bg-teal-400 flex items-center justify-center font-black text-[#061311]">

SL

</div>


<div>

<h1 className={`text-lg font-bold ${
isDark?"text-white":"text-[#061311]"
}`}>
Skillora
</h1>


<p className="text-[11px] text-slate-400">
Admin Panel
</p>


</div>


</div>


</div>




<nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">


{links.map(link=>(

<NavLink

key={link.name}

to={link.path}

onClick={onClose}

className={linkClass}

>

<SidebarIcon type={link.icon}/>

<span>{link.name}</span>


</NavLink>


))}


</nav>



<div className="p-4 border-t border-white/10">


<button

onClick={handleLogout}

className="w-full py-2.5 rounded-xl text-sm font-semibold bg-red-500/10 text-red-400 border border-red-400/20 hover:bg-red-500/20"

>

Logout

</button>


</div>



</aside>


);


}


export default AdminSidebar;