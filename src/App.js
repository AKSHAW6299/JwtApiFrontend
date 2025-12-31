import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./auth/Home";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import Settings from "./pages/Settings";
import Faq from "./pages/Faq";

import ProtectedRoute from "./auth/ProtectedRoute";
import RoleRoute from "./auth/RoleRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />

        {/* Protected */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />

            {/* ADMIN + SUPERADMIN */}
            <Route
              path="/services"
              element={
                <RoleRoute allowedRoles={["admin", "superadmin"]}>
                  <Services />
                </RoleRoute>
              }
            />

            {/* SUPERADMIN ONLY */}
            <Route
              path="/settings"
              element={
                <RoleRoute allowedRoles={["superadmin"]}>
                  <Settings />
                </RoleRoute>
              }
            />

            {/* ALL ROLES */}
            <Route path="/faq" element={<Faq />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
