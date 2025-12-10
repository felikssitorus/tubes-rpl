import { Router, Route } from "@solidjs/router";
import LoginPage from "./pages/login/loginPage.jsx";
import DashboardPage from "./pages/dashboard/dashboardPage.jsx";
import MenuPage from "./pages/menu/menuPage.jsx";
import KelompokPage from "./pages/kelompok/kelompokPage.jsx";
import KomponenPage from "./pages/komponen/KomponenPage.jsx";
import RubrikPage from "./pages/rubrik/rubrikPage.jsx";

export default function App() {
  return (
    <Router>
      <Route path="/login" component={LoginPage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/menu/:courseCode" component={MenuPage} />
      <Route path="/kelompok/:courseId" component={KelompokPage} />
      <Route path="/komponen" component={KomponenPage} />
      <Route path="/rubrik" component={RubrikPage} />
    </Router>
  );
}
