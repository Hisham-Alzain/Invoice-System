import React from "react";
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

const ReportPage = () => {
  // Sample data for most sold items (annual and monthly)
  const annualMostSoldItemsData = [
    { name: "Item A", quantitySold: 120 },
    { name: "Item B", quantitySold: 90 },
    { name: "Item C", quantitySold: 80 },
    { name: "Item D", quantitySold: 75 },
    { name: "Item E", quantitySold: 60 },
  ];

  const monthlyMostSoldItemsData = [
    { name: "Jan", quantitySold: 30 },
    { name: "Feb", quantitySold: 25 },
    { name: "Mar", quantitySold: 20 },
    { name: "Apr", quantitySold: 18 },
    { name: "May", quantitySold: 15 },
  ];

  // Sample data for most paying clients (annual and monthly)
  const annualMostPayingClientsData = [
    { name: "Client A", totalAmountPaid: 5000 },
    { name: "Client B", totalAmountPaid: 4000 },
    { name: "Client C", totalAmountPaid: 3500 },
    { name: "Client D", totalAmountPaid: 3000 },
    { name: "Client E", totalAmountPaid: 2500 },
  ];

  const monthlyMostPayingClientsData = [
    { name: "Jan", totalAmountPaid: 1500 },
    { name: "Feb", totalAmountPaid: 1200 },
    { name: "Mar", totalAmountPaid: 1000 },
    { name: "Apr", totalAmountPaid: 900 },
    { name: "May", totalAmountPaid: 800 },
  ];

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
                    <BarChart
                      width={400}
                      height={300}
                      data={annualMostSoldItemsData}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="quantitySold" fill="#8884d8" />
                    </BarChart>
                  </div>
                  <div>
                    <h3>Monthly</h3>
                    <BarChart
                      width={400}
                      height={300}
                      data={monthlyMostSoldItemsData}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="quantitySold" fill="#8884d8" />
                    </BarChart>
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
                        dataKey="totalAmountPaid"
                        data={annualMostPayingClientsData}
                        fill="#8884d8"
                        label
                      />
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </div>
                  <div>
                    <h3>Monthly</h3>
                    <PieChart width={400} height={300}>
                      <Pie
                        dataKey="totalAmountPaid"
                        data={monthlyMostPayingClientsData}
                        fill="#8884d8"
                        label
                      />
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </div>
                </div>
              </td>
              <td className={styles.tableCell}>
                <div className={styles.totalProfitTitle}>
                  <h2>Total Profit</h2>
                  <div className={styles.totalProfitAmount}>
                    <h3>Annual</h3>
                    700000
                  </div>
                  <div className={styles.totalProfitAmount}>
                    <h3>Monthly</h3>
                    8800
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
