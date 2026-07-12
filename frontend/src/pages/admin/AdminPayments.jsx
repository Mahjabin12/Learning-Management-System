import AdminPageHeader from "../../components/admin/AdminPageHeader";


function AdminPayments(){


return (

<div className="p-6">


<AdminPageHeader

title="Payments"

subtitle="Monitor course payments and transactions."

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

No Transactions

</h3>


<p className="text-slate-400 mt-2">

Payment records will appear here.

</p>


</div>



</div>

);


}


export default AdminPayments;