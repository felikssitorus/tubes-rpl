import { Router, Route } from "@solidjs/router";
import LoginPage from "./components/mahasiswa/login/LoginPage";
import Dashboard from "./components/mahasiswa/dashboard/Dashboard";
import KelompokPage from "./components/mahasiswa/kelompok/KelompokPage";
import NilaiPage from "./components/mahasiswa/nilai/NilaiPage";

export default function App() {
  return (
    <Router>
      <Route path="/" component={LoginPage} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/kelompok" component={KelompokPage} />
      <Route path="/nilai" component={NilaiPage} />
    </Router>
  );
}
