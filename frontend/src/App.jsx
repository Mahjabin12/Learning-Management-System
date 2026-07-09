import { Routes, Route } from "react-router-dom";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ScrollToTop from "./components/common/ScrollToTop";
import ProtectedRoute from "./components/common/ProtectedRoute";

import AdminLayout from "./components/admin/AdminLayout";

import Home from "./pages/landing/Home";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyCode from "./pages/auth/VerifyCode";
import ResetPassword from "./pages/auth/ResetPassword";
import ResetSuccess from "./pages/auth/ResetSuccess";

import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";

import CourseList from "./pages/courses/CourseList";
import CourseDetails from "./pages/courses/CourseDetails";

import CategoryList from "./pages/categories/CategoryList";
import CategoryDetails from "./pages/categories/CategoryDetails";

import BlogList from "./pages/blog/BlogList";
import BlogDetails from "./pages/blog/BlogDetails";






import StudentLayout from "./components/student/StudentLayout";

import StudentDashboard from "./pages/student/Dashboard";
import MyLearning from "./pages/student/MyLearning";
import Learning from "./pages/student/Learning";
import Cart from "./pages/student/Cart";
import Checkout from "./pages/student/Checkout";
import OrderComplete from "./pages/student/OrderComplete";
import Certificates from "./pages/student/Certificates";
import Wishlist from "./pages/student/Wishlist";
import StudentNotifications from "./pages/student/Notifications";
import StudentProfile from "./pages/student/Profile";
import StudentSettings from "./pages/student/Settings";





import InstructorLayout from "./components/instructor/InstructorLayout";

import InstructorList from "./pages/instructor/InstructorList";
import InstructorDetails from "./pages/instructor/InstructorDetails";
import BecomeInstructor from "./pages/instructor/BecomeInstructor";

import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import InstructorMyCourses from "./pages/instructor/MyCourses";
import InstructorAddCourse from "./pages/instructor/AddCourse";
import InstructorEditCourse from "./pages/instructor/EditCourse";
import InstructorStudents from "./pages/instructor/Students";
import InstructorEarnings from "./pages/instructor/Earnings";
import InstructorReviews from "./pages/instructor/Reviews";
import InstructorMessages from "./pages/instructor/Messages";
import InstructorSettings from "./pages/instructor/Settings";





import AdminDashboard from "./pages/admin/AdminDashboard";

import AdminCourses from "./pages/admin/AdminCourses";
import AddCourse from "./pages/admin/AddCourse";
import EditCourse from "./pages/admin/EditCourse";

import AdminUsers from "./pages/admin/AdminUsers";
import AdminInstructors from "./pages/admin/AdminInstructors";
import AdminEnrollments from "./pages/admin/AdminEnrollments";

import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminRevenue from "./pages/admin/AdminRevenue";

import AdminMessages from "./pages/admin/AdminMessages";
import AdminNotifications from "./pages/admin/AdminNotifications";
import AdminAnnouncements from "./pages/admin/AdminAnnouncements";
import AdminActivityLogs from "./pages/admin/AdminActivityLogs";
import AdminSettings from "./pages/admin/AdminSettings";

function PublicPage({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <ScrollToTop />
    </>
  );
}

function AuthPage({ children }) {
  return (
    <>
      {children}
      <ScrollToTop />
    </>
  );
}


function StudentPage({ children }) {
  return (
    <ProtectedRoute role="student">
      <StudentLayout>{children}</StudentLayout>
    </ProtectedRoute>
  );
}


function InstructorPage({ children }) {
  return (
    <ProtectedRoute role="instructor">
      <InstructorLayout>{children}</InstructorLayout>
    </ProtectedRoute>
  );
}

function AdminPage({ children }) {
  return (
    <ProtectedRoute role="admin">
      <AdminLayout>{children}</AdminLayout>
    </ProtectedRoute>
  );
}

function NotFound() {
  return (
    <PublicPage>
      <div className="min-h-[70vh] flex items-center justify-center bg-[#061311] text-white px-6">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-teal-400">404</h1>
          <p className="mt-3 text-xl font-semibold">Page Not Found</p>
          <p className="mt-2 text-sm text-slate-400">
            This page is not ready yet.
          </p>
        </div>
      </div>
    </PublicPage>
  );
}

function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route
        path="/"
        element={
          <PublicPage>
            <Home />
          </PublicPage>
        }
      />

      <Route
        path="/about"
        element={
          <PublicPage>
            <AboutUs />
          </PublicPage>
        }
      />

      <Route
        path="/contact"
        element={
          <PublicPage>
            <Contact />
          </PublicPage>
        }
      />

      {/* Auth Pages */}
      <Route
        path="/login"
        element={
          <AuthPage>
            <Login />
          </AuthPage>
        }
      />

      <Route
        path="/signup"
        element={
          <AuthPage>
            <Signup />
          </AuthPage>
        }
      />

      <Route
        path="/forgot-password"
        element={
          <AuthPage>
            <ForgotPassword />
          </AuthPage>
        }
      />

      <Route
        path="/verify-code"
        element={
          <AuthPage>
            <VerifyCode />
          </AuthPage>
        }
      />

      <Route
        path="/reset-password"
        element={
          <AuthPage>
            <ResetPassword />
          </AuthPage>
        }
      />

      <Route
        path="/reset-success"
        element={
          <AuthPage>
            <ResetSuccess />
          </AuthPage>
        }
      />


      <Route
  path="/become-instructor"
  element={<BecomeInstructor />}
/>

      

      <Route
  path="/courses"
  element={
    <PublicPage>
      <CourseList />
    </PublicPage>
  }
/>

<Route
  path="/courses/:id"
  element={
    <PublicPage>
      <CourseDetails />
    </PublicPage>
  }
