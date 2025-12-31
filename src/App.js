import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "./contextApi/AuthContext";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./views/Dashboard";
import Login from "./auth/Login";
import Services from "./views/Services";
import Settings from "./views/Settings";
import FAQ from "./views/Faq";

function App() {
  return (
    <UserContext>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
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
