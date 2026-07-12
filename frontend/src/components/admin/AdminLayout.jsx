import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";


function AdminLayout({children}){

const [theme,setTheme]=useState(
localStorage.getItem("theme") || "dark"
);

const [sidebarOpen,setSidebarOpen]=useState(false);
const isDark = theme==="dark";

useEffect(()=>{
const syncTheme=()=>{
const saved =
localStorage.getItem("theme") || "dark";


setTheme(saved);
document.documentElement.classList.toggle(
"dark",
saved==="dark"
);
};



syncTheme();

window.addEventListener("themechange",syncTheme);
window.addEventListener("storage",syncTheme);

return()=>{
    window.removeEventListener("themechange", syncTheme);
    window.removeEventListener("storage", syncTheme );
};
},[]);


return(


<div
className={`
min-h-screen
flex
transition-colors
${
isDark
?
"bg-[#061311] text-white" :
"bg-[#f4faf8] text-[#061311]"
}`}>


{/* Sidebar */}

<AdminSidebar
isOpen={sidebarOpen}
onClose={()=>
setSidebarOpen(false)
} />


{/* Right Side */}
<div className=" flex-1 lg:ml-64 min-h-screen">

{/* Topbar */}

<AdminTopbar
onMenuClick={()=> setSidebarOpen(true)}/>

  {/* Main Content */}

  <main className={`min-h-screen px-4 sm:px-6 lg:px-8 pb-10 ${ isDark ? "bg-[#061311]" : "bg-[#f4faf8]" }`}>
    <div className="max-w-[1600px] mx-auto">
    {
    children || <Outlet/>
    }
    </div>
  </main>
</div>

</div>
);
}


export default AdminLayout;