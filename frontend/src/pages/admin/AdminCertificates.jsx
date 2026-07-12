import { useState } from "react";
import AdminPageHeader from "../../components/admin/AdminPageHeader";

const certificateRequests = [
  {
    id: 1,
    student: "Sarah Ahmed",
    course: "UI/UX Design Masterclass",
    date: "10 July 2026",
    status: "Pending",
  },
  {
    id: 2,
    student: "Rahim Hasan",
    course: "Digital Marketing Basics",
    date: "08 July 2026",
    status: "Approved",
  },
  {
    id: 3,
    student: "Ayesha Karim",
    course: "Advanced Canva Design",
    date: "05 July 2026",
    status: "Pending",
  },
];

function AdminCertificates() {
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const [certificateData, setCertificateData] = useState({
    student: "",
    course: "",
    date: "",
    certificateId: "",
    instructor: "Skillora Instructor",
    signature: "Skillora Academy",
  });


  const openCertificate = (item) => {
    setSelectedCertificate(item);

    setCertificateData({
      student: item.student,
      course: item.course,
      date: item.date,
      certificateId: `SK-${item.id}-2026`,
      instructor: "Skillora Instructor",
      signature: "Skillora Academy",
    });
  };


  return (
    <div className="p-4 sm:p-6 lg:p-8">

      <AdminPageHeader
        title="Certificates"
        subtitle="Review certificate requests, customize certificate details and approve student certificates."
      />


      {/* Statistics */}

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-6 mb-8">

        {[
          ["Total Certificates", "120"],
          ["Approved", "96"],
          ["Pending", "24"],
          ["Rejected", "3"],
        ].map(([title, value]) => (
          <div
            key={title}
            className="
              rounded-2xl
              border
              border-[#24564c]
              bg-[#102823]
              p-5
            "
          >
            <p className="text-xs text-slate-400 font-medium">
              {title}
            </p>

            <h2 className="text-2xl font-black text-white mt-2">
              {value}
            </h2>
          </div>
        ))}

      </div>



      <div className="grid xl:grid-cols-2 gap-6">


        {/* Request List */}

        <section
          className="
          rounded-2xl
          border
          border-[#24564c]
          bg-[#102823]
          p-5
          "
        >

          <h2 className="text-lg font-bold text-white mb-5">
            Certificate Requests
          </h2>


          <div className="space-y-3">

            {certificateRequests.map((item) => (

              <div
                key={item.id}
                className="
                rounded-xl
                border
                border-[#28594e]
                bg-[#18342e]
                p-4
                flex
                justify-between
                items-center
                "
              >

                <div>

                  <h3 className="text-sm font-semibold text-white">
                    {item.student}
                  </h3>

                  <p className="text-xs text-slate-400 mt-1">
                    {item.course}
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    Completed: {item.date}
                  </p>

                </div>


                <div className="text-right">

                  <span
                    className={`
                    text-xs
                    px-3
                    py-1
                    rounded-full
                    ${
                      item.status === "Pending"
                        ? "bg-yellow-400/10 text-yellow-400"
                        : "bg-green-400/10 text-green-400"
                    }
                    `}
                  >
                    {item.status}
                  </span>


                  <button
                    onClick={() => openCertificate(item)}
                    className="
                    block
                    mt-3
                    px-4
                    py-2
                    rounded-lg
                    bg-teal-400
                    text-[#061311]
                    text-xs
                    font-bold
                    hover:bg-teal-300
                    transition
                    "
                  >
                    View
                  </button>

                </div>

              </div>

            ))}

          </div>

        </section>





        {/* Certificate Designer */}

        <section
          className="
          rounded-2xl
          border
          border-[#24564c]
          bg-[#102823]
          p-5
          "
        >

          <h2 className="text-lg font-bold text-white mb-5">
            Certificate Design
          </h2>



          {selectedCertificate ? (

            <>

              {/* Certificate Preview */}

              <div
                className="
                rounded-2xl
                p-8
                text-center
                mb-5
                bg-gradient-to-br
                from-[#0d211d]
                via-[#ffffff]
                to-[#0f3d34]
                border
                border-teal-300/30
                text-[#061311]
                "
              >

                <p className="
                  text-xs
                  tracking-[4px]
                  font-semibold
                  text-emerald-700
                ">
                  SKILLORA ACADEMY
                </p>


                <h3 className="
                  text-xl
                  font-black
                  mt-4
                ">
                  CERTIFICATE OF COMPLETION
                </h3>


                <p className="text-sm mt-6">
                  This certificate is proudly presented to
                </p>


                <h1 className="
                  text-3xl
                  font-black
                  mt-3
                  text-emerald-900
                ">
                  {certificateData.student}
                </h1>


                <p className="text-sm mt-5">
                  for successfully completing
                </p>


                <h2 className="
                  text-lg
                  font-bold
                  mt-2
                ">
                  {certificateData.course}
                </h2>


                <div className="
                  flex
                  justify-between
                  text-xs
                  mt-10
                  px-5
                ">

                  <div>
                    <p className="font-bold">
                      {certificateData.instructor}
                    </p>
                    <p>Instructor</p>
                  </div>


                  <div>
                    <p className="font-bold">
                      {certificateData.signature}
                    </p>
                    <p>Authorized Signature</p>
                  </div>

                </div>


                <div className="mt-6 text-xs">

                  <p>
                    Issue Date: {certificateData.date}
                  </p>

                  <p>
                    Certificate ID: {certificateData.certificateId}
                  </p>

                </div>


              </div>





              {/* Edit Fields */}

              <div className="space-y-3">

                {[
                  ["student", "Student Name"],
                  ["course", "Course Title"],
                  ["date", "Issue Date"],
                  ["certificateId", "Certificate ID"],
                  ["instructor", "Instructor Name"],
                  ["signature", "Signature Name"],
                ].map(([key, label]) => (

                  <input
                    key={key}
                    value={certificateData[key]}
                    onChange={(e) =>
                      setCertificateData({
                        ...certificateData,
                        [key]: e.target.value,
                      })
                    }
                    placeholder={label}
                    className="
                    w-full
                    h-11
                    rounded-xl
                    bg-[#18342e]
                    border
                    border-[#28594e]
                    px-4
                    text-sm
                    text-white
                    outline-none
                    focus:border-teal-400
                    "
                  />

                ))}


                <button
                  className="
                  w-full
                  py-3
                  rounded-xl
                  bg-teal-400
                  text-[#061311]
                  font-bold
                  text-sm
                  hover:bg-teal-300
                  transition
                  "
                >
                  Approve Certificate
                </button>


              </div>


            </>


          ) : (

            <div className="
              h-full
              min-h-[300px]
              flex
              items-center
              justify-center
              text-center
            ">

              <p className="text-sm text-slate-400">
                Select a pending certificate request to preview certificate.
              </p>

            </div>

          )}


        </section>


      </div>


    </div>
  );
}

export default AdminCertificates;