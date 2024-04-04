const navList = [
  {
    _id: 1,
    name: "Dashboard",
    icon: "bi bi-grid",
    href: "/staff/hr",
  },
  {
    _id: 2,
    name: "Employee",
    icon: "bi bi-people-fill",
    href: "/staff/hr/employee",
  },
  {
    _id: 3,
    name: "Salary",
    icon: "bi bi-cash",
    href: "/staff/hr/salary",
  },
  {
    _id: 4,
    name: "Leaves",
    icon: "bi bi-layout-text-window-reverse",
    href: "/staff/hr/leaves",
  },
  {
    _id: 5,
    name: "Attendance",
    icon: "bi bi-card-checklist",
    href: "/staff/hr/attendance",
  },
  {
    _id: 6,
    name: "Configurations",
    icon: "bi bi-person-gear",
    href: "/staff/hr/configs",
  },
  {
    _id: 7,
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
