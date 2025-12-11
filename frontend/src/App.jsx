import { Router, Route } from "@solidjs/router";
import LoginPage from "./pages/login/loginPage.jsx";
import DashboardPage from "./pages/dashboard/dashboardPage.jsx";
import MenuPage from "./pages/menu/menuPage.jsx";
import KelompokPage from "./pages/kelompok/kelompokPage.jsx";
import NilaiPage from "./pages/nilai/nilaiPage.jsx";
export default function App() {
  return (
    <Router>
      <Route path="/login" component={LoginPage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/menu/:courseCode" component={MenuPage} />
      <Route path="/kelompok/:courseId" component={KelompokPage} />
      <Route path="/nilai/:npm" component={NilaiPage} />    
  </Router>
  );
}
