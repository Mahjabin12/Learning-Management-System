import { useEffect, useState } from "react";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import DataTable from "../../components/admin/DataTable";
import StatusBadge from "../../components/admin/StatusBadge";

import {
  getStudents,
  getInstructors,
  getUserDetails,
  deleteUser,
} from "../../services/adminApi";


function useAdminTheme() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    const syncTheme = () =>
      setTheme(localStorage.getItem("theme") || "dark");

    window.addEventListener("themechange", syncTheme);
    window.addEventListener("storage", syncTheme);

    return () => {
      window.removeEventListener("themechange", syncTheme);
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  return theme;
}



function AdminUsers() {

  const theme = useAdminTheme();
  const isDark = theme === "dark";


  const [students,setStudents] = useState([]);
  const [instructors,setInstructors] = useState([]);

  const [role,setRole] = useState("student");
  const [search,setSearch] = useState("");

  const [selectedUser,setSelectedUser] = useState(null);


  const loadUsers = async()=>{

    try{
      const params = {
        search
      };

      const [
        studentResponse,
        instructorResponse
      ] = await Promise.all([

        getStudents(params),
        getInstructors(params)

      ]);

      setStudents(
        studentResponse.data.users || []
      );

      setInstructors(
        instructorResponse.data.users || []
      );
    }
    catch(error){
      console.log(
        "ADMIN USERS FETCH ERROR",
        error
      );
    }
  };



  useEffect(()=>{

    loadUsers();

  },[search]);





  const viewUser = async(id)=>{

    try{

      const response =
      await getUserDetails(id);


      setSelectedUser(
        response.data.user
      );


    }catch(error){

      console.log(
        "VIEW USER ERROR",
        error
      );

    }

  };






  const removeUser = async(id)=>{

    const confirmDelete =
    window.confirm(
      "Are you sure you want to remove this user?"
    );


    if(!confirmDelete)
      return;


    try{

      await deleteUser(id);

      setSelectedUser(null);

      loadUsers();


    }catch(error){

      console.log(
        "DELETE USER ERROR",
        error
      );

    }

  };






  const getStatus = (user)=>{

  if(user.role==="student"){

    return user.hasPurchasedCourse
    ?
    "Active"
    :
    "Inactive";

  }


  if(user.role==="instructor"){

    return user.instructorStatus==="approved"
    ?
    "Active"
    :
    "Inactive";

  }


  return "Inactive";

};





  const currentUsers =
  role==="student"
  ?
  students
  :
  instructors;





  const columns=[

    {
      key:"name",
      label:"User",

      render:(row)=>(

        <div>

          <p className={`text-sm font-semibold ${
            isDark
            ?
            "text-white"
            :
            "text-[#061311]"
          }`}>
            {row.name}
          </p>


          <p className="text-xs text-slate-400">
            {row.email}
          </p>

        </div>

      )

    },



    {
      key:"role",
      label:"Role",

      render:(row)=>(

        <span className="text-teal-400 font-semibold text-sm capitalize">
          {row.role}
        </span>

      )

    },



    {
      key:"status",
      label:"Status",

      render:(row)=>(

        <StatusBadge
          status={
            getStatus(row)
          }
        />

      )

    },



    {
      key:"action",
      label:"Action",

      render:(row)=>(

        <div className="flex gap-2">


          <button
            onClick={()=>viewUser(row._id)}
            className="
            px-3 py-1.5 rounded-lg
            text-xs font-semibold
            bg-teal-400
            text-[#061311]
            hover:bg-teal-300
            transition
            "
          >
            View
          </button>

          <button
            onClick={()=>removeUser(row._id)}
            className="
            px-3 py-1.5 rounded-lg
            text-xs font-semibold
            bg-red-500/10
            text-red-400
            border border-red-400/20
            hover:bg-red-500/20
            transition
            "
          >
            Remove
          </button>
        </div>

      )
    }
  ];

    return (

    <div className="p-4 sm:p-6 lg:p-8">

      <AdminPageHeader
        title="Manage Users"
        subtitle="Monitor students and instructors, view profiles, and manage platform users."
      />

      <section
        className={`
        rounded-3xl border p-5 mb-8
        ${
          isDark
          ?
          "bg-[#102823] border-[#24564c]"
          :
          "bg-white border-emerald-100"
        }
        `}
      >


        <div className="grid md:grid-cols-3 gap-4">


          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className={`
            h-11 rounded-xl px-4 text-sm border outline-none
            ${
              isDark
              ?
              "bg-[#18342e] border-[#28594e] text-white placeholder:text-slate-400"
              :
              "bg-white border-emerald-200 text-[#061311]"
            }
            `}
          />



          <select
            value={role}
            onChange={(e)=>setRole(e.target.value)}
            className={`
            h-11 rounded-xl px-4 text-sm border outline-none
            ${
              isDark
              ?
              "bg-[#18342e] border-[#28594e] text-white"
              :
              "bg-white border-emerald-200 text-[#061311]"
            }
            `}
          >

            <option value="student">
              Students
            </option>

            <option value="instructor">
              Instructors
            </option>

          </select>



          <div
            className={`
            h-11 rounded-xl px-4 flex items-center
            text-sm font-semibold
            ${
              isDark
              ?
              "bg-[#18342e] text-slate-300"
              :
              "bg-emerald-50 text-emerald-700"
            }
            `}
          >

            Total:
            {" "}
            {currentUsers.length}

          </div>
        </div>
      </section>


      <DataTable
        columns={columns}
        data={currentUsers}
      />


      {
        selectedUser && (

          <div
            className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/60 backdrop-blur-sm
            p-4
            "
          >


            <div
              className={`
              w-full max-w-lg
              rounded-3xl border
              p-6
              ${
                isDark
                ?
                "bg-[#102823] border-[#24564c]"
                :
                "bg-white border-emerald-100"
              }
              `}
            >


              <div className="flex justify-between items-start mb-6">


                <div>

                  <h2
                    className={`
                    text-xl font-black
                    ${
                      isDark
                      ?
                      "text-white"
                      :
                      "text-[#061311]"
                    }
                    `}
                  >
                    User Details
                  </h2>


                  <p className="text-sm text-slate-400 mt-1">
                    Complete profile information
                  </p>

                </div>

                <button
                  onClick={()=>setSelectedUser(null)}
                  className="
                  text-slate-400
                  hover:text-red-400
                  text-xl
                  "
                >
                  ✕
                </button>

              </div>

              <div className="space-y-4">


                <div>

                  <p className="text-xs text-slate-400">
                    Name
                  </p>

                  <p className="font-semibold">
                    {selectedUser.name}
                  </p>

                </div>

                <div>

                  <p className="text-xs text-slate-400">
                    Email
                  </p>

                  <p className="font-semibold">
                    {selectedUser.email}
                  </p>

                </div>

                <div>

                  <p className="text-xs text-slate-400">
                    Role
                  </p>

                  <p className="font-semibold text-teal-400 capitalize">
                    {selectedUser.role}
                  </p>

                </div>

                <div>

                  <p className="text-xs text-slate-400">
                    Account Status
                  </p>

                  <StatusBadge
                    status={
                      getStatus(selectedUser)
                    }
                  />

                </div>

                <div>

                  <p className="text-xs text-slate-400">
                    Joined Date
                  </p>

                  <p className="font-semibold">
                    {
                      new Date(
                        selectedUser.createdAt
                      ).toLocaleDateString()
                    }
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8">

                <button
                  onClick={()=>setSelectedUser(null)}
                  className="
                  px-5 py-2.5
                  rounded-xl
                  border
                  text-sm
                  font-semibold
                  "
                >
                  Close
                </button>

                <button
                  onClick={()=>
                    removeUser(selectedUser._id)  }
                  className=" px-5 py-2.5 rounded-xl bg-red-500/10
                  text-red-400
                  border border-red-400/20
                  text-sm
                  font-semibold
                  "
                >
                  Remove User
                </button>

              </div>
            </div>
          </div>
        )
      }

    </div>

  );

}

export default AdminUsers;