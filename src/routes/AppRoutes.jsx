import { Routes, Route } from "react-router-dom";
import CentralInitiator from "../pages/dashboard/CentralInitiator";
import CreateCase from "../pages/dashboard/CreateCase";
import CaseDetail from "../pages/dashboard/CaseDetail";
import CustomerPortal from "../pages/dashboard/CustomerPortal";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CentralInitiator />} />
      <Route path="/customer" element={<CustomerPortal />} />
      <Route path="/create-case" element={<CreateCase />} />
      <Route path="/case/:id" element={<CaseDetail />} />
    </Routes>
  );
}