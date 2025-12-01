import { createResource, createSignal } from "solid-js";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from "../../services/EmployeeService";

import EmployeeList from "../../components/EmployeeList";
import EmployeeForm from "../../components/EmployeeForm";

export default function EmployeePage() {
  const [employees, { refetch }] = createResource(getEmployees);

  const [selected, setSelected] = createSignal(null);

  const handleSave = async (data) => {
    if (selected()) {
      await updateEmployee(selected().id, data);
    } else {
      await createEmployee(data);
    }
    setSelected(null);
    refetch();
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    refetch();
  };

  return (
    <div>
      <h1>Employees</h1>

      <EmployeeForm employee={selected()} onSaved={refetch} />

      {employees.loading && <p>Loading...</p>}

      {employees() && (
        <EmployeeList
          employees={employees()}
          onEdit={setSelected}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
