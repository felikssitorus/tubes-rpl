import { Router, Route } from "@solidjs/router";

import EmployeePage from "./pages/employees/EmployeePage";
import KomponenPage from "./pages/komponen/KomponenPage";

export default function App() {
  return (
    <Router>
      <Route path="/" component={EmployeePage} />
      <Route path="/komponen" component={KomponenPage} />
    </Router>

    
  );
}
