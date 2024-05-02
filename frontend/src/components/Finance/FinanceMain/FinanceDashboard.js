import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import DbCard from "./hrdbCard";
import PendingPayments from "./PendingPayments";

function FinanceDashboard({toggleLoading}) {
  // Dummy data for the charts
  const barChartData = [
    { month: "November", income: 1000, expenses: 600 },
    { month: "December", income: 1500, expenses: 800 },
    { month: "January", income: 2000, expenses: 1000 },
    { month: "February", income: 1800, expenses: 900 },
    { month: "March", income: 2200, expenses: 1200 },
    { month: "April", income: 25, expenses: 1100 },
  ];

  const pieChartData = [
    { name: "Other", value: 22 },
    { name: "Fuel", value: 25 },
    { name: "Electricity", value: 8 },
    { name: "Salary", value: 45 },
  ];

  return (
    <>
      <PendingPayments toggleLoading={toggleLoading}/>
      <br></br>

      <h4>Financial Statistics</h4>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
        {/* Bar Chart */}
        <BarChart width={600} height={300} data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#82ca9d" name="Income" />
          <Bar dataKey="expenses" fill="#8884d8" name="Expenses" />
        </BarChart>

        {/* Pie Chart */}
        <PieChart width={400} height={300}>
          <Pie dataKey="value" data={pieChartData} fill="#8884d8" label>
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </>
  );
}

export default FinanceDashboard;
