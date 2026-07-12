import AdminPageHeader from "../../components/admin/AdminPageHeader";


function AdminReviews(){


return (

<div className="p-6">


<AdminPageHeader

title="Reviews"

subtitle="Manage student reviews and feedback."

/>




<div

className="
rounded-2xl
border
border-white/10
bg-white/[0.03]

p-10
text-center

"

>


<h3 className="text-xl font-bold text-white">

No Reviews Found

</h3>


<p className="text-slate-400 mt-2">

Student reviews will appear after database connection.

</p>


</div>



</div>

);


}


export default AdminReviews;