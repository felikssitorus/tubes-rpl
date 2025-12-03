import { Router, Route } from "@solidjs/router";

import EmployeePage from "./pages/employees/EmployeePage.jsx";
import KomponenPage from "./pages/komponen/KomponenPage.jsx";
import LoginPage from "./pages/login/loginPage.jsx"; 

export default function App() {
  return (
    <Router>
      <Route path="/login" component={LoginPage} />
      <Route path="/" component={EmployeePage} />
      <Route path="/komponen" component={KomponenPage} />
    </Router>
  );
}
