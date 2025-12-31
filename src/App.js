import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../src/auth/Home";
import SignUp from "./views/SignUp";
import DashboardLayout from "./layouts/DashboardLayout";
import Services from "./views/Services";
import Settings from "./views/Settings";
import FAQ from "./views/Faq";
import { UserContext } from "./contextApi/AuthContext";
import Dashboard from "./views/Dashboard";
import Login from "./auth/Login";

function App() {
  return (
    <UserContext>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="services" element={<Services />} />
            <Route path="settings" element={<Settings />} />
            <Route path="faq" element={<FAQ />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext>
  );
}

export default App;
