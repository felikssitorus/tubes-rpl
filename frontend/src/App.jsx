import { Router, Route } from "@solidjs/router";

// import EmployeePage from "./pages/employees/EmployeePage.jsx";
// import KomponenPage from "./pages/komponen/KomponenPage.jsx";
import LoginPage from "./pages/login/loginPage.jsx";
import DashboardPage from "./pages/dashboard/dashboardPage.jsx";

export default function App() {
  return (
    <Router>
      <Route path="/login" component={LoginPage} />
      <Route path="/dashboard" component={DashboardPage} />
    </Router>
  );
}
