import api from "./api";


export const applyInstructor = (data)=>{
    return api.post(
        "/instructor/apply",
        data
    );
};