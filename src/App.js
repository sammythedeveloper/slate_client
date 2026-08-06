import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Dashboard from "./pages/User/Dashboard";
import BrowseMembership from "./pages/User/BrowseMembership";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminSubscriptions from "./pages/Admin/AdminSubscription";
import RoleRoute from "./components/RoleRoute";
import AdminSettings from "./pages/Admin/AdminSettings";
import About from "./pages/User/About";
import Architecture from "./pages/DetailPage/Architecture";
import AdminGov from "./pages/DetailPage/AdminGov";
import Privacy from "./pages/DetailPage/Privacy";
import Contact from "./pages/DetailPage/Contact";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen w-full bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
          <main className="flex-grow">
            <Routes>
              <Route path="/" />
              {/* Public Routes */}
              <Route index element={<Landing />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/architecture" element={<Architecture />} />
              <Route path="/AdminGov" element={<AdminGov />} />
              <Route path="/Compliance" element={<Privacy />} />
              <Route path="/Contact" element={<Contact />} />

              {/* User Dashboard */}
              <Route
                path="/dashboard"
                element={
                  <RoleRoute requiredRole="user">
                    <Dashboard />
                  </RoleRoute>
                }
              />
              <Route
                path="/browse-memberships"
                element={
                  <RoleRoute requiredRole="user">
                    <BrowseMembership />
                  </RoleRoute>
                }
              />
              <Route
                path="/About"
                element={
                  <RoleRoute requiredRole="user">
                    <About />
                  </RoleRoute>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <RoleRoute requiredRole="admin">
                    <AdminDashboard />
                  </RoleRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <RoleRoute requiredRole="admin">
                    <AdminUsers />
                  </RoleRoute>
                }
              />
              <Route
                path="/admin/subscriptions"
                element={
                  <RoleRoute requiredRole="admin">
                    <AdminSubscriptions />
                  </RoleRoute>
                }
              />
              <Route
                path="/admin/settings"
                element={
                  <RoleRoute requiredRole="admin">
                    <AdminSettings />
                  </RoleRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}
