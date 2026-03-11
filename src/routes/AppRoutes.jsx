import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import CentralInitiator from "../pages/dashboard/CentralInitiator";
import CreateCase from "../pages/dashboard/CreateCase";
import CaseDetail from "../pages/dashboard/CaseDetail";
import CustomerPortal from "../pages/dashboard/CustomerPortal";
import NotificationPage from "../pages/dashboard/NotificationPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<CentralInitiator />} />
      <Route path="/customer" element={<CustomerPortal />} />
      <Route path="/create-case" element={<CreateCase />} />
      <Route path="/case/:id" element={<CaseDetail />} />
      <Route path="/notifications" element={<NotificationPage />} />
    </Routes>
  );
}