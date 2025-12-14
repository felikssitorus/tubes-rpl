import { Router, Route } from "@solidjs/router";

// Pages Mahasiswa
import LoginPage from "./pages/login/loginPage.jsx";
import DashboardPage from "./pages/dashboard/dashboardPage.jsx";
import MenuPage from "./pages/menu/menuPage.jsx";
import KelompokPage from "./pages/kelompok/kelompokPage.jsx";
import NilaiPage from "./pages/nilai/nilaiPage.jsx";

// Pages Dosen
import MatkulListPage from "./pages/matkul/MatkulListPage";
import TubesListPage from "./pages/tubes/tubesPage";
import TubesMenuPage from "./pages/menuDosen/menuDosenPage";
import KomponenPage from "./pages/komponen/KomponenPage";
import KelolaKelompokDosenPage from "./pages/kelolaKelompokDosen/KelolaKelompokDosenPage";
import DosenAssignPage from "./pages/assign/AssignPage";

export default function App() {
  return (
    <Router>
      {/* Login & Dashboard */}
      <Route path="/" component={LoginPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/dashboard" component={DashboardPage} />

      {/* Routes Mahasiswa */}
      <Route path="/menu/:courseCode" component={MenuPage} />
      <Route path="/kelompok/:courseId" component={KelompokPage} />
      <Route path="/nilai/:npm/:idMk" component={NilaiPage} />

      {/* Routes Dosen */}
      <Route path="/dosen/matkul" component={MatkulListPage} />
      <Route path="/dosen/matkul/:id_mk_dibuka/tubes" component={TubesListPage} />
      <Route path="/dosen/tubes/:id_tubes/menu" component={TubesMenuPage} />
      <Route path="/dosen/tubes/:id_tubes/komponen" component={KomponenPage} />
      <Route path="/dosen/tubes/:id_tubes/kelompok" component={KelolaKelompokDosenPage} />
      <Route path="/dosen/kelompok/:id_tubes/assign" component={DosenAssignPage} />
    </Router>
  );
}