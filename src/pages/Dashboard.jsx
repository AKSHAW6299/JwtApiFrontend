import React, { useContext } from "react";
import { WebData } from "../contextApi/AuthContext";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Modern Color Palette
const COLORS = ["#3b82f6", "#10b981", "#f59e0b"]; // Blue, Green, Amber
const CHART_GRADIENT = "#3b82f6";

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

const DashboardHome = () => {
  const { user } = useContext(WebData);
console.log(user);

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-8 bg-[#f8fafc] min-h-screen font-sans"
    >
      {/* Top Navigation / Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Welcome back, {user?.name || "user"}
          </h2>
          <p className="text-slate-500 font-medium">
            System overview for <span className="text-blue-600">Jan 2026</span>
          </p>
        </div>
        <button className="bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
          Download Report
        </button>
      </div>

      {/* Stats Cards - Modern Borderless Glass Look */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Users", value: "11,245", trend: "+12%", color: "text-blue-600" },
          { label: "Active Errors", value: "113", trend: "-2%", color: "text-rose-600" },
          { label: "Live Sessions", value: "1312", trend: "+5%", color: "text-emerald-600" },
          { label: "Gross Revenue", value: "$111,439", trend: "+68%", color: "text-amber-600" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm shadow-slate-200/50 relative overflow-hidden"
          >
            <div className="relative z-10">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">{item.label}</p>
              <div className="flex items-end justify-between mt-2">
                <h3 className="text-3xl font-black text-slate-800">{item.value}</h3>
                <span className={`text-xs font-bold px-2 py-1 rounded-full bg-slate-50 ${item.color}`}>
                  {item.trend}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Modern Area Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800 text-lg">Activity Analytics</h3>
            <select className="text-sm border-none bg-slate-50 rounded-lg font-semibold text-slate-500 outline-none p-1">
              <option>Last 6 Months</option>
            </select>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={CHART_GRADIENT} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={CHART_GRADIENT} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke={CHART_GRADIENT} 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
          <h3 className="font-bold text-slate-800 text-lg mb-6">Distribution</h3>
          <div className="h-64 flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={roleData}
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {roleData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} cornerRadius={10} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between mt-4">
            {roleData.map((entry, i) => (
              <div key={i} className="text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase">{entry.name}</p>
                <p className="text-sm font-bold text-slate-700">{entry.value}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modernized Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50">
          <h3 className="font-bold text-slate-800 text-lg">Recent Users</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">User</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Role</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Activity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { name: "Rohit Sharma", status: "Active", role: "Admin", date: "Today" },
                { name: "Virat Kohli", status: "Inactive", role: "User", date: "Yesterday" },
                { name: "Rahul Dravid", status: "Active", role: "Super Admin", date: "2 days ago" },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                        {row.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-slate-700">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                      row.status === "Active" ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-500"
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{row.role}</td>
                  <td className="px-6 py-4 text-slate-400 text-sm font-medium">{row.date}</td>
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