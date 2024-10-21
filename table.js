<table>
  <thead>
    <tr>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    {employees.map(emp => (
      <tr key={emp.id}>
        <td>{emp.firstName}</td>
        <td>{emp.lastName}</td>
        <td>{emp.description}</td>
      </tr>
    ))}
  </tbody>
</table>
