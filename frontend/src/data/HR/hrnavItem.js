const navList = [
  {
    _id: 1,
    name: "Dashboard",
    icon: "bi bi-grid",
    href: "/hr",
  },
  {
    _id: 2,
    name: "Employee",
    icon: "bi bi-people-fill",
    href: "/hr/employee",
  },
  {
    _id: 3,
    name: "Salary",
    icon: "bi bi-cash",
  },
  {
    _id: 4,
    name: "Leaves",
    icon: "bi bi-layout-text-window-reverse",
  },
  {
    _id: 5,
    name: "Attendance",
    icon: "bi bi-card-checklist",
    href: "/hr/attendance",
  },
  {
    _id: 6,
    name: "Reports",
    icon: "bi bi-clipboard2-data",
    children: [
      { _id: 21, name: "Salary", icon: "bi bi-circle" },
      { _id: 22, name: "Employee", icon: "bi bi-circle" },
      { _id: 23, name: "Attendance", icon: "bi bi-circle" },
    ],
  },
];

export default navList;
