  export default function EmployeeList(props) {
    const employees = () => props.employees || [];

    return (
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees().map((emp) => (
            <tr>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.position}</td>
              <td>
                <button onClick={() => props.onEdit(emp)}>Edit</button>
                <button onClick={() => props.onDelete(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
