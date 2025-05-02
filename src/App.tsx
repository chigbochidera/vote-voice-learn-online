
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import { AuthProvider } from "@/contexts/auth-context";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProtectedRoute from "@/components/common/ProtectedRoute";

// Pages
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";
import VerifyEmail from "@/pages/auth/VerifyEmail";

// User Pages
import UserDashboard from "@/pages/user/Dashboard";
import MyCourses from "@/pages/user/MyCourses";
import CourseDetails from "@/pages/courses/CourseDetails";
import Profile from "@/pages/user/Profile";
import Certificate from "@/pages/user/Certificate";

// Admin Pages
import AdminDashboard from "@/pages/admin/Dashboard";
import ManageCourses from "@/pages/admin/ManageCourses";
import ManageUsers from "@/pages/admin/ManageUsers";
import CreateCourse from "@/pages/admin/CreateCourse";
import EditCourse from "@/pages/admin/EditCourse";
import ManageChapters from "@/pages/admin/ManageChapters";

// Create the query client outside of the component
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow pt-16">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/verify-email" element={<VerifyEmail />} />
                  
                  {/* User routes */}
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute>
                        <UserDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/my-courses" 
                    element={
                      <ProtectedRoute>
                        <MyCourses />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/courses/:courseId" 
                    element={
                      <ProtectedRoute>
                        <CourseDetails />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/profile" 
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/certificate/:courseId" 
                    element={
                      <ProtectedRoute>
                        <Certificate />
                      </ProtectedRoute>
                    } 
                  />
                  
                  {/* Admin routes */}
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute allowedRoles={["admin"]}>
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/courses"
                    element={
                      <ProtectedRoute allowedRoles={["admin"]}>
                        <ManageCourses />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/users"
                    element={
                      <ProtectedRoute allowedRoles={["admin"]}>
                        <ManageUsers />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/courses/create"
                    element={
                      <ProtectedRoute allowedRoles={["admin"]}>
                        <CreateCourse />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/courses/:courseId/edit"
                    element={
                      <ProtectedRoute allowedRoles={["admin"]}>
                        <EditCourse />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/courses/:courseId/chapters"
                    element={
                      <ProtectedRoute allowedRoles={["admin"]}>
                        <ManageChapters />
                      </ProtectedRoute>
                    }
                  />
                  
                  {/* Catch-all route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
