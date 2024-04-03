const navList = [
    {
      _id: 1,
      name: "Dashboard",
      icon: "bi bi-grid",
      href:"http://localhost:3000/staff/finance"
    },
    {
      _id: 2,
      name: "Incomes",
      icon: "bi bi-cash",
      href:"http://localhost:3000/staff/finance/incomes"
      // children: [
      //   { _id: 21, name: "Vehicle Services", icon: "bi bi-circle" },
      //   { _id: 22, name: "Mechanical Repairs", icon: "bi bi-circle" },
      //   { _id: 23, name: "Accident Repairs", icon: "bi bi-circle" },
      //   { _id: 24, name: "Mobile Services", icon: "bi bi-circle" },
      //   { _id: 23, name: "Spare Part Sales", icon: "bi bi-circle" },
      // ],
    },
    {
      _id: 3,
      name: "Expenses",
      icon: "bi bi-currency-dollar",
      href:"http://localhost:3000/staff/finance/expenses"
    },
    {
      _id: 4,
      name: "EPF and ETf Management",
      icon: "bi bi-file-person-fill",
    },
    {
      _id: 5,
      name: "Summary",
      icon: "bi bi-card-heading",
    },
    {
      _id: 6,
      name: "Payment Invoices",
      icon: "bi bi-file-earmark-fill",
    },
  ];
  
  export default navList;
  