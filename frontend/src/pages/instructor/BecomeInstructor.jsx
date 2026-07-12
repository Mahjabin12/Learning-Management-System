import { useEffect, useMemo, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { applyInstructor } from "../../services/instructorApi";
const STEPS = [
  {
    id: 1,
    title: "Terms & Earnings",
    shortTitle: "Terms",
  },
  {
    id: 2,
    title: "Teaching Profile",
    shortTitle: "Profile",
  },
  {
    id: 3,
    title: "Verification",
    shortTitle: "Verification",
  },
  {
    id: 4,
    title: "Introduction & Plan",
    shortTitle: "Teaching Plan",
  },
  {
    id: 5,
    title: "Review & Submit",
    shortTitle: "Review",
  },
];

const COURSE_CATEGORIES = [
  "UI/UX Design",
  "Graphic Design",
  "Web Design",
  "Web Development",
  "Digital Marketing",
  "Branding",
  "Video Editing",
  "Motion Graphics",
  "Business",
  "Freelancing",
];

const LANGUAGES = ["Bangla", "English"];

const COURSE_LEVELS = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "All Levels",
];

const initialFormData = {
  acceptedPolicies: false,

  professionalHeadline: "",
  professionalBio: "",
  yearsOfExperience: "",
  currentOccupation: "",
  workplace: "",
  skills: "",
  languages: [],
  categories: [],

  portfolioLink: "",
  linkedinLink: "",
  behanceLink: "",
  githubLink: "",
  websiteLink: "",
  certificateLink: "",
  cvFileName: "",

  introductionVideoUrl: "",
  teachingReason: "",
  sampleCourseTitle: "",
  plannedCourseDescription: "",
  targetLearners: "",
  courseLevel: "",
  teachingApproach: "",
};

function getSavedTheme() {
  if (typeof window === "undefined") return "dark";
  return localStorage.getItem("theme") || "dark";
}

