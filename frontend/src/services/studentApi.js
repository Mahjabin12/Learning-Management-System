import api from "./api";



export const getStudentDashboard = ()=>{

return api.get(
"/student/dashboard"
);

};



export const getMyCourses = ()=>{

return api.get(
"/student/my-courses"
);

};



export const getMyCertificates = ()=>{

return api.get(
"/student/certificates"
);

};





export const getStudentSettings = ()=>{


return api.get(

"/student/settings"

);


};





export const updateStudentSettings = (data)=>{


return api.put(

"/student/settings",

data

);


};