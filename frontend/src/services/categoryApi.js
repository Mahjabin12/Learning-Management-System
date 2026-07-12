import api from "./api";


// GET ALL CATEGORIES

export const getCategories = ()=>{

return api.get(
"/categories"
);

};



// GET SINGLE CATEGORY DETAILS

export const getCategoryDetails = (id)=>{

return api.get(
`/categories/${id}`
);

}; 