// src/App.jsx
import { Router, Route } from "@solidjs/router";
import LoginPage from "./pages/login/loginPage.jsx";
import DashboardPage from "./pages/dashboard/dashboardPage.jsx";
import MenuPage from "./pages/menu/menuPage.jsx";
import KelompokPage from "./pages/kelompok/kelompokPage.jsx";
import KomponenPage from "./pages/komponen/KomponenPage.jsx";
import DashboardAdminPage from "./pages/admin/DashboardAdminPage.jsx"; // Tambah import

export default function App() {
  return (
    <Router>
      <Route path="/login" component={LoginPage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/menu/:courseCode" component={MenuPage} />
      <Route path="/kelompok/:courseId" component={KelompokPage} />
      <Route path="/komponen" component={KomponenPage} />
      
      {/* Route Admin */}
      <Route path="/admin/dashboard" component={DashboardAdminPage} />
      <Route path="/admin/course/:courseCode" component={MenuPage} /> {/* Optional */}
    </Router>
  );
}