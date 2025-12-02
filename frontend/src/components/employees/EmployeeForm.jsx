import { createSignal, createEffect } from "solid-js";

const API_URL = "http://localhost:5000/employees";

export default function EmployeeForm(props) {
  const [name, setName] = createSignal("");
  const [position, setPosition] = createSignal("");

  // isi form ketika klik Edit
  createEffect(() => {
    if (props.employee) {
      setName(props.employee.name);
      setPosition(props.employee.position);
    }
  });

  const saveEmployee = async (e) => {
    e.preventDefault();

    const payload = {
      name: name(),
      position: position(),
    };

    if (props.employee) {
      // UPDATE
      await fetch(`${API_URL}/${props.employee.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      // CREATE
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    setName("");
    setPosition("");
    props.onSaved();
  };

  return (
    <form onSubmit={saveEmployee}>
      <h3>{props.employee ? "Edit Employee" : "Add Employee"}</h3>

      <input
        placeholder="Name"
        value={name()}
        onInput={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Position"
        value={position()}
        onInput={(e) => setPosition(e.target.value)}
      />

      <button type="submit">
        {props.employee ? "Update" : "Create"}
      </button>
    </form>
  );
}
