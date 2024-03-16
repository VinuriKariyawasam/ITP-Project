const navList = [
  {
    _id: 1,
    name: "Dashboard",
    icon: "bi bi-grid",
    href: "/CAM",
  },
  {
    _id: 2,
    name: "Consultancy Support",
    icon: "bi bi-people-fill",
    href: "/CAM/con_support",
  },
  {
    _id: 3,
    name: "FeedBack Review",
    icon: "bi bi-cash",
  },
  {
    _id: 4,
    name: "FAQ Review",
    icon: "bi bi-layout-text-window-reverse",
  },
  {
    _id: 5,
    name: "Attendance",
    icon: "bi bi-card-checklist",
  },
  {
    _id: 6,
    name: "Reports",
    icon: "bi bi-clipboard2-data",
    children: [
      { _id: 21, name: "FeedBack Review", icon: "bi bi-circle" },
      { _id: 22, name: "Consultancy Support", icon: "bi bi-circle" },
      { _id: 23, name: "Attendance", icon: "bi bi-circle" },
    ],
  },
];

export default navList;