/>

<Route
  path="/categories"
  element={
    <PublicPage>
      <CategoryList />
    </PublicPage>
  }
/>

<Route
  path="/categories/:id"
  element={
    <PublicPage>
      <CategoryDetails />
    </PublicPage>
  }
/>

<Route
  path="/blogs"
  element={
    <PublicPage>
      <BlogList />
    </PublicPage>
  }
/>

<Route
  path="/blogs/:id"
  element={
    <PublicPage>
      <BlogDetails />
    </PublicPage>
  }
/>






      <Route
  path="/student/dashboard"
  element={
    <StudentPage>
      <StudentDashboard />
    </StudentPage>
  }
/>

<Route
  path="/student/my-learning"
  element={
    <StudentPage>
      <MyLearning />
    </StudentPage>
  }
/>

<Route
  path="/student/learning/:courseId"
  element={
    <StudentPage>
      <Learning />
    </StudentPage>
  }
/>

<Route
  path="/student/cart"
  element={
    <StudentPage>
      <Cart />
    </StudentPage>
  }
/>

<Route
  path="/student/checkout"
  element={
    <StudentPage>
      <Checkout />
    </StudentPage>
  }
/>

<Route
  path="/student/order-complete"
  element={
    <StudentPage>
      <OrderComplete />
    </StudentPage>
  }
/>

<Route
  path="/student/certificates"
  element={
    <StudentPage>
      <Certificates />
    </StudentPage>
  }
/>

<Route
  path="/student/wishlist"
  element={
    <StudentPage>
      <Wishlist />
    </StudentPage>
  }
/>

<Route
  path="/student/notifications"
  element={
    <StudentPage>
      <StudentNotifications />
    </StudentPage>
  }
/>

<Route
  path="/student/profile"
  element={
    <StudentPage>
      <StudentProfile />
    </StudentPage>
  }
/>

<Route
  path="/student/settings"
  element={
    <StudentPage>
      <StudentSettings />
    </StudentPage>
  }
/>










      <Route
  path="/instructors"
  element={
    <PublicPage>
      <InstructorList />
    </PublicPage>
  }
/>

<Route
  path="/instructors/:id"
  element={
    <PublicPage>
      <InstructorDetails />
    </PublicPage>
  }
/>


      <Route
  path="/instructor/dashboard"
  element={
    <InstructorPage>
      <InstructorDashboard />
    </InstructorPage>
  }
/>

<Route
  path="/instructor/my-courses"
  element={
    <InstructorPage>
      <InstructorMyCourses />
    </InstructorPage>
  }
/>

<Route
  path="/instructor/courses/add"
  element={
    <InstructorPage>
      <InstructorAddCourse />
    </InstructorPage>
  }
/>

<Route
  path="/instructor/courses/edit/:id"
  element={
    <InstructorPage>
      <InstructorEditCourse />
    </InstructorPage>
  }
/>

<Route
  path="/instructor/students"
  element={
    <InstructorPage>
      <InstructorStudents />
    </InstructorPage>
  }
/>

<Route
  path="/instructor/earnings"
  element={
    <InstructorPage>
      <InstructorEarnings />
    </InstructorPage>
  }
/>

<Route
  path="/instructor/reviews"
  element={
    <InstructorPage>
      <InstructorReviews />
    </InstructorPage>
  }
/>

<Route
  path="/instructor/messages"
  element={
    <InstructorPage>
      <InstructorMessages />
    </InstructorPage>
  }
/>

<Route
  path="/instructor/settings"
  element={
    <InstructorPage>
      <InstructorSettings />
    </InstructorPage>
  }
/>














      {/* Admin Dashboard */}
      <Route
        path="/admin"
        element={
          <AdminPage>
            <AdminDashboard />
          </AdminPage>
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          <AdminPage>
            <AdminDashboard />
          </AdminPage>
        }
      />

      <Route
        path="/admin/courses"
        element={
          <AdminPage>
            <AdminCourses />
          </AdminPage>
        }
      />

      <Route
        path="/admin/courses/add"
        element={
          <AdminPage>
            <AddCourse />
          </AdminPage>
        }
      />

      <Route
        path="/admin/courses/edit/:id"
        element={
          <AdminPage>
            <EditCourse />
          </AdminPage>
        }
      />

      <Route
        path="/admin/users"
        element={
          <AdminPage>
            <AdminUsers />
          </AdminPage>
        }
      />

      <Route
        path="/admin/instructors"
        element={
          <AdminPage>
            <AdminInstructors />
          </AdminPage>
        }
      />

      <Route
        path="/admin/enrollments"
        element={
          <AdminPage>
            <AdminEnrollments />
          </AdminPage>
        }
      />

      <Route
        path="/admin/analytics"
        element={
          <AdminPage>
            <AdminAnalytics />
          </AdminPage>
        }
      />

      <Route
        path="/admin/revenue"
        element={
          <AdminPage>
            <AdminRevenue />
          </AdminPage>
        }
      />

      <Route
        path="/admin/messages"
        element={
          <AdminPage>
            <AdminMessages />
          </AdminPage>
        }
      />

      <Route
        path="/admin/notifications"
        element={
          <AdminPage>
            <AdminNotifications />
          </AdminPage>
        }
      />

      <Route
        path="/admin/announcements"
        element={
          <AdminPage>
            <AdminAnnouncements />
          </AdminPage>
        }
      />

      <Route
        path="/admin/activity-logs"
        element={
          <AdminPage>
            <AdminActivityLogs />
          </AdminPage>
        }
      />

      <Route
        path="/admin/settings"
        element={
          <AdminPage>
            <AdminSettings />
          </AdminPage>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;