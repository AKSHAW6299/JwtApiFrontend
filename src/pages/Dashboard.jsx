import React, { useContext } from "react";
import { WebData } from "../contextApi/AuthContext";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const salesData = [
  { month: "Jan", value: 400 },
  { month: "Feb", value: 700 },
  { month: "Mar", value: 500 },
  { month: "Apr", value: 900 },
  { month: "May", value: 800 },
];

const roleData = [
  { name: "Users", value: 70 },
  { name: "Admins", value: 20 },
  { name: "Super Admins", value: 10 },
];

const COLORS = ["#2563eb", "#22c55e", "#f59e0b"];

const DashboardHome = () => {
  const { user } = useContext(WebData);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome back, {user?.name} 👋
        </h2>
        <p className="text-gray-500 text-sm">
          Here’s what’s happening with your dashboard today
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: "1,245" },
          { label: "Active Sessions", value: "312" },
          { label: "Revenue", value: "$9,430" },
          { label: "Errors", value: "3" },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white rounded-xl shadow p-4"
          >
            <p className="text-sm text-gray-500">{item.label}</p>
            <h3 className="text-2xl font-bold text-gray-800">
              {item.value}
            </h3>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart */}
        <div className="bg-white rounded-xl shadow p-4 lg:col-span-2">
          <h3 className="font-semibold mb-3 text-gray-700">
            Monthly Activity
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#2563eb"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-semibold mb-3 text-gray-700">
            User Roles
          </h3>
          <div className="h-64 flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={roleData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                >
                  {roleData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="font-semibold mb-3 text-gray-700">
          Recent Activity
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-500 border-b">
              <tr>
                <th className="py-2">User</th>
                <th>Status</th>
                <th>Role</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  name: "Rohit Sharma",
                  status: "Active",
                  role: "Admin",
                  date: "Today",
                },
                {
                  name: "Virat Kohli",
                  status: "Inactive",
                  role: "User",
                  date: "Yesterday",
                },
                {
                  name: "Rahul Dravid",
                  status: "Active",
                  role: "Super Admin",
                  date: "2 days ago",
                },
              ].map((row, idx) => (
                <tr key={idx} className="border-b last:border-0">
                  <td className="py-2">{row.name}</td>
                  <td
                    className={`font-medium ${
                      row.status === "Active"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {row.status}
                  </td>
                  <td>{row.role}</td>
                  <td>{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardHome;
