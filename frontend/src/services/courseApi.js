import api from "./api";


export const getCourses = () =>
api.get("/admin/courses");


export const approveCourse = (id)=>
api.patch(`/admin/courses/${id}/approve`);


export const rejectCourse = (id)=>
api.patch(`/admin/courses/${id}/reject`);


export const deleteCourse = (id)=>
api.delete(`/admin/courses/${id}`);


export default {
getCourses,
approveCourse,
rejectCourse,
deleteCourse
};