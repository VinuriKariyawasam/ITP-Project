const navList = [
  {
    _id: 1,
    name: "Dashboard",
    icon: "bi bi-grid",
  },
  {
    _id: 2,
    name: "Documents",
    icon: "bi bi-menu-button-wide",
    children: [
      { _id: 21, name: "Customers", icon: "bi bi-circle" },
      { _id: 22, name: "Suppliers", icon: "bi bi-circle" },
      { _id: 23, name: "Logistic", icon: "bi bi-circle" },
    ],
  },
  {
    _id: 3,
    name: "Forms",
    icon: "bi bi-journal-text",
  },
  {
    _id: 4,
    name: "Tables",
    icon: "bi bi-layout-text-window-reverse",
  },
  {
    _id: 5,
    name: "Charts",
    icon: "bi bi-bar-chart",
  },
  {
    _id: 6,
    name: "Icons",
    icon: "bi bi-gem",
  },
];

export default navList;
