import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Table, Row, Col } from "react-bootstrap";
import DbCard from "./hrdbCard";
import PendingPayments from "./PendingPayments";

function FinanceDashboard({ toggleLoading }) {
  const [onlinePaymentsCount, setOnlinePaymentsCount] = useState(null);
  const [inPersonPaymentsCount, setInPersonPaymentsCount] = useState(null);
  const [totalFunds, setTotalFunds] = useState(null);
  const [loading, setLoading] = useState(false); // New state for loading indicator
  const [totalIncome, setTotalIncome] = useState(0); // State for total income of current month
  const [totalExpenses, setTotalExpenses] = useState(0); // State for total expenses of current month

  useEffect(() => {
    const fetchData = async () => {
      try {
        toggleLoading(true); // Start loading indicator

        const currentDate = new Date().toISOString().split("T")[0]; // Get current date in yyyy-mm-dd format
        const currentMonth = new Date().getMonth() + 1; // Get current month

        // Fetch total income for the current month
        const incomeResponse = await fetch(
          `${process.env.React_App_Backend_URL}/api/finance/incomes?month=${currentMonth}`
        );
        const incomeData = await incomeResponse.json();
        const totalIncomeForMonth = incomeData.reduce(
          (total, item) => total + item.amount,
          0
        );
        setTotalIncome(totalIncomeForMonth);

        // Fetch total expenses for the current month
        const expensesResponse = await fetch(
          `${process.env.React_App_Backend_URL}/api/finance/expenses?month=${currentMonth}`
        );
        const expensesData = await expensesResponse.json();
        const totalExpensesForMonth = expensesData.reduce(
          (total, item) => total + item.amount,
          0
        );
        setTotalExpenses(totalExpensesForMonth);

        // Fetch total funds
        const fundsResponse = await fetch(
          `${process.env.React_App_Backend_URL}/api/finance/incomes`
        );
        const fundsData = await fundsResponse.json();

        // Filter the income data for type "FUNDS"
        const fundsAmounts = fundsData
          .filter((item) => item.type === "FUNDS")
          .map((item) => item.amount);

        // Calculate the total amount of funds
        const totalFundsAmount = fundsAmounts.reduce(
          (total, amount) => total + amount,
          0
        );
        setTotalFunds(totalFundsAmount);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        toggleLoading(false); // Stop loading indicator regardless of success or failure
      }
    };

    fetchData();
  }, []);

  
    const barChartData = [
      { month: "November", income: 1050000, expenses: 467000 },
      { month: "December", income: 1500000, expenses: 800000 },
      { month: "January", income: 2000000, expenses: 1000000 },
      { month: "February", income: 1800000, expenses: 900000 },
      { month: "March", income: 2200000, expenses: 1200000 },
      { month: "April", income: 1250000, expenses: 500000 }
    ];
    
  

  const adjustedBarChartData = barChartData.map((item) => {
    const profit = ((item.income - item.expenses) / item.income) * 100;
    return {
      month: item.month,
      profit: isNaN(profit) ? 0 : profit.toFixed(2), // Handle NaN case and round to two decimal places
    };
  });

  const barChartDataWithProfit = barChartData.map((item) => ({
    ...item,
    profit: ((item.income - item.expenses) / item.income) * 100,
  }));

  // Pie chart data
  const pieChartData = [
    { name: "Income", value: totalIncome },
    { name: "Expenses", value: totalExpenses },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <>
      <PendingPayments toggleLoading={toggleLoading} />
      <br />
      <h4>Financial Overview</h4>
      <br></br>
      <br></br>
      <div className="row">
        <DbCard
          title="No of Online Payments"
          value={
            onlinePaymentsCount !== null && onlinePaymentsCount !== undefined
              ? onlinePaymentsCount
              : 0
          }
          iconClass="bi-cash-stack"
          duration="Daily"
        />

        <DbCard
          title="No of InPerson Payments"
          value={
            inPersonPaymentsCount !== null &&
            inPersonPaymentsCount !== undefined
              ? inPersonPaymentsCount
              : 0
          }
          iconClass="bi-cash-stack"
          duration="Daily"
        />

        <DbCard
          title="Total Funds(Rs.)"
          value={
            totalFunds !== null && totalFunds !== undefined ? totalFunds : 0
          }
          iconClass="bi-cash-stack"
          duration="Yearly"
        />
      </div>

      <h4>Financial Statistics</h4>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        {/* Bar Chart */}
        <BarChart
          width={600}
          height={300}
          data={barChartDataWithProfit}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#82ca9d" name="Income" />
          <Bar dataKey="expenses" fill="#8884d8" name="Expenses" />
        
        </BarChart>

        <PieChart width={400} height={300}>
          <Pie dataKey="value" data={pieChartData} fill="#8884d8" label>
            {pieChartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]} // Use colors from the defined array
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>

        <BarChart
          width={600}
          height={300}
          data={adjustedBarChartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="profit" fill="#8884d8" name="Profit Percentage" />
        </BarChart>
      </div>
    </>
  );
}

export default FinanceDashboard;
