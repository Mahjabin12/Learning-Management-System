import Category from "../models/Category.js";


// =================================
// GET ALL ACTIVE CATEGORIES
// =================================

export const getPublicCategories = async(req,res)=>{

try{


const categories = await Category.find({
status:"Active"
})
.sort({
createdAt:-1
});



res.status(200).json({

success:true,

count:categories.length,

categories

});


}
catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};




// =================================
// GET SINGLE CATEGORY DETAILS
// =================================

export const getCategoryDetails = async(req,res)=>{

try{


const category =
await Category.findById(
req.params.id
);



if(!category){

return res.status(404).json({

success:false,

message:"Category not found"

});

}



res.status(200).json({

success:true,

category

});


}
catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};


