import { Router, Route } from "@solidjs/router";

import EmployeePage from "./pages/employees/EmployeePage";

export default function App() {
  return (
    <Router>
      <Route path="/" component={EmployeePage} />
    </Router>
  );
}
