const navList = [
  {
    _id: 1,
    name: "Dashboard",
    icon: "bi bi-grid",
    href: "/staff/cam",
  },
  {
    _id: 2,
    name: "Consultancy Support",
    icon: "bi bi-people-fill",
    href: "/staff/cam/con_support",
  },
  {
    _id: 3,
    name: "FeedBack Review",
    icon: "bi bi-layout-text-window-reverse",
  },
  {
    _id: 4,
    name: "FAQ Review",
    icon: "bi bi-layout-text-window-reverse",
  },

  {
    _id: 5,
    name: "Contact Us Responses",
    icon: "bi bi-file-earmark-fill",
    href: "/staff/cam/contactDash"
    
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
