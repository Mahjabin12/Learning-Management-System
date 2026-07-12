import api from "./api";


// ===============================
// ADMIN DASHBOARD
// ===============================

export const getAdminStats = ()=>{
  return api.get("/admin/stats");
};


export const getAdminRevenue = ()=>{
  return api.get("/admin/revenue"); 
};


 
// ===============================
// ADMIN USER MANAGEMENT
// ===============================


// Students

export const getStudents = (params={})=>{

  return api.get(
    "/admin/users/students",
    {
      params
    }
  );

};



// Instructors

export const getInstructors = (params={})=>{

  return api.get(
    "/admin/users/instructors",
    {
      params
    }
  );

};



// Single user details

export const getUserDetails = (id)=>{

  return api.get(
    `/admin/users/${id}`
  );

};



// Remove user permanently

export const deleteUser = (id)=>{

  return api.delete(
    `/admin/users/${id}`
  );

};

// ===============================
// ADMIN SETTINGS
// ===============================


export const getAdminSettings = ()=>{

return api.get(
"/admin/settings"
);

};



export const updateAdminWebsite = (data)=>{

return api.patch(
"/admin/settings/website",
data
);

};



export const updateAdminNotifications = (data)=>{

return api.patch(
"/admin/settings/notifications",
data
);

};



export const updateLandingPage = (data)=>{

return api.patch(
"/admin/settings/landing",
data
);

};



export const updateAdminPassword = (data)=>{

return api.patch(
"/admin/settings/password",
data
);

};

export const getActivityLogs=(params={})=>{

return api.get(
"/admin/activity-logs",
{
params
}
);
};




export const getInstructorApplications = ()=>{
    return api.get("/admin/instructor-applications");
};


export const approveInstructor = (id)=>{
    return api.patch(
        `/admin/instructors/${id}/approve`
    );
};


export const rejectInstructor = (id,data)=>{
    return api.patch(
        `/admin/instructors/${id}/reject`,
        data
    );
};



// ===============================
// ADMIN CATEGORY MANAGEMENT
// ===============================
export const getCategories = ()=>{
return api.get("/admin/categories");
};

export const createCategory = (data)=>{
return api.post("/admin/categories", data);
};

export const updateCategory = (id,data)=>{
return api.patch(`/admin/categories/${id}`, data);
};

export const deleteCategory = (id)=>{
return api.delete(`/admin/categories/${id}`);
}; 

export const getEnrollments = ()=>{
return api.get( "/admin/enrollments");
}; 

export const getCourses = () => {
  return api.get("/admin/courses");
};

export const getCourseById = (id) => {
  return api.get(`/admin/courses/${id}`);
};