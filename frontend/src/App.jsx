import { Router, Routes, Route } from "@solidjs/router";

import EmployeePage from "./pages/employees/EmployeePage";
import KomponenPage from "./pages/komponen/KomponenPage";
import LoginPage from "./components/mahasiswa/login/LoginPage";
import Dashboard from "./components/mahasiswa/dashboard/Dashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" component={LoginPage} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/employees" component={EmployeePage} />
        <Route path="/komponen" component={KomponenPage} />
      </Routes>
    </Router>
  );
}
