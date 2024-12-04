// Navigate between pages
function navigateTo(page) {
  const content = document.getElementById("content");
  if (page === "registration") {
    content.innerHTML = `
      <h2>Employee Registration</h2>
      <form id="employee-form" onsubmit="registerEmployee(event)">
        <input type="text" id="name" placeholder="Name" required>
        <input type="text" id="position" placeholder="Position" required>
        <textarea id="about" placeholder="About" required></textarea>
        <input type="date" id="joining_date" required>
        <button type="submit">Register Employee</button>
      </form>
    `;
  } else if (page === "listing") {
    loadEmployeeList();
  }
}

// Register employee
function registerEmployee(event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const position = document.getElementById("position").value;
  const about = document.getElementById("about").value;
  const joining_date = document.getElementById("joining_date").value;

  const employee = { name, position, about, joining_date };
  const employees = JSON.parse(localStorage.getItem("employees")) || [];
  employees.push(employee);
  localStorage.setItem("employees", JSON.stringify(employees));

  alert("Employee registered!");
  navigateTo("listing");
}

// Load employee list
function loadEmployeeList() {
  const employees = JSON.parse(localStorage.getItem("employees")) || [];
  const content = document.getElementById("content");
  const rows = employees
    .map(
      (employee, index) => `
      <tr>
        <td>${employee.name}</td>
        <td>${employee.position}</td>
        <td>${employee.about}</td>
        <td>${employee.joining_date}</td>
        <td><button onclick="deleteEmployee(${index})">Delete</button></td>
      </tr>
    `
    )
    .join("");
  content.innerHTML = `
    <h2>Employee Listing</h2>
    <table border="1">
      <thead>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>About</th>
          <th>Joining Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
}

// Delete employee
function deleteEmployee(index) {
  const employees = JSON.parse(localStorage.getItem("employees")) || [];
  employees.splice(index, 1);
  localStorage.setItem("employees", JSON.stringify(employees));
  loadEmployeeList();
}

// Search employee
function searchEmployee() {
  const query = document.getElementById("search-bar").value.toLowerCase();
  const employees = JSON.parse(localStorage.getItem("employees")) || [];
  const filtered = employees.filter((emp) =>
    emp.name.toLowerCase().includes(query)
  );
  const rows = filtered
    .map(
      (employee, index) => `
      <tr>
        <td>${employee.name}</td>
        <td>${employee.position}</td>
        <td>${employee.about}</td>
        <td>${employee.joining_date}</td>
        <td><button onclick="deleteEmployee(${index})">Delete</button></td>
      </tr>
    `
    )
    .join("");
  const tbody = document.querySelector("tbody");
  if (tbody) tbody.innerHTML = rows;
}

function toggleMenu() {
  const menu = document.querySelector(".menu");
  menu.classList.toggle("hidden");
}
