// src/App.jsx
import { Router, Route } from "@solidjs/router";
import DashboardAdminPage from "./pages/admin/DashboardAdminPage";

function Header() {
  return (
    <header class="bg-[#071755] text-white p-4 shadow">
      <div class="container mx-auto flex justify-between items-center">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-white rounded flex items-center justify-center">
            <span class="text-[#071755] font-bold">T</span>
          </div>
          <h1 class="text-xl font-bold">TUBESKU</h1>
          <span class="text-sm bg-white/20 px-2 py-1 rounded">Admin</span>
        </div>
        <div class="flex items-center gap-4">
          <span class="hidden md:block">admin@unpar.ac.id</span>
          <button class="bg-white text-[#071755] px-4 py-2 rounded font-medium">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

function App() {
  return (
    <Router>
      <Route path="/" component={() => (
        <div>
          <Header />
          <DashboardAdminPage />
        </div>
      )} />
      <Route path="/admin" component={() => (
        <div>
          <Header />
          <DashboardAdminPage />
        </div>
      )} />
    </Router>
  );
}

export default App;