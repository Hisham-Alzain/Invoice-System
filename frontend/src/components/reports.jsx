import React, { useContext, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import NavBar from "./NavBar";
import styles from "./css/reports.module.css";
import { AnnualData, FetchClients, MonthlyData } from "../apis/api";
import { LoginContext } from "../App";
import ClientList from "./invoices/clientList";

const ReportPage = () => {
  const { accessToken } = useContext(LoginContext);
  const [annualData, setAnnualData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("February 2024");

  useEffect(() => {
    AnnualData(accessToken).then((response) => {
      if (response.status === 200) {
        setAnnualData(response.data);
      } else {
        console.log(response.statusText);
      }
    });
    MonthlyData(accessToken).then((response) => {
      if (response.status === 200) {
        setMonthlyData(response.data);
      } else {
        console.log(response.statusText);
      }
    });
  }, []);

  const handleClientChange = (selectedOption) => {
    setSelectedClient(selectedOption.value);
  };

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className={styles.reportsPage}>
        <table className={styles.tableContainer}>
          <tbody>
            <tr>
              <td className={styles.tableCell}>
                <div>
                  <h2>Most Sold Items</h2>
                  <div className={styles.chartContainer}>
                    <h3>Annual</h3>
                    <BarChart width={400} height={300} data={annualData.items}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="total" fill="#8884d8" />
                    </BarChart>
                  </div>
                  <div>
                    <h3>Monthly</h3>
                    {monthlyData.monthly_totals && (
                      <div>
                        {/* Bar chart */}
                        <BarChart
                          width={400}
                          height={300}
                          data={monthlyData.monthly_totals}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="amount" fill="#8884d8" />
                        </BarChart>
                      </div>
                    )}
                  </div>
                </div>
              </td>
              <td className={styles.tableCell}>
                <div>
                  <h2>Most Paying Clients</h2>
                  <div>
                    <h3>Annual</h3>
                    <PieChart width={400} height={300}>
                      <Pie
                        dataKey="total_amount"
                        data={annualData.clients}
                        fill="#8884d8"
                        label
                      />
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </div>
                  <div>
                    <h3>Monthly</h3>
                    {/* Select month dropdown */}
                    <select
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                    >
                      <option value="">Select Month</option>
                      {monthlyData.monthly_data &&
                        Object.values(
                          monthlyData.monthly_data[0].monthly_amounts
                        ).map((item) => (
                          <option key={item.month} value={item.month}>
                            {item.month}
                          </option>
                        ))}
                    </select>
                    {selectedMonth !== "" && monthlyData.monthly_data && (
                      <BarChart
                        width={400}
                        height={300}
                        data={monthlyData.monthly_data}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="client.name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                          dataKey={`monthly_amounts.${selectedMonth}.amount`}
                          fill="#8884d8"
                        />
                      </BarChart>
                    )}
                  </div>
                </div>
              </td>
              <td className={styles.tableCell}>
                <div className={styles.totalProfitTitle}>
                  <h2>Total Profit</h2>
                  <div className={styles.totalProfitAmount}>
                    <h3>Annual</h3>
                    {annualData.anual_total_amount}
                  </div>
                  <div>
                    <h3>Monthly</h3>
                    {/* Month selector */}
                    <select
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                    >
                      <option value="">Select Month</option>
                      {monthlyData.monthly_totals &&
                        monthlyData.monthly_totals.map((item) => (
                          <option key={item.month} value={item.month}>
                            {item.month}
                          </option>
                        ))}
                    </select>
                    {/* Display data for selected month */}
                    {selectedMonth !== "" &&
                      monthlyData.monthly_totals &&
                      monthlyData.monthly_totals.map((item) => {
                        if (item.month === selectedMonth) {
                          return <p key={item.month}>{item.amount}</p>;
                        }
                        return null;
                      })}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportPage;
