const navList = [
    {
      _id: 1,
      name: "Dashboard",
      icon: "bi bi-grid",
      href:"/staff/finance"
    },

    {
      _id: 2,
      name: "Financial Reports",
      icon: "bi bi-file-earmark-text-fill",
      href:"/staff/finance/financial-reports"
    },
    {
      _id: 3,
      name: "Incomes & Funds",
      icon: "bi bi-cash",
      href:"/staff/finance/incomes"
      // children: [
      //   { _id: 21, name: "Vehicle Services", icon: "bi bi-circle" },
      //   { _id: 22, name: "Mechanical Repairs", icon: "bi bi-circle" },
      //   { _id: 23, name: "Accident Repairs", icon: "bi bi-circle" },
      //   { _id: 24, name: "Mobile Services", icon: "bi bi-circle" },
      //   { _id: 23, name: "Spare Part Sales", icon: "bi bi-circle" },
      // ],
    },
    {
      _id: 4,
      name: "Expenses",
      icon: "bi bi-currency-dollar",
      href:"/staff/finance/expenses"
    },
    {
      _id: 5,
      name: "Employee Finance Management",
      icon: "bi bi-file-person-fill",
      href:"/staff/finance/emp-finance"
    },
    {
      _id: 6,
      name: "  Billing",
      icon: "bi bi-card-heading",
      href:"/staff/finance/billing/all"
    },
    {
      _id: 7,
      name: "Payment Invoices",
      icon: "bi bi-file-earmark-fill",
      href:"/staff/finance/invoices/all-invoices"
    },{
      _id: 8,
      name: "Products & Spare Parts Orders",
      icon: "bi bi-cart-check",
      href:"/staff/finance/product-sales"
    },
    {
      _id: 9,
      name: "Service Orders",
      icon: "bi bi-car-front-fill",
      href:"/staff/finance/service-orders"
    }
    
  ];
  
  export default navList;
 