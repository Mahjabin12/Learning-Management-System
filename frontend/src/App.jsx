import { Route, Routes, useLocation } from "react-router-dom";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ProtectedRoute from "./components/common/ProtectedRoute";

import AdminLayout from "./components/admin/AdminLayout";

import Home from "./pages/public/Home";
import Courses from "./pages/public/Courses";
import CourseDetails from "./pages/public/CourseDetails";
import Login from "./pages/public/Login";
import Signup from "./pages/public/Signup";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";

import MyLearning from "./pages/student/MyLearning";
import Learning from "./pages/student/Learning";
import Profile from "./pages/student/Profile";
import Cart from "./pages/student/Cart";
import Checkout from "./pages/student/Checkout";
import OrderComplete from "./pages/student/OrderComplete";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCourses from "./pages/admin/AdminCourses";
import AddCourse from "./pages/admin/AddCourse";
import EditCourse from "./pages/admin/EditCourse";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminEnrollments from "./pages/admin/AdminEnrollments";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminAnnouncements from "./pages/admin/AdminAnnouncements";
import AdminRevenue from "./pages/admin/AdminRevenue";
import AdminSettings from "./pages/admin/AdminSettings";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-white text-slate-950">
      {!isAdminRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route
          path="/my-learning"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <MyLearning />
            </ProtectedRoute>
          }
        />

        <Route
          path="/learn/:courseId"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <Learning />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/order-complete"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <OrderComplete />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="courses/create" element={<AddCourse />} />
          <Route path="courses/edit/:id" element={<EditCourse />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="enrollments" element={<AdminEnrollments />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="announcements" element={<AdminAnnouncements />} />
          <Route path="revenue" element={<AdminRevenue />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;