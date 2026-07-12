import AdminPageHeader from "../../components/admin/AdminPageHeader";


function AdminContactRequests(){


return (

<div className="p-6">


<AdminPageHeader

title="Contact Requests"

subtitle="Review messages submitted from website visitors."

/>




<div

className="
rounded-2xl
overflow-hidden
border
border-white/10
bg-white/[0.03]
"

>


<table className="w-full">


<thead>

<tr className="border-b border-white/10 text-left">

<th className="p-5 text-slate-400">
Name
</th>


<th className="p-5 text-slate-400">
Email
</th>


<th className="p-5 text-slate-400">
Message
</th>


</tr>

</thead>


<tbody>

<tr>

<td
colSpan="3"
className="
p-10
text-center
text-slate-400
"
>

No contact requests available

</td>


</tr>


</tbody>


</table>


</div>



</div>

);


}


export default AdminContactRequests;