function BecomeInstructor() {
  const navigate = useNavigate();
  const panelTopRef = useRef(null);

  const { user, isLoggedIn } = useAuth();

  const [theme, setTheme] = useState(getSavedTheme);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [cvFile, setCvFile] = useState(null);

  const [applicationStatus, setApplicationStatus] =
    useState("not_submitted");

  const [submittedAt, setSubmittedAt] = useState("");
  const [adminFeedback, setAdminFeedback] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");

  const isDark = theme === "dark";

  const storageKey = useMemo(() => {
    const identity =
      user?._id ||
      user?.id ||
      user?.email ||
      "current-user";

    return `skillora_instructor_application_${identity}`;
  }, [user]);

  const userName =
    user?.name ||
    user?.fullName ||
    user?.displayName ||
    "Skillora User";

  const userEmail = user?.email || "No email available";

  const userAvatar =
    user?.avatar ||
    user?.photoURL ||
    user?.profileImage ||
    "";

  useEffect(() => {
    const syncTheme = () => {
      setTheme(getSavedTheme());
    };

    window.addEventListener("themechange", syncTheme);
    window.addEventListener("storage", syncTheme);

    return () => {
      window.removeEventListener("themechange", syncTheme);
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;

    const savedApplication = localStorage.getItem(storageKey);

    if (!savedApplication) return;

    try {
      const parsedApplication = JSON.parse(savedApplication);

      setFormData({
        ...initialFormData,
        ...(parsedApplication.formData || {}),
      });

      setCurrentStep(parsedApplication.currentStep || 1);
      setApplicationStatus(
        parsedApplication.status || "not_submitted"
      );
      setSubmittedAt(parsedApplication.submittedAt || "");
      setAdminFeedback(parsedApplication.adminFeedback || "");
    } catch (error) {
      console.error(
        "Failed to load instructor application:",
        error
      );
    }
  }, [isLoggedIn, storageKey]);

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: "/become-instructor" }}
      />
    );
  }

  const pageTheme = isDark
    ? "bg-[#020a08] text-white"
    : "bg-[#eaf6f0] text-[#10241E]";

  const panelTheme = isDark
    ? "border-white/10 bg-[#071713]/95 text-white shadow-[0_30px_100px_rgba(0,0,0,0.55)]"
    : "border-white/80 bg-white/95 text-[#10241E] shadow-[0_30px_100px_rgba(16,185,129,0.18)]";

  const sidebarTheme = isDark
    ? "border-white/10 bg-[#04110e]/90"
    : "border-emerald-900/10 bg-[#f5fbf8]";

  const cardTheme = isDark
    ? "border-white/[0.08] bg-white/[0.035]"
    : "border-emerald-900/10 bg-white/75";

  const inputTheme = isDark
    ? "border-white/10 bg-[#03100d] text-white placeholder:text-slate-600 focus:border-teal-400"
    : "border-emerald-900/10 bg-white text-[#10241E] placeholder:text-slate-400 focus:border-teal-500";

  const mutedText = isDark
    ? "text-slate-400"
    : "text-slate-600";

  const subtleText = isDark
    ? "text-slate-500"
    : "text-slate-500";

  const setFeedbackMessage = (text, type = "error") => {
    setMessage(text);
    setMessageType(type);
  };

  const scrollToPanelTop = () => {
    window.requestAnimationFrame(() => {
      panelTopRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    setMessage("");

    setFormData((currentData) => ({
      ...currentData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleArrayItem = (field, value) => {
    setMessage("");

    setFormData((currentData) => {
      const currentItems = currentData[field] || [];
      const alreadySelected = currentItems.includes(value);

      return {
        ...currentData,
        [field]: alreadySelected
          ? currentItems.filter((item) => item !== value)
          : [...currentItems, value],
      };
    });
  };

  const handleCvUpload = (event) => {
    const file = event.target.files?.[0];

    setMessage("");

    if (!file) return;

    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      event.target.value = "";
      setCvFile(null);

      setFormData((currentData) => ({
        ...currentData,
        cvFileName: "",
      }));

      setFeedbackMessage(
        "Please upload your CV or resume as a PDF file."
      );

      return;
    }

    const maximumSize = 5 * 1024 * 1024;

    if (file.size > maximumSize) {
      event.target.value = "";
      setCvFile(null);

      setFormData((currentData) => ({
        ...currentData,
        cvFileName: "",
      }));

      setFeedbackMessage(
        "The PDF file must be smaller than 5 MB."
      );

      return;
    }

    setCvFile(file);

    setFormData((currentData) => ({
      ...currentData,
      cvFileName: file.name,
    }));

    setFeedbackMessage(
      `${file.name} selected successfully.`,
      "success"
    );
  };

  const hasProfessionalProof = Boolean(
    formData.portfolioLink.trim() ||
      formData.linkedinLink.trim() ||
      formData.behanceLink.trim() ||
      formData.githubLink.trim() ||
      formData.websiteLink.trim()
  );

  const validateStep = (stepNumber) => {
    if (stepNumber === 1) {
      if (!formData.acceptedPolicies) {
        setFeedbackMessage(
          "Please accept the Instructor Terms, Privacy Policy, Content Policy, revenue share, and refund conditions."
        );

        return false;
      }
    }

    if (stepNumber === 2) {
      if (!formData.professionalHeadline.trim()) {
        setFeedbackMessage(
          "Please enter your professional headline."
        );

        return false;
      }

      if (!formData.professionalBio.trim()) {
        setFeedbackMessage(
          "Please enter your professional bio."
        );

        return false;
      }

      if (!formData.yearsOfExperience) {
        setFeedbackMessage(
          "Please enter your years of experience."
        );

        return false;
      }

      if (!formData.currentOccupation.trim()) {
        setFeedbackMessage(
          "Please enter your current occupation."
        );

        return false;
      }

      if (!formData.skills.trim()) {
        setFeedbackMessage(
          "Please enter your skills and expertise."
        );

        return false;
      }

      if (formData.languages.length === 0) {
        setFeedbackMessage(
          "Please select at least one teaching language."
        );

        return false;
      }

      if (formData.categories.length === 0) {
        setFeedbackMessage(
          "Please select at least one teaching category."
        );

        return false;
      }
    }

    if (stepNumber === 3) {
      if (!formData.cvFileName) {
        setFeedbackMessage(
          "Please upload your CV or resume in PDF format."
        );

        return false;
      }

      if (!hasProfessionalProof) {
        setFeedbackMessage(
          "Please provide at least one portfolio or professional profile link."
        );

        return false;
      }
    }

    if (stepNumber === 4) {
      if (!formData.introductionVideoUrl.trim()) {
        setFeedbackMessage(
          "Please provide your instructor introduction video link."
        );

        return false;
      }

      if (!formData.teachingReason.trim()) {
        setFeedbackMessage(
          "Please explain why you want to teach on Skillora."
        );

        return false;
      }

      if (!formData.sampleCourseTitle.trim()) {
        setFeedbackMessage(
          "Please enter a sample course title."
        );

        return false;
      }

      if (!formData.plannedCourseDescription.trim()) {
        setFeedbackMessage(
          "Please describe the course you plan to create."
        );

        return false;
      }

      if (!formData.targetLearners.trim()) {
        setFeedbackMessage(
          "Please describe your target learners."
        );

        return false;
      }

      if (!formData.courseLevel) {
        setFeedbackMessage(
          "Please select the expected course level."
        );

        return false;
      }

      if (!formData.teachingApproach.trim()) {
        setFeedbackMessage(
          "Please briefly describe your teaching approach."
        );

        return false;
      }
    }

    setMessage("");
    return true;
  };

  const saveApplication = ({
    status = applicationStatus,
    step = currentStep,
    newSubmittedAt = submittedAt,
  } = {}) => {
    const applicationData = {
      status,
      currentStep: step,
      submittedAt: newSubmittedAt,
      adminFeedback,
      formData,
    };

    localStorage.setItem(
      storageKey,
      JSON.stringify(applicationData)
    );
  };

  const handleSaveDraft = () => {
    saveApplication({
      status: "draft",
      step: currentStep,
    });

    setApplicationStatus("draft");

    setFeedbackMessage(
      "Your instructor application draft has been saved.",
      "success"
    );
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;

    const nextStep = Math.min(currentStep + 1, STEPS.length);

    setCurrentStep(nextStep);

    saveApplication({
      status: "draft",
      step: nextStep,
    });

    setApplicationStatus("draft");
    scrollToPanelTop();
  };

  const handleBack = () => {
    const previousStep = Math.max(currentStep - 1, 1);

    setCurrentStep(previousStep);
    setMessage("");
    scrollToPanelTop();
  };

  const handleStepClick = (stepId) => {
    if (stepId <= currentStep) {
      setCurrentStep(stepId);
      setMessage("");
      scrollToPanelTop();
    }
  };

  const validateEntireApplication = () => {
    for (let step = 1; step <= 4; step += 1) {
      if (!validateStep(step)) {
        setCurrentStep(step);
        scrollToPanelTop();
        return false;
      }
    }

    return true;
  };

  const handleSubmitApplication = async()=>{


if(!validateEntireApplication()) return;


try{


const response =
await applyInstructor(formData);



console.log(
"APPLICATION RESPONSE:",
response.data
);



const newSubmittedAt =
new Date().toISOString();



setApplicationStatus(
"pending"
);


setSubmittedAt(
newSubmittedAt
);



saveApplication({

status:"pending",

step:5,

newSubmittedAt,

});



setMessage(
"Application submitted successfully"
);


window.scrollTo({

top:0,

behavior:"smooth"

});



}
catch(error){


console.log(
"APPLY ERROR:",
error
);


setFeedbackMessage(

error.response?.data?.message ||
"Application submission failed"

);


}


};

  const handleEditRejectedApplication = () => {
    setApplicationStatus("draft");
    setCurrentStep(3);
    setMessage("");

    saveApplication({
      status: "draft",
      step: 3,
    });
  };

  const formattedSubmittedDate = submittedAt
    ? new Date(submittedAt).toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "";

  if (applicationStatus === "pending") {
    return (
      <StatusScreen
        isDark={isDark}
        pageTheme={pageTheme}
        panelTheme={panelTheme}
        mutedText={mutedText}
        icon="⏳"
        label="Application Pending"
        labelClass="text-amber-400"
        iconClass="bg-amber-400/15"
        title="Your application is under review"
        description="The Skillora admin team is reviewing your teaching profile, CV, professional proof, introduction video, and course plan."
        details={[
          {
            label: "Current status",
            value: "Pending",
          },
          {
            label: "Submitted",
            value: formattedSubmittedDate || "Recently",
          },
          {
            label: "Estimated review",
            value: "2–5 working days",
          },
        ]}
        buttonText="Back to My Dashboard"
        onButtonClick={() => navigate("/student/dashboard")}
      />
    );
  }

  if (applicationStatus === "approved") {
    return (
      <StatusScreen
        isDark={isDark}
        pageTheme={pageTheme}
        panelTheme={panelTheme}
        mutedText={mutedText}
        icon="✓"
        label="Application Approved"
        labelClass="text-teal-400"
        iconClass="bg-teal-400/15"
        title="Your Instructor Dashboard is ready"
        description="Your application has been approved. You can now create courses, manage students, view analytics, and track your earnings."
        details={[
          {
            label: "Instructor status",
            value: "Approved",
          },
          {
            label: "Dashboard access",
            value: "Unlocked",
          },
        ]}
        buttonText="Open Instructor Dashboard"
        onButtonClick={() =>
          navigate("/instructor/dashboard")
        }
      />
    );
  }

  if (applicationStatus === "rejected") {
    return (
      <StatusScreen
        isDark={isDark}
        pageTheme={pageTheme}
        panelTheme={panelTheme}
        mutedText={mutedText}
        icon="!"
        label="Changes Required"
        labelClass="text-red-400"
        iconClass="bg-red-400/15"
        title="Please update your application"
        description={
          adminFeedback ||
          "Please provide clearer professional proof, a valid CV, or a better instructor introduction video."
        }
        details={[
          {
            label: "Current status",
            value: "Changes required",
          },
          {
            label: "Next action",
            value: "Edit and resubmit",
          },
        ]}
        buttonText="Edit Application"
        onButtonClick={handleEditRejectedApplication}
      />
    );
  }

  return (
    <main
      className={`relative min-h-screen overflow-hidden ${pageTheme}`}
    >
      {/* Blurred background */}
      <div className="pointer-events-none fixed inset-0">
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-[linear-gradient(145deg,#03110e_0%,#06231c_48%,#020806_100%)]"
              : "bg-[linear-gradient(145deg,#edf9f3_0%,#dcefe6_48%,#f8fffb_100%)]"
          }`}
        />

        <div
          className={`absolute -left-32 top-12 h-96 w-96 rounded-full blur-[120px] ${
            isDark ? "bg-teal-400/15" : "bg-teal-300/30"
          }`}
        />

        <div
          className={`absolute -right-28 bottom-0 h-[430px] w-[430px] rounded-full blur-[130px] ${
            isDark
              ? "bg-emerald-500/10"
              : "bg-emerald-300/25"
          }`}
        />

        {/* Mock page behind floating panel */}
        <div className="absolute inset-x-[6%] top-24 hidden opacity-30 blur-[5px] lg:block">
          <div
            className={`h-20 rounded-3xl border ${cardTheme}`}
          />

          <div className="mt-7 grid grid-cols-4 gap-5">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className={`h-32 rounded-3xl border ${cardTheme}`}
              />
            ))}
          </div>

          <div
            className={`mt-6 h-[420px] rounded-[32px] border ${cardTheme}`}
          />
        </div>

        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-[#020a08]/50"
              : "bg-white/35"
          } backdrop-blur-[3px]`}
        />
      </div>

      <div
        ref={panelTopRef}
        className="relative z-10 mx-auto max-w-[1480px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8"
      >
        {/* Floating application window */}
        <section
          className={`overflow-hidden rounded-[30px] border backdrop-blur-2xl ${panelTheme}`}
        >
          {/* Header */}
          <header
            className={`border-b px-5 py-6 sm:px-7 lg:px-9 ${
              isDark
                ? "border-white/10 bg-[#061914]/85"
                : "border-emerald-900/10 bg-white/70"
            }`}
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <button
                  type="button"
                  onClick={() =>
                    navigate("/student/dashboard")
                  }
                  className="text-sm font-black text-teal-400 transition hover:text-teal-300"
                >
                  ← Back to My Dashboard
                </button>

                <h1 className="mt-3 text-3xl font-black tracking-[-0.03em] sm:text-4xl">
                  Become a Skillora Instructor
                </h1>

                <p
                  className={`mt-3 max-w-2xl text-sm leading-6 sm:text-base ${mutedText}`}
                >
                  Complete your teaching profile and submit it
                  for admin approval.
                </p>
              </div>

              <div
                className={`flex items-center gap-3 rounded-2xl border px-4 py-3 ${cardTheme}`}
              >
                {userAvatar ? (
                  <img
                    src={userAvatar}
                    alt={userName}
                    className="h-11 w-11 rounded-xl object-cover"
                  />
                ) : (
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal-300 to-emerald-500 font-black text-[#03110e]">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                )}

                <div>
                  <p className="text-sm font-black">
                    {userName}
                  </p>

                  <p
                    className={`mt-0.5 text-xs ${mutedText}`}
                  >
                    {userEmail}
                  </p>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-7">
              <div className="mb-2 flex items-center justify-between gap-4 text-xs font-bold">
                <span className={mutedText}>
                  Application progress
                </span>

                <span className="text-teal-400">
                  {Math.round(
                    (currentStep / STEPS.length) * 100
                  )}
                  %
                </span>
              </div>

              <div
                className={`h-2 overflow-hidden rounded-full ${
                  isDark ? "bg-white/10" : "bg-emerald-900/10"
                }`}
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-teal-300 via-emerald-300 to-teal-500 transition-all duration-500"
                  style={{
                    width: `${
                      (currentStep / STEPS.length) * 100
                    }%`,
                  }}
                />
              </div>
            </div>
          </header>

          <div className="grid lg:grid-cols-[270px_minmax(0,1fr)]">
            {/* Sidebar */}
            <aside
              className={`border-b p-4 sm:p-5 lg:min-h-[700px] lg:border-b-0 lg:border-r lg:p-6 ${
                isDark
                  ? "border-white/10"
                  : "border-emerald-900/10"
              } ${sidebarTheme}`}
            >
              {/* Mobile steps */}
              <div className="flex gap-2 overflow-x-auto pb-2 lg:hidden">
                {STEPS.map((step) => {
                  const isActive = currentStep === step.id;
                  const isCompleted = currentStep > step.id;

                  return (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() =>
                        handleStepClick(step.id)
                      }
                      className={`shrink-0 rounded-xl border px-4 py-2 text-xs font-black transition ${
                        isActive
                          ? "border-teal-400 bg-teal-400 text-[#03110e]"
                          : isCompleted
                          ? "border-teal-400/30 bg-teal-400/10 text-teal-400"
                          : isDark
                          ? "border-white/10 text-slate-500"
                          : "border-emerald-900/10 text-slate-500"
                      }`}
                    >
                      {step.id}. {step.shortTitle}
                    </button>
                  );
                })}
              </div>

              {/* Desktop steps */}
              <div className="hidden space-y-3 lg:block">
                <p
                  className={`mb-5 text-xs font-black uppercase tracking-[0.18em] ${subtleText}`}
                >
                  Application Steps
                </p>

                {STEPS.map((step) => {
                  const isActive = currentStep === step.id;
                  const isCompleted = currentStep > step.id;

                  return (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() =>
                        handleStepClick(step.id)
                      }
                      className={`flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left transition-all duration-300 ${
                        isActive
                          ? "border-teal-400/40 bg-teal-400/10 text-teal-300"
                          : isCompleted
                          ? "border-teal-400/20 bg-teal-400/[0.04] text-teal-400"
                          : isDark
                          ? "border-transparent text-slate-500"
                          : "border-transparent text-slate-500"
                      }`}
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-black ${
                          isActive
                            ? "bg-teal-400 text-[#03110e]"
                            : isCompleted
                            ? "bg-teal-400/15 text-teal-400"
                            : isDark
                            ? "bg-white/[0.05]"
                            : "bg-emerald-900/[0.05]"
                        }`}
                      >
                        {isCompleted ? "✓" : step.id}
                      </span>

                      <span className="text-sm font-black">
                        {step.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div
                className={`mt-6 hidden rounded-2xl border p-4 text-xs leading-6 lg:block ${cardTheme} ${mutedText}`}
              >
                Your application is saved as a local draft
                until the backend API is connected.
              </div>
            </aside>

            {/* Step content */}
            <section className="min-w-0 p-5 sm:p-7 lg:p-9">
              {currentStep === 1 && (
                <TermsStep
                  formData={formData}
                  handleInputChange={handleInputChange}
                  cardTheme={cardTheme}
                  mutedText={mutedText}
                  isDark={isDark}
                />
              )}

              {currentStep === 2 && (
                <TeachingProfileStep
                  formData={formData}
                  handleInputChange={handleInputChange}
                  toggleArrayItem={toggleArrayItem}
                  inputTheme={inputTheme}
                  cardTheme={cardTheme}
                  mutedText={mutedText}
                />
              )}

              {currentStep === 3 && (
                <VerificationStep
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleCvUpload={handleCvUpload}
                  cvFile={cvFile}
                  inputTheme={inputTheme}
                  cardTheme={cardTheme}
                  mutedText={mutedText}
                  isDark={isDark}
                />
              )}

              {currentStep === 4 && (
                <IntroductionStep
                  formData={formData}
                  handleInputChange={handleInputChange}
                  inputTheme={inputTheme}
                  cardTheme={cardTheme}
                  mutedText={mutedText}
                />
              )}

              {currentStep === 5 && (
                <ReviewStep
                  formData={formData}
                  userName={userName}
                  userEmail={userEmail}
                  cardTheme={cardTheme}
                  mutedText={mutedText}
                />
              )}

              {message && (
                <div
                  className={`mt-6 rounded-2xl border px-5 py-4 text-sm font-bold ${
                    messageType === "success"
                      ? "border-teal-400/25 bg-teal-400/10 text-teal-400"
                      : "border-red-400/25 bg-red-400/10 text-red-400"
                  }`}
                >
                  {message}
                </div>
              )}

              {/* Bottom actions */}
              <div
                className={`mt-8 flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between ${
                  isDark
                    ? "border-white/10"
                    : "border-emerald-900/10"
                }`}
              >
                <div>
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className={`rounded-xl border px-5 py-3 text-sm font-black transition ${
                        isDark
                          ? "border-white/10 hover:border-teal-400"
                          : "border-emerald-900/10 hover:border-teal-500"
                      }`}
                    >
                      ← Back
                    </button>
                  )}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    className={`rounded-xl border px-5 py-3 text-sm font-black transition ${
                      isDark
                        ? "border-white/10 bg-white/[0.04] hover:border-teal-400"
                        : "border-emerald-900/10 bg-white hover:border-teal-500"
                    }`}
                  >
                    Save Draft
                  </button>

                  {currentStep < STEPS.length ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="rounded-xl bg-gradient-to-r from-teal-300 via-emerald-300 to-teal-500 px-6 py-3 text-sm font-black text-[#03110e] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(45,212,191,0.25)]"
                    >
                      Save & Continue →
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmitApplication}
                      className="rounded-xl bg-gradient-to-r from-teal-300 via-emerald-300 to-teal-500 px-6 py-3 text-sm font-black text-[#03110e] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(45,212,191,0.25)]"
                    >
                      Submit for Admin Review
                    </button>
                  )}
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

function TermsStep({
  formData,
  handleInputChange,
  cardTheme,
  mutedText,
  isDark,
}) {
  return (
    <div>
      <StepHeading
        eyebrow="Step 01"
        title="Instructor Terms & Earnings"
        description="Review the teaching rules, payment terms, privacy conditions, and content requirements before continuing."
      />

      <div className="mt-7 grid gap-5 xl:grid-cols-2">
        <InfoCard
          title="Instructor Responsibilities"
          cardTheme={cardTheme}
          items={[
            "All submitted courses must be original and owned by the instructor.",
            "Copyrighted or misleading content is not allowed.",
            "Course lessons must meet Skillora quality standards.",
            "Admin may review, request changes, reject, or suspend course content.",
            "The instructor must provide accurate professional information.",
          ]}
        />

        <InfoCard
          title="Earnings & Payout"
          cardTheme={cardTheme}
          items={[
            "Instructor revenue share: 70% of eligible course revenue.",
            "Skillora platform fee: 30%.",
            "Minimum payout amount: ৳1,000.",
            "Payout cycle: Monthly.",
            "Refunds and chargebacks may be deducted from instructor earnings.",
          ]}
        />

        <InfoCard
          title="Privacy & Verification"
          cardTheme={cardTheme}
          items={[
            "Your CV and verification details are reviewed only for instructor approval.",
            "Sensitive documents will not appear publicly on your profile.",
            "Skillora may contact you if additional verification is required.",
            "False or unverifiable information may cause rejection.",
          ]}
        />

        <InfoCard
          title="Course Approval"
          cardTheme={cardTheme}
          items={[
            "Instructor approval and course approval are separate processes.",
            "Approval as an instructor does not automatically publish a course.",
            "Each course must be submitted for admin review.",
            "Approved courses can be published and sold on Skillora.",
          ]}
        />
      </div>

      <label
        className={`mt-7 flex cursor-pointer items-start gap-4 rounded-2xl border p-5 transition ${
          formData.acceptedPolicies
            ? "border-teal-400/40 bg-teal-400/10"
            : cardTheme
        }`}
      >
        <input
          type="checkbox"
          name="acceptedPolicies"
          checked={formData.acceptedPolicies}
          onChange={handleInputChange}
          className="mt-1 h-5 w-5 shrink-0 accent-teal-400"
        />

        <span>
          <span className="block font-black">
            I agree to all Skillora Instructor policies
          </span>

          <span
            className={`mt-2 block text-sm leading-6 ${mutedText}`}
          >
            By checking this box, I confirm that I have read
            and accepted the Instructor Terms, Privacy Policy,
            Content Policy, Revenue Share, Payout, and Refund
            conditions.
          </span>
        </span>
      </label>

      <p
        className={`mt-3 text-xs leading-5 ${
          isDark ? "text-slate-500" : "text-slate-500"
        }`}
      >
        You must accept this single agreement before continuing.
      </p>
    </div>
  );
}

function TeachingProfileStep({
  formData,
  handleInputChange,
  toggleArrayItem,
  inputTheme,
  cardTheme,
  mutedText,
}) {
  return (
    <div>
      <StepHeading
        eyebrow="Step 02"
        title="Teaching Profile"
        description="Tell the admin team about your professional background, expertise, teaching language, and course categories."
      />

      <div className="mt-7 grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <InputField
            label="Professional Headline"
            name="professionalHeadline"
            value={formData.professionalHeadline}
            onChange={handleInputChange}
            inputTheme={inputTheme}
            placeholder="Example: UI/UX Designer and Figma Instructor"
            required
          />
        </div>

        <div className="md:col-span-2">
          <TextareaField
            label="Professional Bio"
            name="professionalBio"
            value={formData.professionalBio}
            onChange={handleInputChange}
            inputTheme={inputTheme}
            placeholder="Describe your professional background, expertise, and relevant teaching experience."
            required
          />
        </div>

        <InputField
          label="Years of Experience"
          name="yearsOfExperience"
          type="number"
          min="0"
          value={formData.yearsOfExperience}
          onChange={handleInputChange}
          inputTheme={inputTheme}
          required
        />

        <InputField
          label="Current Occupation"
          name="currentOccupation"
          value={formData.currentOccupation}
          onChange={handleInputChange}
          inputTheme={inputTheme}
          placeholder="Example: Product Designer"
          required
        />

        <InputField
          label="Company or Workplace"
          name="workplace"
          value={formData.workplace}
          onChange={handleInputChange}
          inputTheme={inputTheme}
          placeholder="Optional"
        />

        <InputField
          label="Skills and Expertise"
          name="skills"
          value={formData.skills}
          onChange={handleInputChange}
          inputTheme={inputTheme}
          placeholder="Figma, Branding, React, Marketing"
          required
        />
      </div>

      <SelectionSection
        title="Teaching Languages"
        description="You may select one or both languages."
        items={LANGUAGES}
        selectedItems={formData.languages}
        onToggle={(value) =>
          toggleArrayItem("languages", value)
        }
        cardTheme={cardTheme}
        className="mt-8"
      />

      <SelectionSection
        title="Course Categories"
        description="Select every category in which you may create courses."
        items={COURSE_CATEGORIES}
        selectedItems={formData.categories}
        onToggle={(value) =>
          toggleArrayItem("categories", value)
        }
        cardTheme={cardTheme}
        className="mt-8"
      />

      <p className={`mt-3 text-xs ${mutedText}`}>
        Selected categories:{" "}
        <span className="font-black text-teal-400">
          {formData.categories.length}
        </span>
      </p>
    </div>
  );
}

function VerificationStep({
  formData,
  handleInputChange,
  handleCvUpload,
  cvFile,
  inputTheme,
  cardTheme,
  mutedText,
  isDark,
}) {
  return (
    <div>
      <StepHeading
        eyebrow="Step 03"
        title="Professional Verification"
        description="Upload your CV and add professional links that help the admin team verify your experience."
      />

      <div className="mt-7">
        <p className="mb-2 text-sm font-black">
          CV or Resume PDF
          <span className="ml-1 text-red-400">*</span>
        </p>

        <label
          className={`flex cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed px-5 py-10 text-center transition hover:border-teal-400 ${
            formData.cvFileName
              ? "border-teal-400/50 bg-teal-400/10"
              : cardTheme
          }`}
        >
          <input
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleCvUpload}
            className="hidden"
          />

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-400/15 text-2xl">
            📄
          </div>

          <p className="mt-4 font-black">
            {formData.cvFileName
              ? formData.cvFileName
              : "Choose your CV or resume"}
          </p>

          <p className={`mt-2 text-sm ${mutedText}`}>
            PDF only · Maximum 5 MB
          </p>

          {cvFile && (
            <p className="mt-2 text-xs font-bold text-teal-400">
              File ready for upload
            </p>
          )}
        </label>

        <p className={`mt-3 text-xs leading-5 ${mutedText}`}>
          During frontend development, the selected filename is
          saved locally. The actual PDF will be uploaded through
          the backend API later.
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <InputField
          label="Portfolio Website"
          name="portfolioLink"
          type="url"
          value={formData.portfolioLink}
          onChange={handleInputChange}
          inputTheme={inputTheme}
          placeholder="https://yourportfolio.com"
        />

        <InputField
          label="LinkedIn Profile"
          name="linkedinLink"
          type="url"
          value={formData.linkedinLink}
          onChange={handleInputChange}
          inputTheme={inputTheme}
          placeholder="https://linkedin.com/in/..."
        />

        <InputField
          label="Behance Profile"
          name="behanceLink"
          type="url"
          value={formData.behanceLink}
          onChange={handleInputChange}
          inputTheme={inputTheme}
          placeholder="https://behance.net/..."
        />

        <InputField
          label="GitHub Profile"
          name="githubLink"
          type="url"
          value={formData.githubLink}
          onChange={handleInputChange}
          inputTheme={inputTheme}
          placeholder="https://github.com/..."
        />

        <InputField
          label="Personal Website"
          name="websiteLink"
          type="url"
          value={formData.websiteLink}
          onChange={handleInputChange}
          inputTheme={inputTheme}
          placeholder="https://..."
        />

        <InputField
          label="Certificate or Proof Link"
          name="certificateLink"
          type="url"
          value={formData.certificateLink}
          onChange={handleInputChange}
          inputTheme={inputTheme}
          placeholder="Google Drive or certificate URL"
        />
      </div>

      <div
        className={`mt-6 rounded-2xl border p-4 text-sm leading-6 ${cardTheme} ${mutedText}`}
      >
        At least one portfolio, LinkedIn, Behance, GitHub, or
        professional website link is required for verification.
      </div>
    </div>
  );
}

function IntroductionStep({
  formData,
  handleInputChange,
  inputTheme,
  cardTheme,
  mutedText,
}) {
  return (
    <div>
      <StepHeading
        eyebrow="Step 04"
        title="Introduction & Course Plan"
        description="Introduce yourself as an instructor and describe the first type of course you plan to create."
      />

      <div
        className={`mt-7 rounded-2xl border p-5 ${cardTheme}`}
      >
        <p className="font-black">
          About the introduction video
        </p>

        <p className={`mt-2 text-sm leading-6 ${mutedText}`}>
          This is not your course video. Record a 60–120 second
          introduction about who you are, your experience, what
          you want to teach, and why learners should trust your
          instruction. You may use an unlisted YouTube video.
        </p>
      </div>

      <div className="mt-7 grid gap-5">
        <InputField
          label="Instructor Introduction Video URL"
          name="introductionVideoUrl"
          type="url"
          value={formData.introductionVideoUrl}
          onChange={handleInputChange}
          inputTheme={inputTheme}
          placeholder="https://youtube.com/..."
          required
        />

        <TextareaField
          label="Why do you want to teach on Skillora?"
          name="teachingReason"
          value={formData.teachingReason}
          onChange={handleInputChange}
          inputTheme={inputTheme}
          placeholder="Explain your motivation and the value you want to provide."
          required
        />

        <InputField
          label="Sample Course Title"
          name="sampleCourseTitle"
          value={formData.sampleCourseTitle}
          onChange={handleInputChange}
          inputTheme={inputTheme}
          placeholder="Example: Complete Figma UI Design for Beginners"
          required
        />

        <TextareaField
          label="Planned Course Description"
          name="plannedCourseDescription"
          value={formData.plannedCourseDescription}
          onChange={handleInputChange}
          inputTheme={inputTheme}
          placeholder="Describe the course topics, projects, and learning outcomes."
          required
        />

        <TextareaField
          label="Target Learners"
          name="targetLearners"
          value={formData.targetLearners}
          onChange={handleInputChange}
          inputTheme={inputTheme}
          placeholder="Who should take this course?"
          required
        />

        <SelectField
          label="Expected Course Level"
          name="courseLevel"
          value={formData.courseLevel}
          onChange={handleInputChange}
          inputTheme={inputTheme}
          options={COURSE_LEVELS}
          required
        />

        <TextareaField
          label="Teaching Approach"
          name="teachingApproach"
          value={formData.teachingApproach}
          onChange={handleInputChange}
          inputTheme={inputTheme}
          placeholder="Explain how you will teach, demonstrate projects, and support learners."
          required
        />
      </div>
    </div>
  );
}

function ReviewStep({
  formData,
  userName,
  userEmail,
  cardTheme,
  mutedText,
}) {
  const reviewGroups = [
    {
      title: "Account",
      rows: [
        ["Name", userName],
        ["Email", userEmail],
      ],
    },
    {
      title: "Teaching Profile",
      rows: [
        [
          "Headline",
          formData.professionalHeadline || "Not provided",
        ],
        [
          "Experience",
          formData.yearsOfExperience
            ? `${formData.yearsOfExperience} year(s)`
            : "Not provided",
        ],
        [
          "Occupation",
          formData.currentOccupation || "Not provided",
        ],
        [
          "Workplace",
          formData.workplace || "Not provided",
        ],
        ["Skills", formData.skills || "Not provided"],
        [
          "Languages",
          formData.languages.join(", ") || "Not selected",
        ],
        [
          "Categories",
          formData.categories.join(", ") || "Not selected",
        ],
      ],
    },
    {
      title: "Verification",
      rows: [
        [
          "CV / Resume",
          formData.cvFileName || "Not uploaded",
        ],
        [
          "Portfolio",
          formData.portfolioLink || "Not provided",
        ],
        [
          "LinkedIn",
          formData.linkedinLink || "Not provided",
        ],
        [
          "Behance",
          formData.behanceLink || "Not provided",
        ],
        [
          "GitHub",
          formData.githubLink || "Not provided",
        ],
      ],
    },
    {
      title: "Teaching Plan",
      rows: [
        [
          "Introduction video",
          formData.introductionVideoUrl || "Not provided",
        ],
        [
          "Sample course",
          formData.sampleCourseTitle || "Not provided",
        ],
        [
          "Course level",
          formData.courseLevel || "Not selected",
        ],
        [
          "Target learners",
          formData.targetLearners || "Not provided",
        ],
      ],
    },
  ];

  return (
    <div>
      <StepHeading
        eyebrow="Step 05"
        title="Review & Submit"
        description="Review your information carefully before submitting the application for admin approval."
      />

      <div className="mt-7 space-y-5">
        {reviewGroups.map((group) => (
          <section
            key={group.title}
            className={`rounded-2xl border p-5 ${cardTheme}`}
          >
            <h3 className="font-black text-teal-400">
              {group.title}
            </h3>

            <div className="mt-4 divide-y divide-white/[0.07]">
              {group.rows.map(([label, value]) => (
                <div
                  key={label}
                  className="grid gap-2 py-3 sm:grid-cols-[160px_1fr]"
                >
                  <span
                    className={`text-sm font-bold ${mutedText}`}
                  >
                    {label}
                  </span>

                  <span className="break-words text-sm font-semibold">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </section>
        ))}

        <div className="rounded-2xl border border-teal-400/25 bg-teal-400/10 p-5">
          <p className="font-black text-teal-400">
            Ready for admin review
          </p>

          <p className={`mt-2 text-sm leading-6 ${mutedText}`}>
            After submission, you will not receive Instructor
            Dashboard access immediately. The admin team will
            verify your information first.
          </p>
        </div>
      </div>
    </div>
  );
}

function StepHeading({ eyebrow, title, description }) {
  return (
    <div>
      <p className="text-xs font-black uppercase tracking-[0.2em] text-teal-400">
        {eyebrow}
      </p>

      <h2 className="mt-2 text-2xl font-black tracking-[-0.025em] sm:text-3xl">
        {title}
      </h2>

      <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400 sm:text-base">
        {description}
      </p>
    </div>
  );
}

function InfoCard({ title, items, cardTheme }) {
  return (
    <section
      className={`rounded-2xl border p-5 ${cardTheme}`}
    >
      <h3 className="font-black">{title}</h3>

      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-sm leading-6 text-slate-400"
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function SelectionSection({
  title,
  description,
  items,
  selectedItems,
  onToggle,
  cardTheme,
  className = "",
}) {
  return (
    <section className={className}>
      <h3 className="font-black">{title}</h3>

      <p className="mt-1 text-sm text-slate-400">
        {description}
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        {items.map((item) => {
          const selected = selectedItems.includes(item);

          return (
            <button
              key={item}
              type="button"
              onClick={() => onToggle(item)}
              className={`rounded-xl border px-4 py-2.5 text-sm font-bold transition-all duration-300 ${
                selected
                  ? "border-teal-400 bg-teal-400 text-[#03110e]"
                  : cardTheme
              }`}
            >
              {selected ? "✓ " : ""}
              {item}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  inputTheme,
  placeholder = "",
  required = false,
  min,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-black">
        {label}
        {required && (
          <span className="ml-1 text-red-400">*</span>
        )}
      </span>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${inputTheme}`}
      />
    </label>
  );
}

function TextareaField({
  label,
  name,
  value,
  onChange,
  inputTheme,
  placeholder = "",
  required = false,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-black">
        {label}
        {required && (
          <span className="ml-1 text-red-400">*</span>
        )}
      </span>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={5}
        className={`w-full resize-y rounded-xl border px-4 py-3 text-sm leading-6 outline-none transition ${inputTheme}`}
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  inputTheme,
  options,
  required = false,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-black">
        {label}
        {required && (
          <span className="ml-1 text-red-400">*</span>
        )}
      </span>

      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${inputTheme}`}
      >
        <option value="">Select an option</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function StatusScreen({
  pageTheme,
  panelTheme,
  mutedText,
  icon,
  iconClass,
  label,
  labelClass,
  title,
  description,
  details,
  buttonText,
  onButtonClick,
}) {
  return (
    <main
      className={`min-h-screen px-5 py-16 sm:px-6 ${pageTheme}`}
    >
      <div className="mx-auto max-w-3xl">
        <section
          className={`rounded-[30px] border p-6 text-center backdrop-blur-2xl sm:p-10 ${panelTheme}`}
        >
          <div
            className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl text-3xl font-black ${iconClass}`}
          >
            {icon}
          </div>

          <p
            className={`mt-6 text-xs font-black uppercase tracking-[0.2em] ${labelClass}`}
          >
            {label}
          </p>

          <h1 className="mt-3 text-3xl font-black sm:text-4xl">
            {title}
          </h1>

          <p
            className={`mx-auto mt-4 max-w-xl leading-7 ${mutedText}`}
          >
            {description}
          </p>

          <div className="mx-auto mt-7 max-w-lg rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-left">
            {details.map((detail, index) => (
              <div
                key={detail.label}
                className={`flex items-center justify-between gap-4 py-3 ${
                  index !== details.length - 1
                    ? "border-b border-white/[0.07]"
                    : ""
                }`}
              >
                <span className={mutedText}>
                  {detail.label}
                </span>

                <span className="text-right text-sm font-black">
                  {detail.value}
                </span>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={onButtonClick}
            className="mt-8 rounded-2xl bg-gradient-to-r from-teal-300 via-emerald-300 to-teal-500 px-7 py-3.5 font-black text-[#03110e] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(45,212,191,0.28)]"
          >
            {buttonText}
          </button>
        </section>
      </div>
    </main>
  );
}

export default BecomeInstructor;